"use server"

import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"


export async function getTopMembres() {
    "use server"

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    // get top 5 membres qui ont le plus d'xp
    const { data, error } = await supabase
        .rpc('get_top_membres')

    if (error) {
        console.error('ErrorGetTopMembres', error)
        return
    }

    return data
}