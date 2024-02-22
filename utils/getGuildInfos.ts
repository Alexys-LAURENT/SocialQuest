'use server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function getGuildInfos(guilde_name: string, id_user: string | undefined) {
  'use server';

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  var is_user_in_guilde = false;

  const { data: guilde, error: guildeError } = await supabase
    .from('guildes')
    .select('id_guilde,nom,description,avatar_url,created_by')
    .eq('nom', guilde_name)
    .single();

  if (guildeError) console.error(guildeError);

  if (id_user) {
    const { data: isUserInGuilde, error: errorIsUserInGuilde } = await supabase
      .from('guildes_users')
      .select('id_user')
      .eq('id_user', id_user)
      .eq('id_guilde', guilde?.id_guilde);

    if (errorIsUserInGuilde) console.error(errorIsUserInGuilde);
    if (isUserInGuilde && isUserInGuilde?.length > 0) {
      is_user_in_guilde = true;
    }
  }

  return { ...guilde, isUserInGuilde: is_user_in_guilde };
}
