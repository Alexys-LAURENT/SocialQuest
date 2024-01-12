import { DiscussionTab, Profile } from '@/app/types/entities';
import { Button, Textarea } from '@nextui-org/react';
import { SupabaseClient } from '@supabase/supabase-js';
import React, { useState } from 'react';

const MessageInput = ({ supabase, selectedCDiscussion, profileConnected }: { supabase: SupabaseClient, selectedCDiscussion: DiscussionTab, profileConnected: Profile }) => {
    const [inputValue, setInputValue] = useState<string>('')

    async function postMessage() {
        if (inputValue.length === 0) return
        const { data, error } = await supabase
            .from('messages')
            .insert([{ id_discussion: selectedCDiscussion?.id_discussion, id_user: profileConnected?.id_user, contenu: inputValue }])
        setInputValue('')
    }
    return (
        <div className='w-11/12 min-h-[150px] z-[100001] bg-bgDark flex gap-4 justify-center items-center '>
            <Textarea value={inputValue} onChange={(e) => setInputValue(e.target.value)} minRows={2} maxRows={5} placeholder='Message' className='w-full' classNames={{ inputWrapper: "h-auto" }} />
            <Button onClick={() => { postMessage() }}>Envoyer</Button>
        </div>
    );
};

export default MessageInput;