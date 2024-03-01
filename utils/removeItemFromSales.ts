'use server';
import { cookies } from 'next/headers';
import { createClient } from './supabase/server';

export async function removeItemFromSales(id_user: string, id_item: string, timestamp: string) {
  'use server';
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { error } = await supabase
    .from('vendre')
    .delete()
    .eq('id_user', id_user)
    .eq('id_item', id_item)
    .eq('timestamp', timestamp);
  if (error) {
    console.log('ErrorRemoveItemFromSales', error);
    return false;
  }
  return true;
}
