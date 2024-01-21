"use server"

import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { User } from '@supabase/supabase-js'
import { getUserConnected } from '@/utils/getUserConnected'
import { Profile } from '@/app/types/entities'

export async function getProfileConnected(user?: User | null) {
    "use server"


    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    if (!user) user = await getUserConnected()

    if (user) {

        const { data: profile, error } = await supabase
            .from('profiles')
            .select("id_user,updated_at,username,prenom,nom,a_propos,avatar_url,xp,social_coins,banner_url, niveaux(*), users_badges(items(*))")
            .eq('id_user', user.id)
            .single()
        return profile as unknown as Profile
    }
    return null
}