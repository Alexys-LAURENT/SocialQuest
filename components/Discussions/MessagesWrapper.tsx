"use client"
import { Profile } from '@/app/types/entities';
import React, { use, useContext, useEffect, useState } from 'react';
import { DiscussionContext } from '../../app/context/DiscussionContext';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { createClient } from '@/utils/supabase/client';
import MessageCard from '@/components/Discussions/MessageCard';
import { getProfileConnected } from '@/utils/getProfileConnected';
import { Message } from '@/app/types/entities';
import MessageInput from './MessageInput';
import { Avatar } from '@nextui-org/react';
import defaultGroup from '@/public/assets/defaultGroup.svg'
import EditGroup from '@/components/Discussions/EditGroup';


const MessagesWrapper = () => {
    const { selectedCDiscussion, setSelectedDiscussion, isEditingGroup, setIsEditingGroup } = useContext(DiscussionContext);
    const [tooltipDeleteOpen, setTooltipDeleteOpen] = useState<{ open: boolean, key: string }>({ open: false, key: '' })
    const [tooltipUserOpen, setTooltipUserOpen] = useState<{ open: boolean, key: string }>({ open: false, key: '' })
    const [tooltipOthersOpen, setTooltipOthersOpen] = useState<{ open: boolean, key: string }>({ open: false, key: '' })
    const [messages, setMessages] = useState<Message[] | null>([])
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

    useEffect(() => {
        const messagesContainer = document.getElementById('messages_container');

        if (messagesContainer) {
            const isNearBottom = messagesContainer.scrollHeight - (messagesContainer.scrollTop + messagesContainer.clientHeight) < 60;

            if (isNearBottom) {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        }
    }, [messages]);




    async function getProfile() {
        const profile = await getProfileConnected()
        setProfileConnected(profile)
    }

    async function getMessages(eventType?: string) {
        const { data, error } = await supabase
            .from('messages')
            .select("id_message, created_at, id_user, contenu , isDeleted")
            .eq('id_discussion', selectedCDiscussion?.id_discussion)
            .order('created_at', { ascending: true })
        setMessages(data as Message[])
        if (error) {
            console.error(error);
            return;
        }
    }

    function handleScrollLoad() {
        const messagesContainer = document.getElementById('messages_container')
        if (messagesContainer && messagesContainer.scrollHeight > messagesContainer.clientHeight) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight
        }
    }

    function getImageUrl() {
        if (selectedCDiscussion?.is_group && selectedCDiscussion?.image_url) {
            console.log(selectedCDiscussion?.nom);
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
        <div className={`flex-col w-full sm:w-9/12 h-full overflow-hidden `}>

            <div className='flex sm:flex-col bg-bgDark items-center justify-center w-full h-[50px] sm:h-[100px] gap-2 relative z-[10]'>
                <ArrowLeftIcon onClick={() => [setMessages(null), setSelectedDiscussion(null), setIsEditingGroup(false)]} className='h-6 w-6 text-white absolute cursor-pointer left-5 block sm:hidden ' />
                <Avatar src={getImageUrl()} onClick={() => { selectedCDiscussion.is_group && setIsEditingGroup(true) }}
                    className={`w-8 h-8 sm:h-12 sm:w-12 aspect-square rounded-full ${selectedCDiscussion.is_group ? 'invert p-1 cursor-pointer' : ''}`} />
                <h1 className='text-md font-semibold'>{selectedCDiscussion.is_group ? selectedCDiscussion.nom : selectedCDiscussion.profiles[0]?.username}</h1>
            </div>
            <div className='w-full h-full max-h-[calc(100%-50px)] sm:max-h-[calc(100%-100px)] flex flex-col items-center '>
                {isEditingGroup ? (
                    <EditGroup profileConnected={profileConnected} selectedCDiscussion={selectedCDiscussion} />
                ) : (
                    <>
                        <div id='messages_container' className='w-11/12 h-full overflow-y-auto' onLoad={() => handleScrollLoad()}>
                            {/* message */}
                            {messages && messages.map((item, index) => (
                                <MessageCard key={`message-${index}`} index={index} item={item} profileConnected={profileConnected} selectedCDiscussion={selectedCDiscussion} tooltipDeleteOpen={tooltipDeleteOpen} setTooltipDeleteOpen={setTooltipDeleteOpen} tooltipOthersOpen={tooltipOthersOpen} setTooltipOthersOpen={setTooltipOthersOpen} tooltipUserOpen={tooltipUserOpen} setTooltipUserOpen={setTooltipUserOpen} nextMessage={{ id_user: messages[index + 1]?.id_user, timestamp: messages[index + 1]?.created_at }} prevMessage={{ id_user: messages[index - 1]?.id_user, timestamp: messages[index - 1]?.created_at }} />
                            ))}
                        </div>
                        <MessageInput supabase={supabase} selectedCDiscussion={selectedCDiscussion} profileConnected={profileConnected} />
                    </>
                )}
            </div>
        </div >
    )
};

export default MessagesWrapper;


