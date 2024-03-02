import { cookies } from 'next/headers';
import { createClient } from './supabase/server';
import { itemShop, shopSearchParmas } from '@/app/types/entities';

export async function getItemsInSalesBySearchParams(searchParams: shopSearchParmas) {
  'use server';
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let query = supabase
    .from('vendre')
    .select(
      'seller_infos:profiles!inner(id_user, username, avatar_url), timestamp, prix, item_infos:items!inner(id_item, type, image_url, damage, nom, description)',
    );

  if (searchParams.name && typeof searchParams.name === 'string') {
    query = query.ilike('items.nom', `%${searchParams.name}%`);
  }

  if (searchParams.price && typeof searchParams.price === 'string') {
    searchParams.price.split(',').map((price) => {
      switch (price.toLowerCase()) {
        case '0-100':
          query = query.gte('prix', 0).lte('prix', 100);
          break;
        case '100-250':
          query = query.gte('prix', 100).lte('prix', 250);
          break;
        case '250-400':
          query = query.gte('prix', 250).lte('prix', 400);
          break;
        case '400-550':
          query = query.gte('prix', 400).lte('prix', 550);
          break;
        case 'gt-550':
          query = query.gte('prix', 550);
          break;
        default:
          break;
      }
    });
  }

  if (searchParams.order && typeof searchParams.order === 'string') {
    switch (searchParams.order) {
      case 'pasc':
        query.order('prix', { ascending: true });
        break;
      case 'pdesc':
        query.order('prix', { ascending: false });
        break;
      case 'az':
        query.order('nom', { referencedTable: 'items', ascending: true });
        break;
      case 'za':
        query.order('nom', { referencedTable: 'items', ascending: false });
        break;
      default:
        break;
    }
  }

  if (searchParams.type && typeof searchParams.type === 'string') {
    const correctTypes = ['banniere', 'badge', 'arme'];
    //remove all types that are not in the correctTypes array
    const types = searchParams.type.split(',').filter((type) => correctTypes.includes(type.toLowerCase()));
    // if type contains "banniere" change it to "Bannière"
    if (types.includes('Banniere')) {
      types[types.indexOf('Banniere')] = 'Bannière';
    }
    query = query.in('items.type', types);
  }

  const { data, error } = await query;

  if (error) {
    console.log(error);
    return [];
  }
  return data as unknown as itemShop[];
}
