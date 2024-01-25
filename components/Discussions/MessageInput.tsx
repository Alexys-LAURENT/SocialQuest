import { DiscussionTab, Profile } from '@/app/types/entities';
import { Button, Textarea } from '@nextui-org/react';
import { SupabaseClient } from '@supabase/supabase-js';
import { useState } from 'react';

const MessageInput = ({ supabase, selectedCDiscussion, profileConnected }: { supabase: SupabaseClient, selectedCDiscussion: DiscussionTab, profileConnected: Profile }) => {
    const [inputValue, setInputValue] = useState<string>('')

    async function postMessage() {
        if (inputValue.length === 0) return
        const { data, error } = await supabase
            .from('messages')
            .insert([{ id_discussion: selectedCDiscussion?.id_discussion, id_user: profileConnected?.id_user, contenu: inputValue }])
        setInputValue('')
        document.getElementById('messages_container')?.scrollTo({ top: document.getElementById('messages_container')?.scrollHeight, behavior: 'instant' })
    }

    return (
        <div className='w-full min-h-[100px] mt-2 py-3 z-10 flex gap-4 justify-center items-center bg-bgLight dark:bg-bgDark transition-all !duration-500'>
            <Textarea id='MessageTextarea' value={inputValue} onChange={(e) => setInputValue(e.target.value)} minRows={2} maxRows={5} placeholder='Message' className='w-full'
                classNames={{ inputWrapper: "h-auto transition-all !duration-500" }} onBlur={(e) => { e.relatedTarget?.id === "MessageButton" && (document.getElementById('MessageTextarea') as HTMLTextAreaElement).focus() }} />
            <Button id='MessageButton' onClick={() => { postMessage() }} className='transition-all !duration-500'>
                <span className='text-textDark dark:text-textLight transition-all !duration-[125ms]'>
                    Envoyer
                </span>
            </Button>
        </div >
    );
};

export default MessageInput;