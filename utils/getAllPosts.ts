"use server"
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { ExtendedPost } from "@/app/types/entities";

// posts for home page
export async function getAllPosts() {
    "use server"

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)


    const { data: postsRandom, error: postsRandomError } = await supabase
        .rpc('get_random_posts')

    if (postsRandomError) {
        console.error(postsRandomError)
        return null
    }

    return postsRandom.map((post: ExtendedPost) => {
        post.createdAtFormated = new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(post.created_at ?? ''))
        return post
    }) as ExtendedPost[]
}

// posts for profile page
export async function getAllPostsFromUser(id_user: string) {
    "use server"

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data: postsUser, error: postsUserError } = await supabase
        .rpc('get_all_posts_where_user', { the_id_user: id_user })

    if (postsUserError) {
        console.error(postsUserError)
        return null
    }

    return postsUser.map((post: ExtendedPost) => {
        post.createdAtFormated = new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(post.created_at ?? ''))
        return post
    }) as ExtendedPost[]
}

// posts for guild page
export async function getAllPostsFromGuild(guilde_name: string) {
    "use server"

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data: postsGuild, error: postsGuildError } = await supabase
        .rpc('get_all_posts_where_guild', { the_guild_name: guilde_name })

    if (postsGuildError) {
        console.error(postsGuildError)
        return null
    }

    return postsGuild.map((post: ExtendedPost) => {
        post.createdAtFormated = new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(post.created_at ?? ''))
        return post
    }) as ExtendedPost[]
}