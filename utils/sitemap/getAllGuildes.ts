"use server"
import { cookies } from 'next/headers';
import { createClient } from "@/utils/supabase/server";

export async function getAllGuildes() {
    "use server"
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: guildes, error: err } = await supabase
        .from('guildes')
        .select('nom')


    if (err) {
        console.error(err)
        return []
    }

    return guildes as unknown as { nom: string }[]
}