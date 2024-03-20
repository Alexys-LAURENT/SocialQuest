
"use server"
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { ExtendedPost } from "@/app/types/entities";
import { cache } from "react";


export const getPostsHome = cache(async (offset: number, limit: number) => {
    "use server"

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)


    const { data: postsRandom, error: postsRandomError } = await supabase
        .rpc('get_random_posts_home_init', { the_offset: offset, the_limit: limit })

    if (postsRandomError) {
        console.error('ErrorGetPostsRandom', postsRandomError)
        return null
    }

    if (postsRandom.length === 0) {
        return []
    }

    return postsRandom.map((post: ExtendedPost) => {
        post.createdAtFormated = new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(post.created_at ?? ''))
        return post
    }) as ExtendedPost[]
})