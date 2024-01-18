"use server"
import { cookies } from "next/headers"
import { createClient } from "./supabase/server"


export async function readUserNotifications(id_user: string) {
    "use server"

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase.from("notifications").update({ is_read: true }).eq("id_user", id_user).eq("is_read", false)

    if (error) {
        console.error(error)
        return false
    }

    return true
}