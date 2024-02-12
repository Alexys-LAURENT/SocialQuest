"use server"

import { cookies } from "next/headers";
import { getProfileConnected } from "@/utils/getProfileConnected";
import { createClient } from "@/utils/supabase/server";

export async function toggleFollow(idUserFollowed: string, isFollowedNow: boolean, idUserConnected?: string) {
    "use server"
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    if (!idUserConnected) {
        idUserConnected = (await getProfileConnected())?.id_user
    }

    if (isFollowedNow) {
        const { error } = await supabase
            .from('follow')
            .delete()
            .eq('id_user', idUserConnected)
            .eq('id_followed', idUserFollowed)
        if (error) {
            console.log(error)
            return false
        }
        return true
    } else {
        const { error } = await supabase
            .from('follow')
            .insert([{ id_user: idUserConnected, id_followed: idUserFollowed }])
        if (error) {
            console.log(error)
            return false
        }
        return true
    }


}