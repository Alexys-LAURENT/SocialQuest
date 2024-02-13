"use server"
import { getProfileConnected } from "@/utils/getProfileConnected";
import { cookies } from 'next/headers';
import { createClient } from "@/utils/supabase/server";

export async function toggleItemSelected(id_item_user: string | null, action: 'equip' | 'desequip') {
    "use server"
    const profileConnected = await getProfileConnected();
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    if (action === 'desequip') {
        const { error } = await supabase
            .from('items_users')
            .update({ is_equiped: false })
            .eq('id_user', profileConnected!.id_user)
            .eq('id_item_user', id_item_user)

        if (error) {
            console.error(error)
            return false
        }

        return true
    }

    const { error } = await supabase
        .from('items_users')
        .update({ is_equiped: true })
        .eq('id_user', profileConnected!.id_user)
        .eq('id_item_user', id_item_user)

    if (error) {
        console.error(error)
        return false
    }

    return true
}