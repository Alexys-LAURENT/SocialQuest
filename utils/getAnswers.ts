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

    const { data: postsWithLikes, error: err } = await supabase
        .from('posts')
        .select(`*, profiles(username, avatar_url, a_propos,banner_url, users_badges(items(*))),guildes(nom, avatar_url), likes(id_like, id_user),
        children:posts(id_post)`)
        .eq('parent', id_post)

    if (err) {
        console.error(err)
        return false
    }

    // Récupérer le nombre total de likes par post
    const posts = postsWithLikes?.map(post => {
        const likesCount = post.likes.length;
        const answersCount = post.children.length;
        const userLikedPost = post.likes.some((like: any) => like.id_user === user?.id_user); // Remplacez currentUserID par l'ID de l'utilisateur actuel

        return { ...post, likesCount, answersCount, userLikedPost };
    }) as ExtendedPost[];

    posts && posts.sort((a, b) => b.likesCount - a.likesCount)

    return posts
}