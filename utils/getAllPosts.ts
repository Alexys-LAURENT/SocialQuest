"use server"
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { ExtendedPost } from "@/app/types/entities";
import { getProfileConnected } from "@/utils/getProfileConnected";

// posts for home page
export async function getAllPosts() {
    "use server"

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const user = await getProfileConnected()


    const { data: postsWithLikes, error: postsError } = await supabase
        .from('posts')
        .select(`*, profiles(username, avatar_url, a_propos,banner_url, users_badges(items(*))),guildes(nom, avatar_url), likes(id_like, id_user),
          children:posts(id_post)`)
        .is('parent', null)
        .order('created_at', { ascending: false });

    if (postsError) return console.error(postsError)

    // Récupérer le nombre total de likes par post
    const posts = postsWithLikes?.map(post => {
        const likesCount = post.likes.length;
        const answersCount = post.children.length;
        const userLikedPost = post.likes.some((like: any) => like.id_user === user?.id_user); // Remplacez currentUserID par l'ID de l'utilisateur actuel
        const createdAtFormated = new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(post.created_at ?? ''))
        return { ...post, likesCount, answersCount, userLikedPost, createdAtFormated };
    }) as ExtendedPost[];

    return posts
}

// posts for profile page
export async function getAllPostsFromUser(id_user: string) {
    "use server"

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const user = await getProfileConnected()

    const { data: postsWithLikes, error: postsError } = await supabase
        .from('posts')
        .select(`*, profiles(username, avatar_url, a_propos,banner_url, users_badges(items(*))),guildes(nom, avatar_url), likes(id_like, id_user),
    children:posts(id_post)`)
        .eq('id_user', id_user)
        .order('created_at', { ascending: false });

    if (postsError) return console.error(postsError)

    // Récupérer le nombre total de likes par post
    const posts = postsWithLikes?.map(post => {
        const likesCount = post.likes.length;
        const answersCount = post.children.length;
        const userLikedPost = post.likes.some((like: any) => like.id_user === user?.id_user); // Remplacez currentUserID par l'ID de l'utilisateur actuel
        const createdAtFormated = new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(post.created_at ?? ''))

        return { ...post, likesCount, answersCount, userLikedPost, createdAtFormated };
    }) as ExtendedPost[];
    return posts
}

// posts for guild page
export async function getAllPostsFromGuild(guilde_name: string) {
    "use server"

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const user = await getProfileConnected()

    const { data: guilde, error: guildeError } = await supabase
        .from('guildes')
        .select("id_guilde")
        .eq("nom", guilde_name)
        .single()

    if (guildeError) console.error(guildeError)

    const { data: postsWithLikes, error: postsError } = await supabase
        .from('posts')
        .select(`*, profiles(username, avatar_url, a_propos,banner_url, users_badges(items(*))),guildes(nom, avatar_url), likes(id_like, id_user),
          children:posts(id_post)`)
        .is('parent', null)
        .eq('id_guilde', guilde?.id_guilde)
        .order('created_at', { ascending: false });

    if (postsError) return console.error(postsError)

    // Récupérer le nombre total de likes par post
    const posts = postsWithLikes?.map(post => {
        const likesCount = post.likes.length;
        const answersCount = post.children.length;
        const userLikedPost = post.likes.some((like: any) => like.id_user === user?.id_user); // Remplacez currentUserID par l'ID de l'utilisateur actuel
        const createdAtFormated = new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(post.created_at ?? ''))

        return { ...post, likesCount, answersCount, userLikedPost, createdAtFormated };
    }) as ExtendedPost[];
    return posts
}