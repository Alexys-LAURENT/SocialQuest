'use server';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

export const getUsernameWhereName = async (username: string) => {
  'use server';
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.from('profiles').select('username').ilike('username', username).limit(1);

  if (error) {
    console.error('ErrorGetGuildesNameWhereName', error);
    return false;
  }
  // if the guilde exists return false otherwise true
  return data[0] && data[0].username ? false : true;
};
