"use server"

import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { Profile } from '@/app/types/entities'
import { getProfileConnected } from '@/utils/getProfileConnected'
import { doesFollow } from '@/utils/doesFollow'

export async function getPageProfile(username: string) {
    "use server"


    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const user = await getProfileConnected()
    const { data: profile, error } = await supabase
        .from('profiles')
        .select("*, niveaux(*))")
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

    const follow = await doesFollow(profile.id_user, user.id_user)
    profile.isFollowed = follow

    return profile as unknown as Profile
}