'use server';
import { cookies } from 'next/headers';
import { createClient } from './supabase/server';
import { getNumberOfCurrentSalesByItemByUser } from './getNumberOfCurrentSalesByItemByUser';

export async function sellItem(price: number, id_item: string, id_user: string) {
  'use server';
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const numberInSales = await getNumberOfCurrentSalesByItemByUser(id_user, id_item);

  if (numberInSales === null)
    return {
      status: false,
      message: "Une erreur est survenue lors de la vente de l'objet. Veuillez réessayer plus tard.",
    };

  const { data: ammountInInventory, error: ammountInInventoryError } = await supabase
    .from('items_users')
    .select('count')
    .eq('id_user', id_user)
    .eq('id_item', id_item);

  if (ammountInInventoryError) {
    console.log('ErrorSellItem', ammountInInventoryError);
    return {
      status: false,
      message: "Une erreur est survenue lors de la vente de l'objet. Veuillez réessayer plus tard.",
    };
  }

  if (numberInSales.length >= ammountInInventory[0].count)
    return { status: false, message: "Vous ne pouvez pas vendre plus d'objets que vous n'en avez en stock." };

  const { error } = await supabase.from('vendre').insert([{ prix: price, id_item: id_item }]);
  if (error)
    return {
      status: false,
      message: "Une erreur est survenue lors de la vente de l'objet. Veuillez réessayer plus tard.",
    };
  return true;
}
