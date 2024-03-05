'use server';
import { cookies } from 'next/headers';
import { createClient } from './supabase/server';
import { latestSale } from '@/app/types/entities';

export async function getLatestSales() {
  'use server';
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from('acheter')
    .select('prix, timestamp, item_infos:items!inner(id_item, nom, image_url)')
    .order('timestamp', { ascending: false })
    .limit(15);
  if (error) {
    console.error(error);
    return [];
  }
  return data as unknown as latestSale[];
}
