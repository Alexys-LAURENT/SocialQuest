"use server"

import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"


export async function getTopGuildes() {
    "use server"

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    // get top 5 membres qui ont le plus de follow dans la table follow
    const { data, error } = await supabase
        .rpc('get_top_guildes')

    if (error) {
        console.error(error)
        return
    }

    return data
}