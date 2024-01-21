"use server"
import { getProfileConnected } from "@/utils/getProfileConnected";
import { cookies } from 'next/headers';
import { createClient } from "@/utils/supabase/server";

export async function Desequipbadge(image_url: string) {
    "use server"
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const profileConnected = await getProfileConnected();

    const { data: badge, error: err } = await supabase
        .from('items')
        .select("id_item")
        .eq('image_url', image_url)

    if (err) {
        console.error(err)
        return false
    }

    const { error } = await supabase
        .from('users_badges')
        .delete()
        .eq('id_user', profileConnected!.id_user)
        .eq('id_item', badge![0].id_item)
    if (error) {
        console.error(error)
        return false
    }




    return true


}