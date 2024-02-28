'use server';
import { cookies } from 'next/headers';
import { createClient } from './supabase/server';

export async function sellItem(price: number, id_item_user: string) {
  'use server';
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { error } = await supabase.from('vendre').insert([{ prix: price, id_item_user: id_item_user }]);
  if (error) return false;
  return true;
}
