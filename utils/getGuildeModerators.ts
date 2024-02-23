'use server';
import { cookies } from 'next/headers';
import { createClient } from './supabase/server';

export async function getGuildeModerators(id_guilde: string) {
  'use server';
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = (await supabase
    .from('guildes_users')
    .select('is_admin,profiles(username, avatar_url)')
    .eq('id_guilde', id_guilde)
    .eq('is_moderator', true)
    .order('is_admin', { ascending: false })) as unknown as {
      data: { is_admin: boolean; profiles: { username: string; avatar_url: string } }[];
      error: any;
    };

  if (error) {
    console.error('ErrorGetGuildeModerators', error);
    return;
  }

  const moderators = data.map((item: { is_admin: boolean; profiles: { username: string; avatar_url: string } }) => ({
    is_admin: item.is_admin,
    username: item.profiles.username,
    avatar_url: item.profiles.avatar_url,
  }));

  return moderators;
}
