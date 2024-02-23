"use server"

import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"


export async function getUserNotifications(id_user: string) {
    "use server"

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase.from("notifications").select("*").eq("id_user", id_user).order("created_at", { ascending: false }).limit(5)

    if (error) {
        console.error('ErrorGetUserNotifications', error)
        return false
    }
    return data
}