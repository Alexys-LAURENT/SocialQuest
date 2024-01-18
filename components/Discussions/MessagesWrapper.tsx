"use client"
import { Profile } from '@/app/types/entities';
import React, { use, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { DiscussionContext } from '../../app/context/DiscussionContext';
import { ArrowDownIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { createClient } from '@/utils/supabase/client';
import { getProfileConnected } from '@/utils/getProfileConnected';
import { Message } from '@/app/types/entities';
import MessageInput from './MessageInput';
import { Avatar } from '@nextui-org/react';
import defaultGroup from '@/public/assets/defaultGroup.svg'
import Link from 'next/link';
import dynamic from 'next/dynamic'


const DynamicEditGroup = dynamic(() => import('@/components/Discussions/EditGroup'))
const DynamicMessageCard = dynamic(() => import('@/components/Discussions/MessageCard'))


const MessagesWrapper = () => {
    const { selectedCDiscussion, setSelectedDiscussion, isEditingGroup, setIsEditingGroup, componentReloaded, setComponentReloaded, messages, setMessages } = useContext(DiscussionContext);
    const [tooltipDeleteOpen, setTooltipDeleteOpen] = useState<{ open: boolean, key: string }>({ open: false, key: '' })
    const [tooltipUserOpen, setTooltipUserOpen] = useState<{ open: boolean, key: string }>({ open: false, key: '' })
    const [tooltipOthersOpen, setTooltipOthersOpen] = useState<{ open: boolean, key: string }>({ open: false, key: '' })
    const [profileConnected, setProfileConnected] = useState<Profile | null>(null)
    const supabase = createClient()



    useEffect(() => {
        if (selectedCDiscussion) {
            getMessages()

            const messagesChannel = supabase.channel(`discussion${selectedCDiscussion?.id_discussion}`)
                .on(
                    'postgres_changes',
                    { event: '*', schema: 'public', table: 'messages', filter: `id_discussion=eq.${selectedCDiscussion?.id_discussion}` },
                    (payload) => {
                        getMessages(payload.eventType)
                    }
                )
                .subscribe()
            return () => {
                messagesChannel.unsubscribe()
            }

        }
        getProfile()

    }, [selectedCDiscussion])

    // prevent page breaking when rerendered while selectedDiscussion isnt null
    useEffect(() => {
        setSelectedDiscussion(null)
        setMessages([{ id_message: '0', created_at: '', id_user: '', contenu: '', isDeleted: false, profiles: { username: '' } }])
        setComponentReloaded(true)
    }, [])

    useEffect(() => {
        const messagesContainer = document.getElementById('messages_container');
        const newMessagesIndicator = document.getElementById('NewMessagesIndicator');

        const handleScroll = () => {
            if (!messagesContainer || !newMessagesIndicator) return;
            const isNearBottom = messagesContainer.scrollHeight - (messagesContainer.scrollTop + messagesContainer.clientHeight) < 60;
            if (isNearBottom) {
                newMessagesIndicator?.classList.add('hidden');
            }
        };

        messagesContainer?.addEventListener('scroll', handleScroll);

        return () => {
            messagesContainer?.removeEventListener('scroll', handleScroll);
        };
    });

    // permet le scroll seemless au load + scroll auto si on est en bas de la page
    useLayoutEffect(() => {
        const messagesContainer = document.getElementById('messages_container')
        if (messagesContainer) {
            const isNearBottom = messagesContainer.scrollHeight - (messagesContainer.scrollTop + messagesContainer.clientHeight) < 60;
            if (componentReloaded) {
                messagesContainer.scrollTop = messagesContainer.scrollHeight
                setComponentReloaded(false)
            }
            if (isNearBottom) {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            } else {
                document.getElementById('NewMessagesIndicator')?.classList.remove('hidden')
            }
        }
    }, [messages])



    async function getProfile() {
        const profile = await getProfileConnected()
        setProfileConnected(profile)
    }

    async function getMessages(eventType?: string) {
        const { data, error } = await supabase
            .from('messages')
            .select("id_message, created_at, id_user, contenu , isDeleted, profiles(username)")
            .eq('id_discussion', selectedCDiscussion?.id_discussion)
            .order('created_at', { ascending: true })
        setMessages(data as unknown as Message[])
        if (error) {
            console.error(error);
            return;
        }
    }

    function getImageUrl() {
        if (selectedCDiscussion?.is_group && selectedCDiscussion?.image_url) {
            return selectedCDiscussion?.image_url
        }
        if (!selectedCDiscussion?.is_group) {
            return selectedCDiscussion?.profiles[0]?.avatar_url
        }
        return defaultGroup.src
    }

    return (!profileConnected || !selectedCDiscussion) ? (
        <div className={`hidden sm:flex flex-col w-full sm:w-9/12 h-full overflow-hidden `}>
            <div className='w-full h-full flex flex-col items-center '>
                <div className='w-11/12  h-full overflow-y-auto '>
                    {/* message */}
                    <div className='flex flex-col items-center justify-center h-full'>
                        <h1 className='text-md font-semibold'>Sélectionnez une conversation pour commencer</h1>
                    </div>
                </div>
            </div>
        </div >
    ) : (selectedCDiscussion && profileConnected) && (
        <div id='messagesWrapper' className={`flex-col w-full sm:w-9/12 h-full
         overflow-hidden `}>

            <div className='flex sm:flex-col bg-bgDark items-center justify-center w-full h-[50px] sm:h-[100px] gap-2 relative z-10'>
                <ArrowLeftIcon onClick={() => [setMessages(null), setSelectedDiscussion(null), setIsEditingGroup(false)]} className='h-6 w-6 text-white absolute cursor-pointer left-5 block sm:hidden ' />
                <Avatar as={Link}
                    href={`${selectedCDiscussion.is_group ? "#" : "/" + selectedCDiscussion.profiles[0]?.username}`}
                    src={getImageUrl()} onClick={() => { selectedCDiscussion.is_group && profileConnected.id_user === selectedCDiscussion.created_by && setIsEditingGroup(true) }}
                    className={`w-8 h-8 sm:h-12 sm:w-12 aspect-square rounded-full ${selectedCDiscussion.is_group ? 'invert p-1' : ''} ${selectedCDiscussion.is_group ? (profileConnected.id_user === selectedCDiscussion.created_by ? "cursor-pointer" : "cursor-default") : "cursor-pointer"}`} />
                <h1 className='text-md font-semibold'>{selectedCDiscussion.is_group ? selectedCDiscussion.nom : selectedCDiscussion.profiles[0]?.username}</h1>
            </div>
            <div className='relative w-full h-full max-h-[calc(100%-50px)] sm:max-h-[calc(100%-100px)] flex flex-col items-center '>
                {isEditingGroup ? (
                    <DynamicEditGroup profileConnected={profileConnected} selectedCDiscussion={selectedCDiscussion} setSelectedDiscussion={setSelectedDiscussion} setIsEditingGroup={setIsEditingGroup} />
                ) : (
                    <>
                        <div id='messages_container' className='w-11/12 h-full overflow-y-auto' >
                            {/* message */}
                            {messages && messages.map((item, index) => (
                                <DynamicMessageCard key={`message-${index}`} index={index} item={item} profileConnected={profileConnected} selectedCDiscussion={selectedCDiscussion} tooltipDeleteOpen={tooltipDeleteOpen} setTooltipDeleteOpen={setTooltipDeleteOpen} tooltipOthersOpen={tooltipOthersOpen} setTooltipOthersOpen={setTooltipOthersOpen} tooltipUserOpen={tooltipUserOpen} setTooltipUserOpen={setTooltipUserOpen} nextMessage={{ id_user: messages[index + 1]?.id_user, timestamp: messages[index + 1]?.created_at }} prevMessage={{ id_user: messages[index - 1]?.id_user, timestamp: messages[index - 1]?.created_at }} />
                            ))}
                        </div>
                        <MessageInput supabase={supabase} selectedCDiscussion={selectedCDiscussion} profileConnected={profileConnected} />
                        <div id='NewMessagesIndicator' className="absolute flex hidden bottom-28 right-16 bg-bgDark rounded-full p-2 cursor-pointer border border-white/20 hover:border-white/40 transition-all" onClick={() => document.getElementById('messages_container')?.scrollTo({ top: document.getElementById('messages_container')?.scrollHeight, behavior: 'smooth' })}>
                            <p className="text-base text-textLight mr-2">Nouveaux messages</p>
                            <ArrowDownIcon className="h-5 w-5 text-textLight" />
                        </div>
                    </>
                )}
            </div>
        </div >
    )
};

export default MessagesWrapper;


