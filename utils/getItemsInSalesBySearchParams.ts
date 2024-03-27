import { cookies } from 'next/headers';
import { createClient } from './supabase/server';
import { itemShop, shopSearchParmas } from '@/app/types/entities';
import { getUserConnected } from './getUserConnected';

export async function getItemsInSalesBySearchParams(searchParams: shopSearchParmas) {
  'use server';
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const userConnected = await getUserConnected();

  let query = supabase
    .from('vendre')
    .select(
      'seller_infos:profiles!inner(id_user, username, avatar_url), timestamp, prix, item_infos:items!inner(id_item, type, image_url, damage, nom, description,rarete)',
    )
    .not('seller_infos.id_user', 'eq', userConnected ? userConnected.id : '');

  if (searchParams.name && typeof searchParams.name === 'string') {
    query = query.ilike('items.nom', `%${searchParams.name}%`);
  }

  if (searchParams.price && typeof searchParams.price === 'string') {
    let finalQuery = [] as string[];
    searchParams.price.split(',').map((price) => {
      switch (price.toLowerCase()) {
        case '0-100':
          finalQuery.push('and(prix.gte.0,prix.lte.100)');
          break;
        case '100-250':
          finalQuery.push('and(prix.gte.100,prix.lte.250)');
          break;
        case '250-400':
          finalQuery.push('and(prix.gte.250,prix.lte.400)');
          break;
        case '400-550':
          finalQuery.push('and(prix.gte.400,prix.lte.550)');
          break;
        case 'gt-550':
          finalQuery.push('prix.gte.550');
          break;
        default:
          break;
      }
    });
    query = query.or(finalQuery.join(','));
  }

  if (searchParams.order && typeof searchParams.order === 'string') {
    switch (searchParams.order) {
      case 'pasc':
        query.order('prix', { ascending: true });
        break;
      case 'pdesc':
        query.order('prix', { ascending: false });
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

  const dataWithTimestampFormatted = data.map((item: any) => {
    item.timestampFormatted = new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(new Date(item.timestamp));
    return item;
  });

  function sortByItemName(dataArray: any, order: 'za' | 'az') {
    const sortedArray = [...dataArray]; // Créer une copie du tableau pour éviter de modifier l'original

    sortedArray.sort((a, b) => {
      const nameA = a.item_infos.nom.toUpperCase(); // Ignorer la casse
      const nameB = b.item_infos.nom.toUpperCase(); // Ignorer la casse
      let comparison = 0;
      if (nameA > nameB) {
        comparison = 1;
      } else if (nameA < nameB) {
        comparison = -1;
      }
      return order === 'az' ? comparison : -comparison; // Inverser le résultat si le sens est "za"
    });

    return sortedArray;
  }

  if (searchParams.order && typeof searchParams.order === 'string' && searchParams.order === 'az') {
    return sortByItemName(dataWithTimestampFormatted, 'az') as unknown as itemShop[];
  }

  if (searchParams.order && typeof searchParams.order === 'string' && searchParams.order === 'za') {
    return sortByItemName(dataWithTimestampFormatted, 'za') as unknown as itemShop[];
  }
  return dataWithTimestampFormatted as unknown as itemShop[];
}
