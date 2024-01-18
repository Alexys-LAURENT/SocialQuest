"use server"

import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { User } from '@supabase/supabase-js'
import { getUserConnected } from './getUserConnected'

export async function getUserInventory(user?: User | null) {
    "use server"


    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    if (!user) user = await getUserConnected()

    if (user) {

        const { data: inventaire, error } = await supabase
            .from('items_users')
            .select("items(*)")
            .eq('id_user', user.id)

        return inventaire as unknown as any[]
    }

    return null
}