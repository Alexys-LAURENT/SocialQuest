'use server';
import { cookies } from 'next/headers';
import { createClient } from './supabase/server';
import { bestSellingItem } from '@/app/types/entities';

export async function getBestSellingItems() {
  'use server';
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.rpc('get_best_selling_items');
  if (error) {
    console.error(error);
    return [];
  }
  return data as unknown as bestSellingItem[];
}
