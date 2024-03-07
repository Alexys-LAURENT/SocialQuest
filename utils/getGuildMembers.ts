'use server';
import { cookies } from 'next/headers';
import { createClient } from './supabase/server';
import { getUserConnected } from './getUserConnected';
import { Member } from '@/app/types/entities';

export async function getGuildMembers(id_guilde: string) {
  'use server';
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const userConnected = await getUserConnected();

  const { data: members, error: membersError } = (await supabase
    .from('guildes_users')
    .select('is_moderator,profiles(id_user, username, avatar_url)')
    .eq('id_guilde', id_guilde)
    .neq('id_user', userConnected!.id)) as unknown as {
    data: {
      is_moderator: boolean;
      profiles: {
        is_moderator: boolean;
        id_user: string;
        username: string;
        avatar_url: string;
      };
    }[];
    error: Error;
  };

  if (membersError) {
    console.log('ErrorGetGuildMembers', membersError);
    return [];
  }

  const membersFormatted = members?.map((member) => {
    return {
      is_moderator: member.is_moderator,
      id_user: member.profiles.id_user,
      username: member.profiles.username,
      avatar_url: member.profiles.avatar_url,
    };
  }) as Member[] | undefined;

  return membersFormatted;
}
