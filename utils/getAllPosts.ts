"use server"
import { cookies } from "next/headers";
import { createClient } from "./supabase/server";
import { ExtendedPost } from "@/app/types/entities";
import { getProfileConnected } from "./getProfileConnected";

export async function getAllPosts() {
    "use server"

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const user = await getProfileConnected()


    const { data: postsWithLikes, error: postsError } = await supabase
        .from('posts')
        .select(`*, profiles(username, avatar_url, a_propos),guildes(nom, avatar_url), likes(id_like, id_user),
          children:posts(id_post)`)
        .is('parent', null)
        .order('created_at', { ascending: false });

    if (postsError) return console.error(postsError)

    // Récupérer le nombre total de likes par post
    const posts = postsWithLikes?.map(post => {
        const likesCount = post.likes.length;
        const answersCount = post.children.length;
        const userLikedPost = post.likes.some((like: any) => like.id_user === user?.id_user); // Remplacez currentUserID par l'ID de l'utilisateur actuel

        return { ...post, likesCount, answersCount, userLikedPost };
    }) as ExtendedPost[];

    return posts
}

export async function getAllPostsFromUser(id_user: string) {
    "use server"

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const user = await getProfileConnected()

    const { data: postsWithLikes, error: postsError } = await supabase
        .from('posts')
        .select(`*, profiles(username, avatar_url, a_propos),guildes(nom, avatar_url), likes(id_like, id_user),
    children:posts(id_post)`)
        .eq('id_user', id_user)
        .order('created_at', { ascending: false });

    if (postsError) return console.error(postsError)

    // Récupérer le nombre total de likes par post
    const posts = postsWithLikes?.map(post => {
        const likesCount = post.likes.length;
        const answersCount = post.children.length;
        const userLikedPost = post.likes.some((like: any) => like.id_user === user?.id_user); // Remplacez currentUserID par l'ID de l'utilisateur actuel

        return { ...post, likesCount, answersCount, userLikedPost };
    }) as ExtendedPost[];
    return posts
}

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
        .select(`*, profiles(username, avatar_url, a_propos),guildes(nom, avatar_url), likes(id_like, id_user),
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

        return { ...post, likesCount, answersCount, userLikedPost };
    }) as ExtendedPost[];
    return posts
}