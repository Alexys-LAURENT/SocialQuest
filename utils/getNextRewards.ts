'use server';

import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { NextReward } from '@/app/types/entities';
import { cache } from 'react';

export const getNextRewards = cache(async (current_libelle: number) => {
  'use server';

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: nextLevelId, error: nextLevelIdError } = await supabase
    .from('niveaux')
    .select('id_niveau')
    .eq('libelle', current_libelle + 1);

  if (nextLevelIdError) {
    console.log('ErrorGetNextRewards', nextLevelIdError);
    return null;
  }

  const { data, error } = await supabase
    .from('items_niveaux')
    .select('items(id_item, nom, type, image_url, damage)')
    .eq('id_niveau', nextLevelId[0].id_niveau);

  if (error) {
    console.log('ErrorGetNextRewards', error);
    return null;
  }

  return data as unknown as NextReward[];
});
