'use server';

import { cookies } from 'next/headers';
import { createClient } from './supabase/server';

export async function getCountGuildeMember(id_guilde: string) {
  'use server';

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: guildeUsersCount, error } = await supabase
    .from('guildes_users')
    .select('count')
    .eq('id_guilde', id_guilde);

  if (error) {
    console.error('ErrorGetCountGuildeMember', error);
    return;
  }

  return guildeUsersCount[0].count;
}
