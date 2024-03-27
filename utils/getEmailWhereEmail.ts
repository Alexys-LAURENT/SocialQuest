'use server';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { getProfileConnected } from './getProfileConnected';

export const getEmailWhereEmail = async (email: string) => {
  'use server';
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const profile = await getProfileConnected();

  if (profile?.email?.toLowerCase() === email.toLowerCase()) {
    return true;
  }

  const { data, error } = await supabase.from('profiles').select('email').ilike('email', email).limit(1);

  if (error) {
    console.error('ErrorGetEmailWhereEmail', error);
    return false;
  }


  // if the guilde exists return false otherwise true
  return data[0] && data[0].email ? false : true;
};
