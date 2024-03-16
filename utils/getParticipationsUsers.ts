"use server"
import { cookies } from 'next/headers';
import { createClient } from "@/utils/supabase/server";

export async function getParticipationsUsers(id_guild_war: string) {
    "use server"
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const user = (await supabase.auth.getUser()).data.user

    const { data: participations, error: participationsError } = await supabase
        .from('guilds_wars_participation')
        .select('*, item_1:items!public_guilds_wars_participation_item_1_fkey(*), item_2:items!public_guilds_wars_participation_item_2_fkey(*), item_3:items!public_guilds_wars_participation_item_3_fkey(*), item_4:items!public_guilds_wars_participation_item_4_fkey(*), item_5:items!public_guilds_wars_participation_item_5_fkey(*)')
        .eq('id_guild_war', id_guild_war)
        .eq('id_user', user?.id)

    if (participationsError) {
        console.error('ErrorGetParticipationsUsers', participationsError)
        return null
    }


    return participations.map((participation: any) => {
        return {
            id_user: participation.id_user,
            items: [
                participation.item_1,
                participation.item_2,
                participation.item_3,
                participation.item_4,
                participation.item_5
            ]
        }
    })
}