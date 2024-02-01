"use server"

import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { Profile } from '@/app/types/entities'
import { getProfileConnected } from './getProfileConnected'

export async function getPageProfile(username: string) {
    "use server"


    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const user = await getProfileConnected()
    const { data: profile, error } = await supabase
        .from('profiles')
        .select("*, niveaux(*), users_badges(items(*))")
        .eq('username', username)
        .single() as unknown as { data: Profile, error: Error }

    if (error) {
        console.log(error)
        return null
    }

    if (profile.id_user === user?.id_user) return profile as unknown as Profile

    if (!user) {
        profile.isFollowed = false
        return profile as unknown as Profile
    }

    const { data: isFollowed, error: errorIsFollowed } = await supabase.from('follow').select('id_follow').eq('id_user', user.id_user).eq('id_followed', profile?.id_user)

    if (errorIsFollowed) {
        console.log(errorIsFollowed)
        return null
    }
    console.log(isFollowed)
    if (isFollowed[0] && isFollowed[0].id_follow !== undefined) {
        profile.isFollowed = true
    } else {
        profile.isFollowed = false
    }

    return profile as unknown as Profile
}