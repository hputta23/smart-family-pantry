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
