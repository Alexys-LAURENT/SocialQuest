
"use server"
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { ExtendedPost } from "@/app/types/entities";
import { cache } from "react";


export const getPostAnswers = cache(async (id_parent: string, offset: number, limit: number) => {
    "use server"

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    let postAnswers = []

    let postAnswersLast = false

    const { data: newPostAnswers, error: postAnswersError } = await supabase
        .rpc('get_posts_by_id_parent', { the_id_parent: id_parent, the_offset: offset, the_limit: limit })

    if (postAnswersError) {
        console.error('ErrorGetPostAnswers', postAnswersError)
        return null
    }

    postAnswers = newPostAnswers

    if (postAnswers.length === 0 || postAnswers.length < limit) {
        postAnswersLast = true
    }


    return {
        postAnswers: postAnswers.map((post: ExtendedPost) => {
            post.createdAtFormated = new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(post.created_at ?? ''))
            return post
        }),
        postAnswersLast: postAnswersLast
    };
})