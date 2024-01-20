"use server"

import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { User } from '@supabase/supabase-js'
import { getUserConnected } from './getUserConnected'
import { Profile } from '@/app/types/entities'

export async function getPageProfile(username: string, user?: User | null) {
    "use server"


    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    if (!user) user = await getUserConnected()

    if (user) {

        const { data: profile, error } = await supabase
            .from('profiles')
            .select("*, niveaux(*), users_badges(items(*))")
            .eq('username', username)
            .single()
        return profile as unknown as Profile
    }
    return null
}