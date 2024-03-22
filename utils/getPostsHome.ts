
"use server"
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { ExtendedPost } from "@/app/types/entities";
import { cache } from "react";


export const getPostsHome = cache(async (offsetRandom: number, offsetSuivis: number, offsetGuildes: number, limit: number, type?: string) => {
    "use server"

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    let postsRandom = []
    let postsSuivis = []
    let postsGuildes = []

    let postsRandomLast = false
    let postsSuivisLast = false
    let postsGuildesLast = false

    if (type === undefined || type === 'random') {
        const { data: newPostsRandom, error: postsRandomError } = await supabase
            .rpc('get_random_posts_home_init', { the_offset: offsetRandom, the_limit: limit })

        if (postsRandomError) {
            console.error('ErrorGetPostsRandom', postsRandomError)
            return null
        }

        postsRandom = newPostsRandom

        if (postsRandom.length === 0 || postsRandom.length < limit) {
            postsRandomLast = true
        }
    }


    if (type === undefined || type === 'suivis') {
        const { data: newPostsSuivis, error: postsSuivisError } = await supabase
            .rpc('get_posts_by_followed_users', { the_offset: offsetSuivis, the_limit: limit })

        if (postsSuivisError) {
            console.error('ErrorGetPostsSuivis', postsSuivisError)
            return null
        }

        postsSuivis = newPostsSuivis

        if (postsSuivis.length === 0 || postsSuivis.length < limit) {
            postsSuivisLast = true
        }
    }

    if (type === undefined || type === 'guildes') {
        const { data: newPostsGuildes, error: postsGuildesError } = await supabase
            .rpc('get_posts_by_guildes_users', { the_offset: offsetGuildes, the_limit: limit })

        if (postsGuildesError) {
            console.error('ErrorGetPostsGuildes', postsGuildesError)
            return null
        }

        postsGuildes = newPostsGuildes

        if (postsGuildes.length === 0 || postsGuildes.length < limit) {
            postsGuildesLast = true
        }
    }

    return {
        postsRandom: postsRandom.map((post: ExtendedPost) => {
            post.createdAtFormated = new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(post.created_at ?? ''))
            return post
        }),
        postsRandomLast: postsRandomLast,
        postsSuivis: postsSuivis.map((post: ExtendedPost) => {
            post.createdAtFormated = new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(post.created_at ?? ''))
            return post
        }),
        postsSuivisLast: postsSuivisLast,
        postsGuildes: postsGuildes.map((post: ExtendedPost) => {
            post.createdAtFormated = new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(post.created_at ?? ''))
            return post
        }),
        postsGuildesLast: postsGuildesLast
    };
})