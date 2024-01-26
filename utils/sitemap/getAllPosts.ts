"use server"
import { cookies } from 'next/headers';
import { createClient } from "@/utils/supabase/server";

export async function getAllPosts() {
    "use server"
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: posts, error: err } = await supabase
        .from('posts')
        .select('id_post')


    if (err) {
        console.error(err)
        return []
    }

    return posts as unknown as { id_post: string }[]
}