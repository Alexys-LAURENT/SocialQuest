'use server';
import { GuildePage } from '@/app/types/entities';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function getGuildInfos(guilde_name: string, id_user: string | undefined) {
  'use server';

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  var is_user_in_guilde = false;

  const { data: guilde, error: guildeError } = await supabase
    .from('guildes')
    .select('id_guilde,nom,description,avatar_url,banner_url,created_by, moderators:guildes_users(id_user)')
    .eq('nom', guilde_name)
    .eq('guildes_users.is_moderator', true)
    .single();

  if (guildeError) {
    console.error('ErrorGetGuildInfos', guildeError);
    return null;
  }

  if (id_user) {
    const { data: isUserInGuilde, error: errorIsUserInGuilde } = await supabase
      .from('guildes_users')
      .select('id_user')
      .eq('id_user', id_user)
      .eq('id_guilde', guilde?.id_guilde);

    if (errorIsUserInGuilde) {
      console.error('ErrorGetIsUserInGuilde', errorIsUserInGuilde);
      return null;
    }

    if (isUserInGuilde && isUserInGuilde?.length > 0) {
      is_user_in_guilde = true;
    }
  }

  return { ...guilde, isUserInGuilde: is_user_in_guilde } as GuildePage;
}
