"use server"
import { getProfileConnected } from "@/utils/getProfileConnected";
import { cookies } from 'next/headers';
import { createClient } from "@/utils/supabase/server";
import { Item } from "@/app/types/entities";

export async function toggleFavorite(selectedItem: Item) {
    "use server"
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const profileConnected = await getProfileConnected();




    const { error } = await supabase.from("items_users").update(
        { is_favorite: !selectedItem.is_favorite },
    )
        .eq("id_item", selectedItem.items.id_item)
        .eq("id_user", profileConnected!.id_user)

    if (error) {
        console.error(error)
        return false
    }



    return true
}