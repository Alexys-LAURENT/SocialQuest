'use server';
import { cookies } from 'next/headers';
import { createClient } from './supabase/server';

export const removeUserFromGuild = async (id_guilde: string, id_user: string) => {
  'use server';
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from('guildes_users')
    .delete()
    .eq('id_guilde', id_guilde)
    .eq('id_user', id_user);
  if (error) {
    console.error('ErrorRemoveUserFromGuild', error);
    return false;
  }
  return true;
};
