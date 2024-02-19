"use server"
import { cookies } from 'next/headers';
import { createClient } from "@/utils/supabase/server";
import { ExtendedPost } from "@/app/types/entities";

export async function getPost(id_post: string) {
    "use server"
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: post, error: postError } = await supabase
        .rpc('get_post_by_id_post', { the_id_post: id_post })

    if (postError) {
        console.error(postError)
        return null
    }


    return post.map((post: ExtendedPost) => {
        post.createdAtFormated = new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(post.created_at ?? ''))
        return post
    })[0] as ExtendedPost
}