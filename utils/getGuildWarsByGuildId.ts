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
      'id_guild_war, requested_at, responsed_at,status,item_1:public_guilds_wars_item_1_fkey(nom,image_url,rarete,type),item_2:public_guilds_wars_item_2_fkey(nom,image_url,rarete,type),item_3:public_guilds_wars_item_3_fkey(nom,image_url,rarete,type),item_4:public_guilds_wars_item_4_fkey(nom,image_url,rarete,type),item_5:public_guilds_wars_item_5_fkey(nom,image_url,rarete,type), guild_who_asked_infos:guildes!public_guilds_wars_guild_who_asked_fkey(id_guilde,nom, avatar_url), guild_who_received_infos:guildes!public_guilds_wars_guild_who_received_fkey(id_guilde,nom, avatar_url)',

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

  async function getParticipations() {
    for (const guildWar of data) {
      const { data: participationsGuildWhoAsk, error: participationsGuildWhoAskError } = await supabase
        .from('guilds_wars_participation')
        .select('*, item_1:items!public_guilds_wars_participation_item_1_fkey(*), item_2:items!public_guilds_wars_participation_item_2_fkey(*), item_3:items!public_guilds_wars_participation_item_3_fkey(*), item_4:items!public_guilds_wars_participation_item_4_fkey(*), item_5:items!public_guilds_wars_participation_item_5_fkey(*)')
        .eq('id_guilde', guildWar.guild_who_asked_infos.id_guilde)
        .eq('id_guild_war', guildWar.id_guild_war);

      if (participationsGuildWhoAskError) {
        console.error('ErrorGetGuildWarsByGuildId', participationsGuildWhoAskError);
        return [];
      }

      const { data: participationsGuildWhoReceived, error: participationsGuildWhoReceivedError } = await supabase
        .from('guilds_wars_participation')
        .select('*, item_1:items!public_guilds_wars_participation_item_1_fkey(*), item_2:items!public_guilds_wars_participation_item_2_fkey(*), item_3:items!public_guilds_wars_participation_item_3_fkey(*), item_4:items!public_guilds_wars_participation_item_4_fkey(*), item_5:items!public_guilds_wars_participation_item_5_fkey(*)')
        .eq('id_guilde', guildWar.guild_who_received_infos.id_guilde)
        .eq('id_guild_war', guildWar.id_guild_war);

      if (participationsGuildWhoReceivedError) {
        console.error('ErrorGetGuildWarsByGuildId', participationsGuildWhoReceivedError);
        return [];
      }

      guildWar.participationsGuildWhoAsk =
        participationsGuildWhoAsk.map((participation) => {
          return {
            id_user: participation.id_user,
            items: [
              participation.item_1,
              participation.item_2,
              participation.item_3,
              participation.item_4,
              participation.item_5,
            ],
          };
        });

      guildWar.participationsGuildWhoReceived =
        participationsGuildWhoReceived.map((participation) => {
          return {
            id_user: participation.id_user,
            items: [
              participation.item_1,
              participation.item_2,
              participation.item_3,
              participation.item_4,
              participation.item_5,
            ],
          };
        });

    }
  }

  await getParticipations();

  return data as GuildWar[];
}
