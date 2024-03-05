'use server';
import { itemShop } from '@/app/types/entities';
import { cookies } from 'next/headers';
import { createClient } from './supabase/server';
import { getProfileConnected } from './getProfileConnected';

export async function buyItem(item: itemShop) {
  'use server';
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.rpc('buy_item', {
    id_item_to_buy: item.item_infos.id_item,
    price_item_to_buy: item.prix,
    id_seller: item.seller_infos.id_user,
    timestamp_item_to_buy: item.timestamp,
  });
  if (error) {
    console.log(error);
    return { status: false, message: "Une erreur est survenue lors de l'achat de cet item" };
  }
  return data;
}
