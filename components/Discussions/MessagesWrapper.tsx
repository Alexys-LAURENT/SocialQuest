"use client"
import { Profile } from '@/app/types/entities';
import { Button, Textarea } from '@nextui-org/react';
import React, { useContext } from 'react';
import { DiscussionContext } from '../../app/context/DiscussionContext';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
const MessagesWrapper = ({ userProfil }: { userProfil: Profile }) => {
    const { selectedCDiscussion, setSelectedDiscussion } = useContext(DiscussionContext);
    return selectedCDiscussion && (

        <div className={`flex-col w-full sm:w-9/12 h-full `}>

            <div className='flex flex-col items-center justify-center w-full h-[100px] gap-2'>
                <ArrowLeftIcon onClick={() => setSelectedDiscussion(null)} className='h-6 w-6 text-white absolute cursor-pointer left-5 block sm:hidden ' />
                <img src={userProfil?.avatar_url} className='h-12 w-12 aspect-square rounded-full' />
                <h1 className='text-md font-semibold'>{userProfil?.username}</h1>
            </div>
            <div className='w-full max-h-[calc(100%-100px)] flex flex-col items-center '>
                <div className='w-11/12 h-full overflow-y-auto '>
                    {/* message */}
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                        <div key={index} className={`w-full min-h-[50px] flex justify-start ${item % 2 === 0 ? "flex-row-reverse" : "flex-row"} gap-3 py-3 px-1`}>
                            <img src={userProfil?.avatar_url} className='h-8 w-8 aspect-square rounded-full' />
                            <div className='max-w-6/12 w-[300px] h-[100px] bg-white rounded-lg'></div>
                        </div>
                    ))}
                </div>
                <div className='w-11/12 min-h-[150px]  flex gap-4 justify-center items-center '>
                    <Textarea minRows={2} maxRows={5} placeholder='Message' className='w-full' classNames={{ inputWrapper: "h-auto" }} />
                    <Button>Envoyer</Button>
                </div>
            </div>
        </div>
    );
};

export default MessagesWrapper;