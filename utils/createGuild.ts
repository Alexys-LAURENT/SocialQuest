'use server';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

export async function createGuild(nom_guilde: string, avatar_url: string, description_guilde: string) {
  'use server';
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from('guildes')
    .insert([{ nom: nom_guilde, avatar_url, description: description_guilde }])
    .select()
    .limit(1)
    .single();

  if (error) {
    console.error('ErrorCreateGuild', error);
    return false;
  }

  const { error: guildesUsersError } = await supabase
    .from('guildes_users')
    .insert([{ id_guilde: data.id_guilde, id_user: data.created_by, is_admin: true, is_moderator: true }]);

  if (guildesUsersError) {
    console.error('ErrorCreateGuildUser', guildesUsersError);
    return false;
  }

  return true;
}
