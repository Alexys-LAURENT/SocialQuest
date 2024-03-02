'use server';
import { itemShop } from '@/app/types/entities';
import { cookies } from 'next/headers';
import { createClient } from './supabase/server';
import { getProfileConnected } from './getProfileConnected';

export async function buyItem(item: itemShop) {
  'use server';
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const profileConnected = await getProfileConnected();
  // On vérifie si l'utilisateur a assez de SocialCoin pour acheter l'item
  if (profileConnected!.social_coins < item.prix) {
    return { status: false, message: "Vous n'avez pas assez de SocialCoin pour acheter cet item" };
  }
  // On vérifie que l'item est toujours disponible
  const { data: isStillAvailable, error: errorIsStillAvailable } = await supabase
    .from('vendre')
    .select()
    .eq('id_item', item.item_infos.id_item)
    .eq('id_user', item.seller_infos.id_user)
    .eq('timestamp', item.timestamp)
    .single();
  if (errorIsStillAvailable) {
    console.log(errorIsStillAvailable);
    return { status: false, message: "Une erreur est survenue lors de l'achat de cet item" };
  }
  if (!isStillAvailable) {
    return { status: false, message: "Cet item n'est plus disponible" };
  }

  // On ajoute l'item à la collection de l'utilisateur
  const { data: newItemUser, error: errorNewItemUser } = await supabase
    .from('items_users')
    .insert([{ id_user: profileConnected!.id_user, id_item: item.item_infos.id_item }])
    .select()
    .single();
  if (errorNewItemUser) {
    console.log(errorNewItemUser);
    return { status: false, message: "Une erreur est survenue lors de l'achat de cet item" };
  }

  // On supprime l'item de la vente
  const { error: errorDeleteVendre } = await supabase
    .from('vendre')
    .delete()
    .eq('id_item', item.item_infos.id_item)
    .eq('id_user', item.seller_infos.id_user)
    .eq('timestamp', item.timestamp);
  if (errorDeleteVendre) {
    console.log(errorDeleteVendre);
    await supabase.from('items_users').delete().eq('id_item_user', newItemUser!.id_item_user);
    return { status: false, message: "Une erreur est survenue lors de l'achat de cet item" };
  }

  // On ajoute l'achat à la table acheter
  // id_buyer & timestamp handled by supabase
  const { data: newAcheter, error: errorAddAcheter } = await supabase
    .from('acheter')
    .insert([{ id_item: item.item_infos.id_item, id_seller: item.seller_infos.id_user, prix: item.prix }])
    .select()
    .single();
  if (errorAddAcheter) {
    console.log(errorAddAcheter);
    await supabase.from('items_users').delete().eq('id_item_user', newItemUser!.id_item_user);
    await supabase
      .from('vendre')
      .insert([{ id_user: item.seller_infos.id_user, id_item: item.item_infos.id_item, prix: item.prix }]);
    return { status: false, message: "Une erreur est survenue lors de l'achat de cet item" };
  }

  // On retire le prix de l'item des SocialCoins de l'utilisateur
  const { error: errorUpdateProfile } = await supabase
    .from('profiles')
    .update({ social_coins: profileConnected!.social_coins - item.prix })
    .eq('id_user', profileConnected!.id_user);
  if (errorUpdateProfile) {
    console.log(errorUpdateProfile);
    await supabase.from('items_users').delete().eq('id_item_user', newItemUser!.id_item_user);
    await supabase
      .from('vendre')
      .insert([{ id_user: item.seller_infos.id_user, id_item: item.item_infos.id_item, prix: item.prix }]);
    await supabase
      .from('acheter')
      .delete()
      .eq('id_item', item.item_infos.id_item)
      .eq('id_buyer', profileConnected!.id_user)
      .eq('timestamp', newAcheter!.timestamp);
    return { status: false, message: "Une erreur est survenue lors de l'achat de cet item" };
  }

  // On retourne un message de succès
  return { status: true, message: "L'item a bien été acheté" };
}
