import { cookies } from 'next/headers';
import { createClient } from './supabase/server';
import { shopSearchParmas } from '@/app/types/entities';

export async function getItemsInSalesBySearchParams(searchParams: shopSearchParmas) {
  'use server';
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let query = supabase
    .from('vendre')
    .select('id_user, timestamp, prix, items!inner(id_item, type, image_url, damage, nom, description)');

  if (searchParams.name) {
    query = query.ilike('items.nom', `%${searchParams.name}%`);
  }

  if (searchParams.pmin && searchParams.pmax && searchParams.pmin >= 0 && searchParams.pmax > 0) {
    query = query.gte('prix', searchParams.pmin).lte('prix', searchParams.pmax);
  }

  if (searchParams.order) {
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

  if (searchParams.type) {
    if (typeof searchParams.type === 'string') {
      query = query.eq('items.type', searchParams.type.charAt(0).toUpperCase() + searchParams.type.slice(1));
    } else {
      query = query.in(
        'items.type',
        searchParams.type.map((type) => type.charAt(0).toUpperCase() + type.slice(1)),
      );
    }
  }

  const { data, error } = await query;

  if (error) {
    console.log(error);
    return [];
  }

  return data;
}
