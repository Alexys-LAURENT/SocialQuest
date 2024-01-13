import React from 'react';

import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'


import ListDiscussions from '@/components/Discussions/ListDiscussions';
import MessagesWrapper from '@/components/Discussions/MessagesWrapper';
import { getAllDiscussions } from '@/utils/getAllDiscussions';
import { DiscussionTab } from '../types/entities';
import { getUserConnected } from '@/utils/getUserConnected';
import { getProfileConnected } from '@/utils/getProfileConnected';
const page = async () => {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const user = await getUserConnected()
    const userProfil = await getProfileConnected(user)

    const discussions = await getAllDiscussions(userProfil, user!)

    const refetchDiscussions = async () => {
        "use server"
        return await getAllDiscussions(userProfil, user!)
    }


    return (
        <div className="h-full w-full flex flex-col overflow-hidden items-center">

            <div className="relative w-full h-[100%] max-w-[1280px] bg-red-100/0 flex">

                <ListDiscussions refetchDiscussions={refetchDiscussions} initDiscussions={discussions as unknown as DiscussionTab[]} />

                <MessagesWrapper />

            </div>
        </div>
    );
};

export default page;