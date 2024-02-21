"use server";
import { Guilde } from "@/app/types/entities";
import { getProfileConnected } from "@/utils/getProfileConnected";
import { createClient } from "@/utils/supabase/server"
import { cookies } from 'next/headers'

export async function getGuildesUser() {
    "use server"

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const user = await getProfileConnected()

    const { data: guildesUser, error: guildesUserError } = await supabase
        .from('guildes_users')
        .select("guildes(*)")
        .eq("id_user", user?.id_user)


    if (guildesUserError) {
        console.log(guildesUserError)
        return null
    }

    return guildesUser.map((guilde: any) => guilde.guildes) as Guilde[]
}
