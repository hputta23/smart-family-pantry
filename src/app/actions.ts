'use server';

import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

// ===========================================================
// Input Validation Helpers
// ===========================================================

function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) && email.length <= 254;
}

function sanitizeString(input: string, maxLength = 200): string {
  return input.trim().slice(0, maxLength);
}

function validateStringRequired(input: string, fieldName: string, minLen = 1, maxLen = 200): string | null {
  const val = input?.trim();
  if (!val || val.length < minLen) return `${fieldName} is required (min ${minLen} chars)`;
  if (val.length > maxLen) return `${fieldName} is too long (max ${maxLen} chars)`;
  return null;
}

function validateNumber(val: number, min: number, max: number, fieldName: string): string | null {
  if (typeof val !== 'number' || isNaN(val)) return `${fieldName} must be a number`;
  if (val < min || val > max) return `${fieldName} must be between ${min} and ${max}`;
  return null;
}

// ===========================================================
// Session Management
// ===========================================================

async function setSession(familyId: string) {
  const cookieStore = await cookies();
  cookieStore.set('family_id', familyId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
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
  return { success: true };
}

// ===========================================================
// Authentication
// ===========================================================

export async function loginFamily(email: string, password: string) {
  // Validate inputs
  if (!validateEmail(email)) return { success: false, error: 'Please enter a valid email address' };
  const pwErr = validateStringRequired(password, 'Password', 6, 128);
  if (pwErr) return { success: false, error: pwErr };

  try {
    const { data: authRecord, error } = await supabase
      .from('family_auth')
      .select('family_id, password_hash')
      .eq('email', sanitizeString(email, 254).toLowerCase())
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

// ===========================================================
// Family Setup
// ===========================================================

export async function setupFamily(formData: {
  familyName: string;
  email: string;
  password: string;
  budget: number;
  members: { ageRange: string; sex: string }[];
  stores: string[];
}) {
  // Validate all inputs
  const nameErr = validateStringRequired(formData.familyName, 'Family name', 2, 100);
  if (nameErr) return { success: false, error: nameErr };

  if (!validateEmail(formData.email)) return { success: false, error: 'Please enter a valid email address' };

  const pwErr = validateStringRequired(formData.password, 'Password', 6, 128);
  if (pwErr) return { success: false, error: pwErr };

  const budgetErr = validateNumber(formData.budget, 50, 10000, 'Budget');
  if (budgetErr) return { success: false, error: budgetErr };

  try {
    // 1. Check if email already exists
    const { data: existingAuth } = await supabase
      .from('family_auth')
      .select('family_id')
      .eq('email', sanitizeString(formData.email, 254).toLowerCase())
      .single();

    if (existingAuth) {
      return { success: false, error: 'An account with this email already exists. Please log in instead.' };
    }

    // 2. Create Family
    const { data: family, error: familyError } = await supabase
      .from('families')
      .insert({ family_name: sanitizeString(formData.familyName, 100) })
      .select()
      .single();

    if (familyError || !family) throw new Error('Failed to create family');

    // 3. Create Auth
    const passwordHash = await bcrypt.hash(formData.password, 12);
    const { error: authError } = await supabase
      .from('family_auth')
      .insert({
        family_id: family.id,
        email: sanitizeString(formData.email, 254).toLowerCase(),
        password_hash: passwordHash,
      });

    if (authError) throw new Error('Failed to create auth credentials');

    // 4. Create Budget
    const { error: budgetError } = await supabase
      .from('budgets')
      .insert({
        family_id: family.id,
        monthly_limit: formData.budget,
      });

    if (budgetError) throw new Error('Failed to save budget');

    // 5. Create member profiles
    if (formData.members && formData.members.length > 0) {
      const memberRows = formData.members.slice(0, 20).map((m, i) => ({
        family_id: family.id,
        name: `Member ${i + 1}`,
        type: m.ageRange || 'Adult',
      }));
      await supabase.from('profiles').insert(memberRows);
    }

    // 6. Set session
    await setSession(family.id);

    return { success: true };
  } catch (error: any) {
    console.error('Setup error:', error);
    return { success: false, error: error.message };
  }
}

// ===========================================================
// Inventory Actions
// ===========================================================

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

export async function addInventoryItem(canonicalName: string, category: string, quantity: number, unit: string) {
  const familyId = await getSession();
  if (!familyId) return { success: false, error: 'Not authenticated' };

  // Validate
  const nameErr = validateStringRequired(canonicalName, 'Item name', 1, 200);
  if (nameErr) return { success: false, error: nameErr };
  const qtyErr = validateNumber(quantity, 0.01, 99999, 'Quantity');
  if (qtyErr) return { success: false, error: qtyErr };

  try {
    let { data: product } = await supabase
      .from('products')
      .select('id')
      .eq('canonical_name', sanitizeString(canonicalName))
      .single();

    if (!product) {
      const { data: newProduct, error: productError } = await supabase
        .from('products')
        .insert({ canonical_name: sanitizeString(canonicalName), category: sanitizeString(category, 100) })
        .select('id')
        .single();
      if (productError) throw productError;
      product = newProduct;
    }

    const { error: insertError } = await supabase
      .from('pantry_inventory')
      .insert({
        family_id: familyId,
        product_id: product.id,
        quantity,
        unit: sanitizeString(unit, 50)
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
    await supabase.from('consumption_events').insert({
      family_id: familyId,
      product_id: productId,
      amount_used: amount
    });

    const { data: inv } = await supabase.from('pantry_inventory').select('quantity').eq('id', inventoryId).single();
    if (!inv) throw new Error('Item not found');

    const newQty = Math.max(0, inv.quantity - amount);
    await updateInventoryQuantity(inventoryId, newQty);

    return { success: true };
  } catch (error: any) {
    console.error('Consume inventory error:', error);
    return { success: false, error: error.message };
  }
}

// ===========================================================
// Shopping List Actions
// ===========================================================

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

  const nameErr = validateStringRequired(itemName, 'Item name', 1, 200);
  if (nameErr) return { success: false, error: nameErr };

  try {
    const { error } = await supabase.from('list_items').insert({
      family_id: familyId,
      custom_name: sanitizeString(itemName),
      store_name: sanitizeString(storeName, 100)
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

// ===========================================================
// Profile Actions
// ===========================================================

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

  const nameErr = validateStringRequired(name, 'Name', 1, 100);
  if (nameErr) return { success: false, error: nameErr };

  try {
    const { error } = await supabase.from('profiles').insert({
      family_id: familyId,
      name: sanitizeString(name, 100),
      type: sanitizeString(type, 50)
    });

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Add profile error:', error);
    return { success: false, error: error.message };
  }
}

// ===========================================================
// Budget & Receipt Actions
// ===========================================================

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

  // Validate
  const storeErr = validateStringRequired(storeName, 'Store name', 1, 100);
  if (storeErr) return { success: false, error: storeErr };
  const amtErr = validateNumber(totalAmount, 0.01, 99999, 'Total amount');
  if (amtErr) return { success: false, error: amtErr };

  try {
    const { data: receipt, error: receiptError } = await supabase
      .from('receipts')
      .insert({
        family_id: familyId,
        store_name: sanitizeString(storeName, 100),
        total_amount: totalAmount,
        image_url: 'mock_url'
      })
      .select('id')
      .single();

    if (receiptError) throw receiptError;

    for (const item of (newItems || []).slice(0, 50)) {
      await addInventoryItem(
        item.canonical_name || item.name || 'Unknown',
        item.category || 'Other',
        item.quantity || 1,
        item.unit || 'unit'
      );
    }

    return { success: true };
  } catch (error: any) {
    console.error('Process receipt error:', error);
    return { success: false, error: error.message };
  }
}

// ===========================================================
// Data Export
// ===========================================================

export async function exportFamilyData() {
  const familyId = await getSession();
  if (!familyId) return { success: false, error: 'Not authenticated' };

  try {
    const [inventory, list, profiles, budget] = await Promise.all([
      supabase.from('pantry_inventory').select('*').eq('family_id', familyId),
      supabase.from('list_items').select('*').eq('family_id', familyId),
      supabase.from('profiles').select('*').eq('family_id', familyId),
      supabase.from('budgets').select('*').eq('family_id', familyId).single(),
    ]);

    return {
      success: true,
      data: {
        exportDate: new Date().toISOString(),
        inventory: inventory.data || [],
        shoppingList: list.data || [],
        profiles: profiles.data || [],
        budget: budget.data || null,
      }
    };
  } catch (error: any) {
    console.error('Export error:', error);
    return { success: false, error: error.message };
  }
}
