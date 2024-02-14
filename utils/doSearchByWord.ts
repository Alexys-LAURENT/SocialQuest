"use server"

import { cookies } from "next/headers"
import { getProfileConnected } from "./getProfileConnected"
import { createClient } from "./supabase/server"

export async function doSearchByWord(query: string | undefined) {
    "use server"

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const profileConnected = await getProfileConnected()

    const [profileResult, guildesResult] = await Promise.all([
        supabase
            .from('profiles')
            .select(`username, avatar_url, niveaux(libelle)`)
            .neq('username', profileConnected?.username)
            .ilike('username', `%${query}%`)
            .limit(10),
        supabase
            .from('guildes')
            .select(`nom, avatar_url, total_members`)
            .ilike('nom', `%${query}%`)
            .limit(10)
    ]);

    const { data: profiles, error: profileError } = profileResult;
    const { data: guildes, error: guildesError } = guildesResult;

    if (profileError || guildesError) {
        console.error(profileError, guildesError)
        return []
    }

    const profileFormatted = profiles?.map((profile: any) => {
        return {
            username: profile.username,
            avatar_url: profile.avatar_url,
            niveau: profile.niveaux.libelle
        }
    })

    return [[...profileFormatted], [...guildes]]
}