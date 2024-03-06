'use server';

import { cookies } from 'next/headers';
import { createClient } from './supabase/server';

export const getAveragePriceOfItem = async (id_item: string) => {
  'use server';
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.rpc('get_average_price_for_item', {
    the_id_item: id_item,
  });

  if (error) {
    console.error(error);
    return null;
  }
  return data;
};
