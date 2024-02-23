"use server"
import { createClient } from "@/utils/supabase/server";
import { cookies } from 'next/headers'

export async function joinGuild(id_user: string, id_guild: string) {
    "use server"
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
        .from('guildes_users')
        .insert([{ id_user: id_user, id_guilde: id_guild }])


    if (error) {
        console.error('ErrorJoinGuild', error)
        return false
    }

    return true

}

export async function leaveGuild(id_user: string, id_guild: string) {
    "use server"
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
        .from('guildes_users')
        .delete()
        .eq('id_user', id_user)
        .eq('id_guilde', id_guild)
    if (error) {
        console.error('ErrorLeaveGuild', error)
        return false
    }

    return true

}