"use server";
import { createClient } from "@/utils/supabase/server"
import { cookies } from 'next/headers'

export async function getBannieresUser(id_user: string) {
    "use server"

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data: bannieres, error: bannieresError } = await supabase
        .from('items_users')
        .select(`items(*)`)
        .eq('is_favorite', true)
        .eq('id_user', id_user)
        .eq('items.type', 'Bannière')

    if (bannieresError) return console.error(bannieresError)

    return bannieres.filter((banniere: any) => banniere.items !== null)
}

export async function getBadgesUser(id_user: string) {
    "use server"

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data: badges, error: badgesError } = await supabase
        .from('items_users')
        .select(`items(*)`)
        .eq('is_favorite', true)
        .eq('id_user', id_user)
        .eq('items.type', 'Badge')

    if (badgesError) return console.error(badgesError)

    return badges.filter((badge: any) => badge.items !== null)
}