'use server';

import { cookies } from 'next/headers';
import { createClient } from './supabase/server';
import { GuildWar } from '@/app/types/entities';

export async function getGuildWarsByGuildId(id_guilde: string, is_admin: boolean) {
  'use server';
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const query = supabase
    .from('guilds_wars')
    .select(
      'id_guild_war, requested_at, responsed_at,status,item_1:public_guilds_wars_item_1_fkey(nom,image_url,rarete),item_2:public_guilds_wars_item_2_fkey(nom,image_url,rarete),item_3:public_guilds_wars_item_3_fkey(nom,image_url,rarete),item_4:public_guilds_wars_item_4_fkey(nom,image_url,rarete),item_5:public_guilds_wars_item_5_fkey(nom,image_url,rarete), guild_who_asked_infos:guildes!public_guilds_wars_guild_who_asked_fkey(id_guilde,nom, avatar_url), guild_who_received_infos:guildes!public_guilds_wars_guild_who_received_fkey(id_guilde,nom, avatar_url)',
    )
    .or(`guild_who_asked.eq.${id_guilde},guild_who_received.eq.${id_guilde}`)
    .neq('status', 'Refusé');

  if (!is_admin) {
    query.eq('status', 'En cours');
  }

  const { data, error } = (await query) as unknown as { data: GuildWar[]; error: any };

  if (error) {
    console.log('error getGuildWarsByGuildId');
    console.log(error);
    return [];
  }

  return data as GuildWar[];
}
