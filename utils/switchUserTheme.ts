"use server"
import { getProfileConnected } from "@/utils/getProfileConnected";
import { cookies } from 'next/headers';
import { createClient } from "@/utils/supabase/server";

export async function switchUserTheme(newTheme: string) {
    "use server"
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const profileConnected = await getProfileConnected();

    const { data, error } = await supabase
        .from("profiles")
        .update({ theme: newTheme })
        .eq("id_user", profileConnected?.id_user);

    if (error) {
        console.log("ErrorSwitchUserTheme", error);
        return error;
    }

    return data;
}