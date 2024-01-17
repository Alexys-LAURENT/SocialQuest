"use server";
import { getProfileConnected } from "./getProfileConnected";
import { createClient } from "./supabase/server"
import { cookies } from 'next/headers'

export async function getGuildInfos(guilde_name: string) {
    "use server"

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const user = await getProfileConnected()

    const { data: guilde, error: guildeError } = await supabase
        .from('guildes')
        .select("id_guilde,nom,description,avatar_url,created_by")
        .eq("nom", guilde_name)
        .single()

    if (guildeError) console.error(guildeError)

    const { data: guildeUsersCount, error } = await supabase
        .from('guildes_users')
        .select("count")
        .eq("id_guilde", guilde?.id_guilde)

    console.log(guildeUsersCount![0].count)

    const { data: isUserInGuilde, error: errorIsUserInGuilde } = await supabase
        .from('guildes_users')
        .select("id_user")
        .eq("id_user", user?.id_user)
        .eq("id_guilde", guilde?.id_guilde)

    if (errorIsUserInGuilde) console.error(errorIsUserInGuilde)
    if (isUserInGuilde && isUserInGuilde?.length > 0) {
        return { ...guilde, usersCount: guildeUsersCount![0].count, isUserInGuilde: true }
    } else {
        return { ...guilde, usersCount: guildeUsersCount![0].count, isUserInGuilde: false }
    }

}
