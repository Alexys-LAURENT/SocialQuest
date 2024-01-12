"use client"
import React, { useContext, useEffect } from 'react';
import { Card, CardBody, Button } from '@nextui-org/react';
import { DiscussionTab, Profile } from '@/app/types/entities';
import { DiscussionContext } from '@/app/context/DiscussionContext';
import { createClient } from '@/utils/supabase/client';

const ListDiscussions = ({ initDiscussions, test }: { initDiscussions: DiscussionTab[], test: any }) => {
    const [discussions, setDiscussions] = React.useState<DiscussionTab[] | null>(initDiscussions);
    const { selectedCDiscussion, setSelectedDiscussion } = useContext(DiscussionContext);
    const supabase = createClient()


    useEffect(() => {
        // get an array of id_discussion
        const id_discussions = discussions?.map(discussion => discussion.id_discussion)
        const messagesChannem = supabase.channel(`listDiscussions`)
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'messages' },
                (payload: any) => {
                    if (id_discussions?.includes(payload.new.id_discussion)) {
                        refetchDiscussions()
                    }
                }
            )
            .subscribe()
        return () => {
            messagesChannem.unsubscribe()
        }
    }
        , [])

    async function refetchDiscussions() {
        const temp = await test()
        setDiscussions(temp)
    }

    return discussions && (
        <div className={`${selectedCDiscussion ? 'hidden sm:flex' : ' flex '} w-full sm:w-3/12 min-w-[200px] h-full border-e-2 border-white/20 no-scrollbar  flex-col flex-nowrap overflow-y-auto gap-4 pb-3 px-3`}>
            {discussions.map((item: any, index: number) => (
                <Card key={index} className='rounded-md min-h-[55px]'>
                    <CardBody className='flex-row p-0' >
                        <Button onClick={() => setSelectedDiscussion(item)} className='w-full h-full p-2 bg-transparent flex justify-start'>
                            <div className='aspect-square max-w-[40px] min-w-[40px]  flex bg-red-50/0'>
                                <img src={item?.profiles[0].avatar_url} className='h-10 w-10 aspect-square rounded-full' />
                            </div>
                            <div className=' w-full overflow-hidden flex flex-col bg-green-300/0 h-full items-start'>
                                <h1 className='text-md font-semibold'>{item?.profiles[0].username}</h1>
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