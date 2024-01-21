"use server"
import { getProfileConnected } from "@/utils/getProfileConnected";
import { cookies } from 'next/headers';
import { createClient } from "@/utils/supabase/server";
import { ExtendedPost } from "@/app/types/entities";

export async function getPost(id_post: string) {
    "use server"
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const user = await getProfileConnected()

    const { data: postWithLikes, error: err } = await supabase
        .from('posts')
        .select(`*, profiles(username, avatar_url, a_propos,banner_url, users_badges(items(*))),guildes(nom, avatar_url), likes(id_like, id_user),
        children:posts(id_post)`)
        .eq('id_post', id_post)
        .single()

    if (err) {
        console.error(err)
        return null
    }

    let post = postWithLikes as ExtendedPost
    // Récupérer le nombre total de likes par post
    const likesCount = postWithLikes.likes?.length || 0;
    const answersCount = postWithLikes.children?.length || 0;
    const userLikedPost = Array.isArray(postWithLikes.likes) && postWithLikes.likes.some((like: any) => like.id_user === user?.id_user); // Remplacez currentUserID par l'ID de l'utilisateur actuel

    post = { ...postWithLikes, likesCount, answersCount, userLikedPost };

    return post
}