"use server"

import { cookies } from "next/headers";
import { createClient } from "./supabase/server";
import { getProfileConnected } from "./getProfileConnected";

export async function doesFollow(idUserDoesFollow: string, idUserConnected?: string) {
    "use server"
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    var IDUSERCONNECTED;

    if (!idUserConnected) {
        const user = await getProfileConnected()
        IDUSERCONNECTED = user?.id_user
    }

    const { data: isFollowed, error: errorIsFollowed } = await supabase.from('follow').select('id_follow').eq('id_user', idUserConnected || IDUSERCONNECTED).eq('id_followed', idUserDoesFollow)

    if (errorIsFollowed) {
        console.log(errorIsFollowed)
        return false
    }
    if (isFollowed[0] && isFollowed[0].id_follow !== undefined) {
        return true
    } else {
        return false
    }
}