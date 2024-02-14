"use server"

import { getProfileConnected } from "@/utils/getProfileConnected"
import { createClient } from "@/utils/supabase/server"
import { cookies } from 'next/headers';

export async function sendPost(data: { id_guilde?: string, titre: string, contenu: string, parent?: string}) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    
    const { error } = await supabase.from('posts').insert([
        // iduser handled by supabase auth.uid()
        data
    ])

    if (error) {
        console.error(error)
        return false
    }

    const user = await getProfileConnected()

    const { error: errorUpdateProfile } = await supabase.from('profiles').update({ xp: user!.xp + 1 }).eq('id_user', user!.id_user)

    if (errorUpdateProfile) {
        console.error(errorUpdateProfile)

    }

    return true
}