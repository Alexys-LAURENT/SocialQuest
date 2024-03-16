'use server';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

export const getGuildesNameWhereName = async (name: string, getInfos: boolean, id_user_to_exclude?: string) => {
  'use server';
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  if (!getInfos) {
    // THIS PART OF THE FUNCTION HELP TO CHECK IF NAME IS ALREADY TAKEN
    const { data, error } = await supabase.from('guildes').select('nom').ilike('nom', name).single();

    if (error) {
      console.error('ErrorGetGuildesNameWhereName', error);
      return true;
    }

    // if the guilde exists return false otherwise true
    return data === null ? true : false;
  }

  if (!id_user_to_exclude) return [];

  //THIS PART OF THE FUNCTION RETURNS GUILDES INFOS BY NAME
  const { data, error } = await supabase
    .from('guildes')
    .select('nom,id_guilde,avatar_url')
    .ilike('nom', `%${name}%`)
    .neq('created_by', id_user_to_exclude)
    .limit(7);
  if (error) {
    console.error('ErrorGetGuildesNameWhereName', error);
    return [];
  }

  return data;
};
