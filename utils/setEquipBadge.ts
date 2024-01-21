"use server"
import { getProfileConnected } from "@/utils/getProfileConnected";
import { cookies } from 'next/headers';
import { createClient } from "@/utils/supabase/server";
import { Desequipbadge } from "@/utils/DesequipBadge";

export async function setEquipbadge(newBadgeUrl: string, oldBadgeUrl?: string) {
    "use server"
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const profileConnected = await getProfileConnected();

    if (oldBadgeUrl) {
        const isDeleted = await Desequipbadge(oldBadgeUrl)
        if (!isDeleted) {
            return false
        }
    }

    const { data: newItem, error: newItemError } = await supabase.from("items").select("id_item").eq("image_url", newBadgeUrl)
    if (newItemError) {
        console.error(newItemError)
        return false
    }

    const { data, error } = await supabase.from("users_badges").insert([
        { id_user: profileConnected!.id_user, id_item: newItem![0].id_item }
    ])

    if (error) {
        console.error(error)
        return false
    }



    return true


}