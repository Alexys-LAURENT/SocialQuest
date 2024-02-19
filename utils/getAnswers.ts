"use server"
import { getProfileConnected } from "@/utils/getProfileConnected";
import { cookies } from 'next/headers';
import { createClient } from "@/utils/supabase/server";
import { ExtendedPost } from "@/app/types/entities";

export async function getAnswers(id_post: string) {
    "use server"
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const user = await getProfileConnected()

    const { data: posts, error: postsError } = await supabase
        .rpc('get_posts_by_id_parent', { the_id_parent: id_post })

    if (postsError) {
        console.error(postsError)
        return null
    }


    posts.map((post: ExtendedPost) => {
        post.createdAtFormated = new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(post.created_at ?? ''))
        return post
    })[0] as ExtendedPost

    posts && posts.sort((a: any, b: any) => b.likes_count - a.likes_count)

    return posts
}