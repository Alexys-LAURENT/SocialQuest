"use client"
import { Profile } from '@/app/types/entities';
import React, { useContext, useEffect, useState } from 'react';
import { DiscussionContext } from '../../app/context/DiscussionContext';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { createClient } from '@/utils/supabase/client';
import MessageCard from '@/components/Discussions/MessageCard';
import { getProfileConnected } from '@/utils/getProfileConnected';
import { Message } from '@/app/types/entities';
import MessageInput from './MessageInput';


const MessagesWrapper = () => {
    const { selectedCDiscussion, setSelectedDiscussion } = useContext(DiscussionContext);
    const [tooltipDeleteOpen, setTooltipDeleteOpen] = useState<{ open: boolean, key: string }>({ open: false, key: '' })
    const [tooltipUserOpen, setTooltipUserOpen] = useState<{ open: boolean, key: string }>({ open: false, key: '' })
    const [messages, setMessages] = useState<Message[] | null>([])
    const [profileConnected, setProfileConnected] = useState<Profile | null>(null)
    const supabase = createClient()

    useEffect(() => {
        if (selectedCDiscussion) {
            getMessages()

            const messagesChannem = supabase.channel(`discussion${selectedCDiscussion?.id_discussion}`)
                .on(
                    'postgres_changes',
                    { event: '*', schema: 'public', table: 'messages', filter: `id_discussion=eq.${selectedCDiscussion?.id_discussion}` },
                    (payload) => {
                        getMessages(payload.eventType)
                    }
                )
                .subscribe()
            return () => {
                messagesChannem.unsubscribe()
            }

        }
        getProfile()

    }, [selectedCDiscussion])


    async function getProfile() {
        const profile = await getProfileConnected()
        setProfileConnected(profile)
    }

    async function getMessages(eventType?: string) {
        const { data, error } = await supabase
            .from('messages')
            .select("id_message, created_at,id_user, contenu , isDeleted")
            .eq('id_discussion', selectedCDiscussion?.id_discussion)
            .order('created_at', { ascending: true })
        setMessages(data as Message[])
        setTimeout(() => {
            const messagesContainer = document.getElementById('messages_container')
            if (messagesContainer && eventType && eventType !== 'UPDATE')
                messagesContainer.scrollTop = messagesContainer.scrollHeight
        }, 100);
        if (error) {
            console.error(error);
            return;
        }
    }

    return selectedCDiscussion && profileConnected && (

        <div className={`flex-col w-full sm:w-9/12 h-full overflow-hidden `}>

            <div className='flex sm:flex-col bg-bgDark items-center justify-center w-full h-[50px] sm:h-[100px] gap-2 relative !z-[100001]'>
                <ArrowLeftIcon onClick={() => setSelectedDiscussion(null)} className='h-6 w-6 text-white absolute cursor-pointer left-5 block sm:hidden ' />
                <img src={selectedCDiscussion.profiles[0]?.avatar_url} className='w-8 h-8 sm:h-12 sm:w-12 aspect-square rounded-full' />
                <h1 className='text-md font-semibold'>{selectedCDiscussion.profiles[0]?.username}</h1>
            </div>
            <div className='w-full h-full max-h-[calc(100%-50px)] sm:max-h-[calc(100%-100px)] flex flex-col items-center '>
                <div id='messages_container' className='w-11/12  h-full overflow-y-auto '>
                    {/* message */}
                    {messages && messages.map((item, index) => (
                        <MessageCard key={`message-${index}`} index={index} item={item} profileConnected={profileConnected} selectedCDiscussion={selectedCDiscussion} tooltipDeleteOpen={tooltipDeleteOpen} setTooltipDeleteOpen={setTooltipDeleteOpen} tooltipUserOpen={tooltipUserOpen} setTooltipUserOpen={setTooltipUserOpen} />
                    ))}
                </div>
                <MessageInput supabase={supabase} selectedCDiscussion={selectedCDiscussion} profileConnected={profileConnected} />
            </div>
        </div >
    );
};

export default MessagesWrapper;


