"use server"
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { ExtendedPost } from "@/app/types/entities";

export async function removePost(post: ExtendedPost) {
    "use server"
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    if (post.images && post.images.length > 0) {
        await Promise.all(post.images.map(async (image) => {
            const { data, error } = await supabase.storage.from('images_posts').remove([image])
            if (error) {
                console.error('ErrorRemovePost', error)
                return false
            }
        }))
    }

    const { error } = await supabase.from('posts').delete().eq('id_post', post.id_post);

    if (error) {
        console.error('ErrorRemovePost', error)
        return false;
    }

    return true;
}