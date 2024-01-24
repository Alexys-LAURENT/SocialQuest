"use client"
import React, { useContext, useEffect } from 'react';
import { Card, CardBody, Button, Avatar } from '@nextui-org/react';
import { DiscussionTab, Profile } from '@/app/types/entities';
import { DiscussionContext } from '@/app/context/DiscussionContext';
import { createClient } from '@/utils/supabase/client';
import { getProfileConnected } from '@/utils/getProfileConnected';
import defaultGroup from '@/public/assets/defaultGroup.svg'
import { PlusIcon } from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic'
import Image from 'next/image'
import defaultUser from '@/public/assets/defaultUser.svg'

const DynamicModalComponentCreateDiscussion = dynamic(() => import('@/components/Discussions/ModalComponentCreateDiscussion'))


const ListDiscussions = ({ initDiscussions, refetchDiscussions }: { initDiscussions: DiscussionTab[], refetchDiscussions: any }) => {
    const [discussions, setDiscussions] = React.useState<DiscussionTab[] | null>(initDiscussions);
    const [isOpen, setOpen] = React.useState(false);
    const onOpenChange = (open: boolean) => setOpen(open);
    const [profileConnected, setProfileConnected] = React.useState<Profile | null>(null);
    const { selectedCDiscussion, setSelectedDiscussion, setIsEditingGroup, setComponentReloaded, setMessages } = useContext(DiscussionContext);
    const supabase = createClient()



    useEffect(() => {

        async function getProfile() {
            const profile = await getProfileConnected()
            setProfileConnected(profile)
        }
        getProfile()


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
        <div className={`${selectedCDiscussion ? 'hidden sm:flex' : ' flex '} w-full sm:w-3/12 min-w-[200px] h-full border-e-none sm:border-e-2 border-white/20 no-scrollbar  flex-col flex-nowrap overflow-y-auto gap-4 pb-3 px-3`}>
            <div className="flex justify-between">
                <div className="text-xl">
                    Discussions
                </div>
                <Button variant='flat'
                    onClick={() => { setOpen(true) }}
                    className='rounded-full h-8 w-8 p-0 min-w-0 aspect-square'>
                    <div className='flex'>
                        <PlusIcon className='h-6 w-6 rounded-full' />
                    </div>
                </Button>
                {profileConnected && isOpen &&
                    <DynamicModalComponentCreateDiscussion isOpen={isOpen} setOpen={setOpen} onOpenChange={onOpenChange} profileConnected={profileConnected} refetchDiscussions={refetchDiscussions} setDiscussions={setDiscussions} setSelectedDiscussion={setSelectedDiscussion} />
                }
            </div>
            {discussions.map((item: DiscussionTab, index: number) => (
                <Card key={`ListDiscussions-${item.id_discussion}`} className={`rounded-md min-h-[55px] ${selectedCDiscussion?.id_discussion === item?.id_discussion ? 'bg-secondary' : ''} `}>
                    <CardBody className='flex-row p-0' >
                        <Button onClick={() => [setIsEditingGroup(false), setComponentReloaded(true), setSelectedDiscussion(item)]} className='w-full h-full p-2 bg-transparent flex justify-start'>
                            <div className='aspect-square max-w-[40px] min-w-[40px] flex'>
                                {item?.is_group === false ?
                                    <Image src={item?.profiles[0].avatar_url || defaultUser.src} alt="group" width={50} height={50} className={`w-10 h-10 bg-[#3f3f46] rounded-full`} />
                                    :
                                    <Image src={defaultGroup.src} alt="group" width={50} height={50} className={`p-1 w-10 h-10 bg-[#3f3f46] rounded-full invert`} />
                                }
                            </div>
                            <div className=' w-full overflow-hidden flex flex-col bg-green-300/0 h-full items-start'>
                                <h1 className='text-md font-semibold text-textDark dark:text-textLight transition-all !duration-[125ms]'>
                                    {item?.is_group === false ?
                                        item?.profiles[0].username
                                        :
                                        item.nom
                                    }
                                </h1>
                                <p className='text-ellipsis line-clamp-1 flex w-full text-left text-textDark dark:text-textLight transition-all !duration-[125ms]'>
                                    {item?.dernier_message?.contenu}
                                </p>
                            </div>
                        </Button>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
};

export default ListDiscussions;


