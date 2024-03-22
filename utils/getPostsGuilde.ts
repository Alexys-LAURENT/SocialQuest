
"use server"
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { ExtendedPost } from "@/app/types/entities";
import { cache } from "react";


export const getPostsGuilde = cache(async (guild_name: string, offset: number, limit: number) => {
    "use server"

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    let postsGuilde = []

    let postsGuildeLast = false

    const { data: newPostsGuilde, error: postsGuildeError } = await supabase
        .rpc('get_all_posts_where_guild', { the_guild_name: guild_name, the_offset: offset, the_limit: limit })

    if (postsGuildeError) {
        console.error('ErrorGetPostsGuilde', postsGuildeError)
        return null
    }

    postsGuilde = newPostsGuilde

    if (postsGuilde.length === 0 || postsGuilde.length < limit) {
        postsGuildeLast = true
    }


    return {
        postsGuilde: postsGuilde.map((post: ExtendedPost) => {
            post.createdAtFormated = new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(post.created_at ?? ''))
            return post
        }),
        postsGuildeLast: postsGuildeLast
    };
})