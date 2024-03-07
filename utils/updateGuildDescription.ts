'use server';
import { cookies } from 'next/headers';
import { createClient } from './supabase/server';

export const updateGuildDescription = async (id_guilde: string, new_description: string) => {
  'use server';
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.from('guildes').update({ description: new_description }).eq('id_guilde', id_guilde);
  if (error) {
    console.error('ErrorRemoveUserFromGuild', error);
    return false;
  }
  return true;
};
