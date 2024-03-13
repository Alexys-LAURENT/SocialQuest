"use server"
import { cookies } from 'next/headers';
import { createClient } from "@/utils/supabase/server";

export async function getUsableGuildWarItems() {
    "use server"
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const user = (await supabase.auth.getUser()).data.user

    const { data: items, error: itemsError } = await supabase
        .from('items_users')
        .select('*, items(*)')
        .eq('id_user', user?.id)
        //reference to the table items
        .eq('items.type', 'Arme')

    if (itemsError) {
        console.error('ErrorGetUsableGuildWarItem', itemsError)
        return null
    }


    return items.filter((item: any) => item.items)
}