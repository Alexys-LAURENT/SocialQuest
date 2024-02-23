"use server"

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { DiscussionTab, Message } from "@/app/types/entities";

export async function getMessages(selectedCDiscussion: DiscussionTab | null) {
    "use server"
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);


    const { data, error } = await supabase
        .from('messages')
        .select("id_message, created_at, id_user, contenu , isDeleted, profiles(username)")
        .eq('id_discussion', selectedCDiscussion?.id_discussion)
        .order('created_at', { ascending: true })

    if (error) {
        console.error('ErrorGetMessages', error)
        return [];
    }

    return data as unknown as Message[];

}