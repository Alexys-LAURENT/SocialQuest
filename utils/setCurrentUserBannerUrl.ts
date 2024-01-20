"use server"
import { getProfileConnected } from "./getProfileConnected";
import { cookies } from 'next/headers';
import { createClient } from "./supabase/server";

export async function setCurrentUserBannerUrl(banner_url: string | null) {
    "use server"
    const profileConnected = await getProfileConnected();
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase
        .from('profiles')
        .update({ banner_url: banner_url })
        .eq('id_user', profileConnected!.id_user)

    if (error) {
        console.error(error)
        return false
    }

    return true
}