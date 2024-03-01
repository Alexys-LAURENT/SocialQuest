'use server';
import { cookies } from 'next/headers';
import { createClient } from './supabase/server';

export async function getNumberOfCurrentSalesByItemByUser(id_user: string, id_item: string) {
  'use server';
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from('vendre')
    .select('prix, timestamp')
    .eq('id_user', id_user)
    .eq('id_item', id_item);

  if (error) {
    console.log('ErrorGetNumberOfCurrentSellsByItemByUser', error);
    return null;
  }

  const dataWithFormatedDate = data.map((sale: any) => {
    sale.timestampFormatted = new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(new Date(sale.timestamp));
    return sale;
  });

  return dataWithFormatedDate;
}
