"use server"
import { cookies } from 'next/headers';
import { createClient } from "@/utils/supabase/server";
import { ExtendedPost } from "@/app/types/entities";

export async function getAnswers(id_post: string) {
    "use server"
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: posts, error: postsError } = await supabase
        .rpc('get_posts_by_id_parent', { the_id_parent: id_post })

    if (postsError) {
        console.error('ErrorGetAnswers', postsError)
        return null
    }


    posts.map((post: ExtendedPost) => {
        post.createdAtFormated = new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(post.created_at ?? ''))
        return post
    })[0] as ExtendedPost

    posts && posts.sort((a: ExtendedPost, b: ExtendedPost) => b.likes_count - a.likes_count)

    return posts
}