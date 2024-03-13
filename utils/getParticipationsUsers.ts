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
        .select('*')
        .eq('id_guild_war', id_guild_war)
        .eq('id_user', user?.id)

    if (participationsError) {
        console.error('ErrorGetParticipationsUsers', participationsError)
        return null
    }

    return participations
}