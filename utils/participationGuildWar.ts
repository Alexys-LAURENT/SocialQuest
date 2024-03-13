"use server"
import { cookies } from 'next/headers';
import { createClient } from "@/utils/supabase/server";

export async function participationGuildWar(id_guilde_war: string, items: any) {
    "use server"
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const user = (await supabase.auth.getUser()).data.user;

    for (const item of items) {
        const { data: items_users, error: items_usersError } = await supabase
            .from('items_users')
            .select('id_item')
            .eq('id_user', user?.id)
            .eq('id_item', item.id_item)

        if (items_usersError) {
            console.error('ErrorGetUsableGuildWarItem', items_usersError)
            return null
        }

        if (items_users.length === 0) {
            console.error('ErrorGetUsableGuildWarItem', 'item not found')
            return null
        }

        const { data: deleteItem, error: deleteItemError } = await supabase
            .from('items_users')
            .delete()
            .eq('id_user', user?.id)
            .eq('id_item', item.id_item)
            .order('obtained_at', { ascending: false })
            .single()

        if (deleteItemError) {
            console.error('ErrorGetUsableGuildWarItem', deleteItemError)
            return null
        }

    }

    const { data: participation, error: participationError } = await supabase
        .from('participation_guild_war')
        .insert([
            {
                id_guilde_war,
                id_user: user?.id,
                item_1: items[0].id_item,
                item_2: items[1].id_item,
                item_3: items[2].id_item,
                item_4: items[3].id_item,
                item_5: items[4].id_item
            }
        ])

    if (participationError) {
        console.error('ErrorGetUsableGuildWarItem', participationError)
        return null
    }

    return participation
}