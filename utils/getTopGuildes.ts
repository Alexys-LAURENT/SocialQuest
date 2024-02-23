"use server"

import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"


export async function getTopGuildes() {
    "use server"

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    // get top 5 guildes qui ont le plus de membres
    const { data, error } = await supabase
        .rpc('get_top_guildes')

    if (error) {
        console.error('ErrorGetTopGuildes', error)
        return
    }

    return data
}