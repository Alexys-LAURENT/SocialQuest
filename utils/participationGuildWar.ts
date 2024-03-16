"use server"
import { cookies } from 'next/headers';
import { createClient } from "@/utils/supabase/server";

export async function participationGuildWar(id_guilde: string, id_guild_war: string, items: any) {
    "use server"
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const user = (await supabase.auth.getUser()).data.user;

    // Check if the user has the items
    for (const item of items) {
        const { data: items_users, error: items_usersError } = await supabase
            .from('items_users')
            .select('id_item')
            .eq('id_user', user?.id)
            .eq('id_item', item.id_item)

        if (items_usersError) {
            console.error('ErrorParticipationGuildWar', items_usersError)
            return null
        }

        if (items_users.length === 0) {
            console.error('ErrorParticipationGuildWar', 'Vous ne possédez pas cet item')
            return null
        }

    }

    // Insert the participation
    const { data: participation, error: participationError } = await supabase
        .from('guilds_wars_participation')
        .upsert([
            {
                id_guilde,
                id_guild_war,
                id_user: user?.id,
                item_1: items[0].id_item,
                item_2: items[1]?.id_item,
                item_3: items[2]?.id_item,
                item_4: items[3]?.id_item,
                item_5: items[4]?.id_item
            }
        ])
        .select()

    if (participationError) {
        console.error('ErrorParticipationGuildWar', participationError)
        return null
    }

    // delete the items from items_users
    for (const item of items) {
        const { data: items_users, error: items_usersError } = await supabase
            .from('items_users')
            .delete()
            .eq('id_user', user?.id)
            .eq('id_item_user', item.id_item_user)

        if (items_usersError) {
            console.error('ErrorParticipationGuildWar', items_usersError);
            return null;
        }
    }


    return participation

}