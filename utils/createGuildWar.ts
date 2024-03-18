'use server';
import { cookies } from 'next/headers';
import { createClient } from './supabase/server';

let INFOS_ITEMS = 'nom,image_url,rarete';

export default async function createGuildWar(id_guild_who_asked: string, id_guild_who_received: string) {
  'use server';
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // data {
  // f1 : legendary item
  // f2 : epic item
  // f3 : rares/commons items
  // }

  //  generate number between 1 and 13
  const randomLegendary = Math.floor(Math.random() * 13) + 1;
  //  generate number between 1 and 7
  const randomEpic = Math.floor(Math.random() * 7) + 1;
  // generate number between 2 and 5
  const amountToTake = Math.floor(Math.random() * 4) + 2;

  const { data, error } = await supabase.rpc('generate_guild_war_gains', {
    should_take_legendary: randomLegendary === 1,
    should_take_epic: randomEpic === 1,
    amount_to_take: amountToTake,
  });

  if (error) {
    console.error('error rpc');
    console.error(error);
    return false;
  }

  const allItems = Object.values(data)
    .flat()
    .filter((item) => item !== null);

  const { data: guildWarGains, error: errorInsert } = await supabase
    .from('guilds_wars')
    .insert([
      {
        guild_who_asked: id_guild_who_asked,
        guild_who_received: id_guild_who_received,
        item_1: allItems[0],
        item_2: allItems[1],
        item_3: allItems[2],
        item_4: allItems[3],
        item_5: allItems[4],
      },
    ])
    .select(
      `public_guilds_wars_item_1_fkey(${INFOS_ITEMS}),public_guilds_wars_item_2_fkey(${INFOS_ITEMS}),public_guilds_wars_item_3_fkey(${INFOS_ITEMS}),public_guilds_wars_item_4_fkey(${INFOS_ITEMS}),public_guilds_wars_item_5_fkey(${INFOS_ITEMS})`,
    );
  if (errorInsert) {
    console.error(errorInsert);
    return false;
  }

  return Object.values(guildWarGains[0]).filter((item) => item !== null) as unknown as {
    nom: string;
    rarete: string;
    image_url: string;
  }[];
}
