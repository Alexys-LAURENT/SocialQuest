"use client"
import React, { useContext, useEffect } from 'react';
import { Card, CardBody, Button, Avatar } from '@nextui-org/react';
import { DiscussionTab } from '@/app/types/entities';
import { DiscussionContext } from '@/app/context/DiscussionContext';
import { createClient } from '@/utils/supabase/client';
import defaultGroup from '@/public/assets/defaultGroup.svg'

const ListDiscussions = ({ initDiscussions, refetchDiscussions }: { initDiscussions: DiscussionTab[], refetchDiscussions: any }) => {
    const [discussions, setDiscussions] = React.useState<DiscussionTab[] | null>(initDiscussions);
    const { selectedCDiscussion, setSelectedDiscussion, setIsEditingGroup, setComponentReloaded } = useContext(DiscussionContext);
    const supabase = createClient()


    useEffect(() => {
        // get an array of id_discussion
        const id_discussions = discussions?.map(discussion => discussion.id_discussion)
        const messagesChannel = supabase.channel(`listDiscussions`)
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'messages' },
                (payload: any) => {
                    if (id_discussions?.includes(payload.new.id_discussion)) {
                        refetchDiscussions2()
                    }
                }
            )
            .subscribe()
        return () => {
            messagesChannel.unsubscribe()
        }
    }
        , [])

    async function refetchDiscussions2() {
        const refresh = await refetchDiscussions()
        setDiscussions(refresh)
    }

    useEffect(() => {
        refetchDiscussions2()
    }
        , [selectedCDiscussion])


    return discussions && (
        <div className={`${selectedCDiscussion ? 'hidden sm:flex' : ' flex '} w-full sm:w-3/12 min-w-[200px] h-full border-e-2 border-white/20 no-scrollbar  flex-col flex-nowrap overflow-y-auto gap-4 pb-3 px-3`}>
            {discussions.map((item: DiscussionTab, index: number) => (
                <Card key={index} className={`rounded-md min-h-[55px] ${selectedCDiscussion?.id_discussion === item?.id_discussion ? 'bg-gradient-to-tl from-[#D4781A] to-[#AA3678]' : ''} `}>
                    <CardBody className='flex-row p-0' >
                        <Button onClick={() => [setIsEditingGroup(false), setComponentReloaded(true), setSelectedDiscussion(item)]} className='w-full h-full p-2 bg-transparent flex justify-start'>
                            <div className='aspect-square max-w-[40px] min-w-[40px] flex'>
                                {item?.is_group === false ?
                                    <Avatar src={item?.profiles[0].avatar_url} className='h-10 w-10 aspect-square rounded-full' />
                                    :
                                    <Avatar src={defaultGroup.src} className='h-10 w-10 p-1 aspect-square rounded-full invert bg-contain' />
                                }
                            </div>
                            <div className=' w-full overflow-hidden flex flex-col bg-green-300/0 h-full items-start'>
                                <h1 className='text-md font-semibold'>
                                    {item?.is_group === false ?
                                        item?.profiles[0].username
                                        :
                                        item.nom
                                    }
                                </h1>
                                <p className='text-ellipsis line-clamp-1 flex w-full text-left'>{item?.dernier_message?.contenu}</p>
                            </div>
                        </Button>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
};

export default ListDiscussions;