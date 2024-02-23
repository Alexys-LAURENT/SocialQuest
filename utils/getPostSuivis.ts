"use server"
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { ExtendedPost, Post } from "@/app/types/entities";

// posts for home page
export async function getPostSuivis(id_user: string) {
    "use server"

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data: posts, error: postsError } = await supabase
        .rpc('get_posts_by_followed_users')

    if (postsError) {
        console.error(postsError)
        return null
    }


    return posts.map((post: ExtendedPost) => {
        post.createdAtFormated = new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(post.created_at ?? ''))
        return post
    }) as ExtendedPost[]
}