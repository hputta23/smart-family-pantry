'use server';

import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

// Utility for managing session
async function setSession(familyId: string) {
  const cookieStore = await cookies();
  cookieStore.set('family_id', familyId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  return cookieStore.get('family_id')?.value;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('family_id');
}

export async function loginFamily(email: string, password: string) {
  try {
    const { data: authRecord, error } = await supabase
      .from('family_auth')
      .select('family_id, password_hash')
      .eq('email', email)
      .single();

    if (error || !authRecord) {
      return { success: false, error: 'Invalid email or password' };
    }

    const isMatch = await bcrypt.compare(password, authRecord.password_hash);
    if (!isMatch) {
      return { success: false, error: 'Invalid email or password' };
    }

    await setSession(authRecord.family_id);
    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'An error occurred during login' };
  }
}

export async function setupFamily(formData: {
  familyName: string;
  email: string;
  password: string;
  budget: number;
  members: any[];
  stores: string[];
}) {
  try {
    // 1. Create Family
    const { data: family, error: familyError } = await supabase
      .from('families')
      .insert({ family_name: formData.familyName })
      .select()
      .single();

    if (familyError || !family) throw new Error('Failed to create family');

    // 2. Create Auth
    const passwordHash = await bcrypt.hash(formData.password, 10);
    const { error: authError } = await supabase
      .from('family_auth')
      .insert({
        family_id: family.id,
        email: formData.email,
        password_hash: passwordHash,
      });

    if (authError) throw new Error('Failed to create auth credentials');

    // 3. Create Budget
    const { error: budgetError } = await supabase
      .from('budgets')
      .insert({
        family_id: family.id,
        monthly_limit: formData.budget,
      });

    if (budgetError) throw new Error('Failed to save budget');

    // Set session immediately
    await setSession(family.id);

    return { success: true };
  } catch (error: any) {
    console.error('Setup error:', error);
    return { success: false, error: error.message };
  }
}

export async function getInventory() {
  const familyId = await getSession();
  if (!familyId) return { success: false, error: 'Not authenticated' };

  try {
    const { data, error } = await supabase
      .from('pantry_inventory')
      .select(`
        id, quantity, unit, estimated_empty_date,
        products ( canonical_name, category )
      `)
      .eq('family_id', familyId);

    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    console.error('Fetch inventory error:', error);
    return { success: false, error: error.message };
  }
}

// ---------------------------------------------------------
// Inventory Actions
// ---------------------------------------------------------

export async function addInventoryItem(canonicalName: string, category: string, quantity: number, unit: string) {
  const familyId = await getSession();
  if (!familyId) return { success: false, error: 'Not authenticated' };

  try {
    // 1. Check if product exists, if not create it
    let { data: product } = await supabase
      .from('products')
      .select('id')
      .eq('canonical_name', canonicalName)
      .single();

    if (!product) {
      const { data: newProduct, error: productError } = await supabase
        .from('products')
        .insert({ canonical_name: canonicalName, category })
        .select('id')
        .single();
      if (productError) throw productError;
      product = newProduct;
    }

    // 2. Add to pantry
    const { error: insertError } = await supabase
      .from('pantry_inventory')
      .insert({
        family_id: familyId,
        product_id: product.id,
        quantity,
        unit
      });

    if (insertError) throw insertError;
    return { success: true };
  } catch (error: any) {
    console.error('Add inventory error:', error);
    return { success: false, error: error.message };
  }
}

export async function updateInventoryQuantity(inventoryId: string, quantity: number) {
  const familyId = await getSession();
  if (!familyId) return { success: false, error: 'Not authenticated' };

  try {
    if (quantity <= 0) {
      const { error } = await supabase.from('pantry_inventory').delete().eq('id', inventoryId).eq('family_id', familyId);
      if (error) throw error;
    } else {
      const { error } = await supabase.from('pantry_inventory').update({ quantity }).eq('id', inventoryId).eq('family_id', familyId);
      if (error) throw error;
    }
    return { success: true };
  } catch (error: any) {
    console.error('Update inventory error:', error);
    return { success: false, error: error.message };
  }
}

export async function consumeInventoryItem(inventoryId: string, productId: string, amount: number) {
  const familyId = await getSession();
  if (!familyId) return { success: false, error: 'Not authenticated' };

  try {
    // 1. Log consumption event
    await supabase.from('consumption_events').insert({
      family_id: familyId,
      product_id: productId,
      amount_used: amount
    });

    // 2. Fetch current quantity
    const { data: inv } = await supabase.from('pantry_inventory').select('quantity').eq('id', inventoryId).single();
    if (!inv) throw new Error('Item not found');

    // 3. Update quantity
    const newQty = Math.max(0, inv.quantity - amount);
    await updateInventoryQuantity(inventoryId, newQty);

    return { success: true };
  } catch (error: any) {
    console.error('Consume inventory error:', error);
    return { success: false, error: error.message };
  }
}

// ---------------------------------------------------------
// Shopping List Actions
// ---------------------------------------------------------

export async function getShoppingList() {
  const familyId = await getSession();
  if (!familyId) return { success: false, error: 'Not authenticated' };

  try {
    const { data, error } = await supabase
      .from('list_items')
      .select('id, store_name, custom_name, checked_off, quantity')
      .eq('family_id', familyId)
      .order('checked_off', { ascending: true });

    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    console.error('Fetch list error:', error);
    return { success: false, error: error.message };
  }
}

export async function addListItem(itemName: string, storeName: string) {
  const familyId = await getSession();
  if (!familyId) return { success: false, error: 'Not authenticated' };

  try {
    const { error } = await supabase.from('list_items').insert({
      family_id: familyId,
      custom_name: itemName,
      store_name: storeName
    });

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Add list item error:', error);
    return { success: false, error: error.message };
  }
}

export async function toggleListItem(itemId: string, checkedOff: boolean) {
  const familyId = await getSession();
  if (!familyId) return { success: false, error: 'Not authenticated' };

  try {
    const { error } = await supabase
      .from('list_items')
      .update({ checked_off: checkedOff })
      .eq('id', itemId)
      .eq('family_id', familyId);

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Toggle list item error:', error);
    return { success: false, error: error.message };
  }
}

export async function updateListItemQuantity(itemId: string, quantity: number) {
  const familyId = await getSession();
  if (!familyId) return { success: false, error: 'Not authenticated' };

  try {
    if (quantity <= 0) {
      const { error } = await supabase.from('list_items').delete().eq('id', itemId).eq('family_id', familyId);
      if (error) throw error;
    } else {
      const { error } = await supabase.from('list_items').update({ quantity }).eq('id', itemId).eq('family_id', familyId);
      if (error) throw error;
    }
    return { success: true };
  } catch (error: any) {
    console.error('Update list item error:', error);
    return { success: false, error: error.message };
  }
}

// ---------------------------------------------------------
// Profile Actions
// ---------------------------------------------------------

export async function getFamilyProfiles() {
  const familyId = await getSession();
  if (!familyId) return { success: false, error: 'Not authenticated' };

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, name, type, dietary_preferences')
      .eq('family_id', familyId);

    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    console.error('Fetch profiles error:', error);
    return { success: false, error: error.message };
  }
}

export async function addProfile(name: string, type: string) {
  const familyId = await getSession();
  if (!familyId) return { success: false, error: 'Not authenticated' };

  try {
    const { error } = await supabase.from('profiles').insert({
      family_id: familyId,
      name,
      type
    });

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Add profile error:', error);
    return { success: false, error: error.message };
  }
}

// ---------------------------------------------------------
// Budget & Mock Receipt Actions
// ---------------------------------------------------------

export async function getBudgetOverview() {
  const familyId = await getSession();
  if (!familyId) return { success: false, error: 'Not authenticated' };

  try {
    const { data: budget } = await supabase
      .from('budgets')
      .select('monthly_limit')
      .eq('family_id', familyId)
      .single();

    const { data: receipts } = await supabase
      .from('receipts')
      .select('total_amount, date')
      .eq('family_id', familyId);

    // Sum receipts for the current month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const spent = receipts
      ?.filter(r => {
        const d = new Date(r.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      })
      .reduce((sum, r) => sum + r.total_amount, 0) || 0;

    return { 
      success: true, 
      data: {
        limit: budget?.monthly_limit || 0,
        spent
      } 
    };
  } catch (error: any) {
    console.error('Fetch budget error:', error);
    return { success: false, error: error.message };
  }
}

export async function mockProcessReceipt(storeName: string, totalAmount: number, newItems: any[]) {
  const familyId = await getSession();
  if (!familyId) return { success: false, error: 'Not authenticated' };

  try {
    // 1. Create Receipt
    const { data: receipt, error: receiptError } = await supabase
      .from('receipts')
      .insert({
        family_id: familyId,
        store_name: storeName,
        total_amount: totalAmount,
        image_url: 'mock_url'
      })
      .select('id')
      .single();

    if (receiptError) throw receiptError;

    // 2. Add inventory & line items
    for (const item of newItems) {
      await addInventoryItem(item.name, item.category, item.quantity, item.unit);
      
      // Assume product was created/found by addInventoryItem. We skip detailed line_items insertion for brevity in the mock.
    }

    return { success: true };
  } catch (error: any) {
    console.error('Process receipt error:', error);
    return { success: false, error: error.message };
  }
}
