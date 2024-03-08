'use server';
import { cookies } from 'next/headers';
import { createClient } from './supabase/server';

export async function respondToGuildWar(response: 'accept' | 'refuse', id_guild_war: string) {
  'use server';
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const responseDb = response === 'accept' ? 'En cours' : 'Refusé';

  const { error } = await supabase.from('guilds_wars').update({ status: responseDb }).eq('id_guild_war', id_guild_war);

  if (error) {
    console.log('error respondToGuildWar');
    console.log(error);
    return false;
  }

  return true;
}
