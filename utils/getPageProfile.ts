"use server"

import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { Profile } from '@/app/types/entities'

export async function getPageProfile(username: string) {
    "use server"


    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data: profile, error } = await supabase
        .from('profiles')
        .select("*, niveaux(*), users_badges(items(*))")
        .eq('username', username)
        .single()

    if (error) {
        console.log(error)
        return null
    }

    console.log(profile)

    return profile as unknown as Profile
}