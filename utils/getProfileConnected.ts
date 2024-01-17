"use server"

import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { User } from '@supabase/supabase-js'
import { getUserConnected } from './getUserConnected'

export async function getProfileConnected(user?: User | null) {
    "use server"


    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    if (!user) user = await getUserConnected()

    if (user) {

        const { data: profile, error } = await supabase
            .from('profiles')
            .select()
            .eq('id_user', user.id)
            .single()
        return profile
    }
    throw new Error('No user connected')
}