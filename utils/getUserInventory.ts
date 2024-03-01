'use server';

import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { Item } from '@/app/types/entities';

export async function getUserInventory(username: string) {
  'use server';

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // Récupérer l'id_user correspondant au username
  const { data: user, error: userError } = await supabase
    .from('profiles')
    .select('id_user')
    .eq('username', username)
    .single();

  if (userError) {
    console.log('ErrorGetUserInventory', userError);
    return null;
  }

  // Utiliser l'id_user pour filtrer les items_users
  const { data: inventaire, error: inventaireError } = await supabase
    .from('items_users')
    .select('*, is_favorite, items(*), profiles!items_users_id_user_fkey(username)')
    .eq('id_user', user.id_user);

  if (inventaireError) {
    console.log('ErrorGetUserInventory', inventaireError);
    return null;
  }

  // Créer un objet temporaire pour stocker les occurrences des id_item
  const tempItems: Record<string, Item> = {};
  inventaire.forEach((item) => {
    if (!tempItems[item.id_item]) {
      tempItems[item.id_item] = { ...item, count: 1 };
    } else {
      tempItems[item.id_item].count++;
    }
  });

  // Transformer l'objet temporaire en array
  const updatedInventory = Object.values(tempItems);

  return {
    all: updatedInventory?.sort((a, b) => (a.is_favorite ? -1 : 1)),
    equiped: updatedInventory?.filter((item: Item) => item.is_equiped === true),
    banners: updatedInventory?.filter((item: Item) => item.items.type === 'Bannière'),
    badges: updatedInventory?.filter((item: Item) => item.items.type === 'Badge'),
    items: updatedInventory?.filter((item: Item) => item.items.type === 'Arme'),
  } as unknown as { all: Item[]; equiped: Item[]; banners: Item[]; badges: Item[]; items: Item[] };
}
