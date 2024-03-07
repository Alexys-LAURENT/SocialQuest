'use server';
import { cookies } from 'next/headers';
import { createClient } from './supabase/server';

export const toggleModeratorStatus = async (id_guilde: string, id_user: string, toggle: 'mod' | 'unmod') => {
  'use server';
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  if (toggle === 'unmod') {
    const { error } = await supabase
      .from('guildes_users')
      .update({ is_moderator: false })
      .eq('id_guilde', id_guilde)
      .eq('id_user', id_user);
    if (error) {
      console.error('ErrorRemoveModeratorStatus', error);
      return false;
    }
    return true;
  } else if (toggle === 'mod') {
    const { error } = await supabase
      .from('guildes_users')
      .update({ is_moderator: true })
      .eq('id_guilde', id_guilde)
      .eq('id_user', id_user);
    if (error) {
      console.error('ErrorRemoveModeratorStatus', error);
      return false;
    }
    return true;
  }
};
