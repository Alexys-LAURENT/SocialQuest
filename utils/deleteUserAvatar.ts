"use server"
import { cookies } from 'next/headers';
import { createClient } from "@/utils/supabase/server";

export async function deleteUserAvatar() {
    "use server"
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.storage.from('avatars').remove([`avqdatarfess`]);

    if (error) {
        console.error('ErrorDeleteUserAvatar', error)
    }

    return data

}