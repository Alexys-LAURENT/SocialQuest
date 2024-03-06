'use server';
import { cookies } from 'next/headers';
import { createClient } from './supabase/server';

export async function removeItemFromSales(id_user: string, id_item: string, timestamp: string) {
  'use server';
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: stillExists, error: stillExistsError } = await supabase
    .from('vendre')
    .select('id_user')
    .eq('id_user', id_user)
    .eq('id_item', id_item)
    .eq('timestamp', timestamp)
    .single();

  if (stillExistsError) {
    console.log('ErrorRemoveItemFromSales', stillExistsError);
    return false;
  }
  if (!stillExists || !stillExists.id_user) {
    return false;
  }
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
