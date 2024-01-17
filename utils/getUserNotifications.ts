"use server"

import { cookies } from "next/headers"
import { createClient } from "./supabase/server"


export async function getUserNotifications(id_user: string) {
    "use server"

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase.from("notifications").select("*").eq("id_user", id_user).eq("is_read", false).order("created_at", { ascending: false })

    if (error) {
        console.error(error)
        return false
    }
    return data
}