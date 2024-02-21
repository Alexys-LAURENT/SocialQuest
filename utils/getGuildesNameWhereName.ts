'use server';
import { cookies } from 'next/headers';
import { createClient } from './supabase/server';

export const getGuildesNameWhereName = async (name: string) => {
  'use server';
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.from('guildes').select('nom').ilike('nom', name).limit(1);

  if (error) {
    console.error(error);
    return false;
  }
  // if the guilde exists return false otherwise true
  return data[0] && data[0].nom ? false : true;
};
