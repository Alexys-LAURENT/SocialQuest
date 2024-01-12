import React from 'react';
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import ListDiscussions from '@/components/Discussions/ListDiscussions';
import MessagesWrapper from '@/components/Discussions/MessagesWrapper';
const page = async () => {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data: { user } } = await supabase.auth.getUser()
    const { data: userProfil } = await supabase
        .from('profiles')
        .select()
        .eq('id_user', user?.id)
        .single()

    console.log(userProfil);

    // const discussions   = await supabase.from('discussions_users').select('discussions(*), profiles(id_user)')
    // console.log(discussions);

    // const { data: discussions_users, error } = await supabase
    //   .from('discussions_users')
    //   .select(`
    //     id_discussion,
    //     discussions_users.id_user,
    //     discussions.name as discussion_name,
    //     discussions.created_by as discussion_created_by,
    //     profiles:profiles(*)
    //   `)
    //   .eq('discussions_users.id_user', auth.uid())
    //   .in(
    //     'id_discussion',
    //     supabase
    //       .from('discussions')
    //       .select('id_discussion')
    //       .eq('discussions_users.id_user', auth.uid())
    //   );

    return (
        <div className="h-full w-full flex flex-col overflow-y-auto overflow-x-hidden items-center">

            <div className="relative w-full h-[100%] max-w-[1280px] bg-red-100/0 flex">

                <ListDiscussions userProfil={userProfil} />

                <MessagesWrapper userProfil={userProfil} />

            </div>
        </div>
    );
};

export default page;