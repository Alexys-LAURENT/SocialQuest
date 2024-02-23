"use server"
import { cookies } from 'next/headers';
import { createClient } from "@/utils/supabase/server";

export async function getAllPosts() {
    "use server"
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: posts, error: error } = await supabase
        .from('posts')
        .select('id_post')


    if (error) {
        console.error('ErrorGetAllPosts', error)
        return []
    }

    return posts as unknown as { id_post: string }[]
}