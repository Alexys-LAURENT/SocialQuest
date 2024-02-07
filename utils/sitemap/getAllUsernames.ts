"use server"
import { cookies } from 'next/headers';
import { createClient } from "@/utils/supabase/server";

export async function getAllUsernames() {
    "use server"
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: usernames, error: err } = await supabase
        .from('profiles')
        .select('username')

    if (err) {
        console.error(err)
        return []
    }


    return usernames as unknown as { username: string }[]
}