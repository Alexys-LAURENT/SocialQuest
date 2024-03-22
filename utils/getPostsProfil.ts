
"use server"
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { ExtendedPost } from "@/app/types/entities";
import { cache } from "react";


export const getPostsProfil = cache(async (id_user: string, offset: number, limit: number) => {
    "use server"

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    let postsProfil = []

    let postsProfilLast = false

    const { data: newPostsProfil, error: postsProfilError } = await supabase
        .rpc('get_all_posts_where_user', { the_id_user: id_user, the_offset: offset, the_limit: limit })

    if (postsProfilError) {
        console.error('ErrorGetPostsProfil', postsProfilError)
        return null
    }

    postsProfil = newPostsProfil

    if (postsProfil.length === 0 || postsProfil.length < limit) {
        postsProfilLast = true
    }


    return {
        postsProfil: postsProfil.map((post: ExtendedPost) => {
            post.createdAtFormated = new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(post.created_at ?? ''))
            return post
        }),
        postsProfilLast: postsProfilLast
    };
})