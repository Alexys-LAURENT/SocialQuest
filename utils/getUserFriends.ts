"use server"

import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"

export async function getUserFriends(id_user: string, search?: string) {
    "use server"
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    if (search) {
        const { data: friends, error } = await supabase.from('follow').select('profiles!follow_id_followed_fkey(id_user,username, avatar_url)').eq('id_user', id_user).ilike('profiles.username', `%${search}%`) as unknown as any
        if (error) {
            console.error(error)
            return null
        }

        return friends.map((friend: any) => friend.profiles).filter((friend: any) => friend !== null)

    } else {
        const { data: friends, error } = await supabase.from('follow').select('profiles!follow_id_followed_fkey(id_user,username, avatar_url)').eq('id_user', id_user)
        if (error) {
            console.error(error)
            return null
        }
        return friends.map(friend => friend.profiles)

    }


}