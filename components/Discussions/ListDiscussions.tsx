"use client"
import React, { useContext } from 'react';
import { Card, CardBody, Button } from '@nextui-org/react';
import { Profile } from '@/app/types/entities';
import { DiscussionContext } from '@/app/context/DiscussionContext';

const ListDiscussions = ({ userProfil }: { userProfil: Profile }) => {
    const { selectedCDiscussion, setSelectedDiscussion } = useContext(DiscussionContext);

    return (
        <div className={`${selectedCDiscussion ? 'hidden sm:flex' : ' flex '} w-full sm:w-3/12 min-w-[200px] h-full border-e-2 border-white/20 no-scrollbar  flex-col flex-nowrap overflow-y-auto gap-4 pb-3 px-3`}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                <Card key={index} className='rounded-md min-h-[55px]'>
                    <CardBody className='flex-row p-0' >
                        <Button onClick={() => setSelectedDiscussion(true)} className='w-full h-full p-2 bg-transparent flex justify-start'>
                            <div className='aspect-square max-w-[40px] min-w-[40px]  flex bg-red-50/0'>
                                <img src={userProfil?.avatar_url} className='h-10 w-10 aspect-square rounded-full' />
                            </div>
                            <div className=' w-full overflow-hidden flex flex-col bg-green-300/0 h-full items-start'>
                                <h1 className='text-md font-semibold'>{userProfil?.username}</h1>
                                <p className='text-ellipsis line-clamp-1 flex w-full text-left'>Le dernier message de la discussion</p>
                            </div>
                        </Button>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
};

export default ListDiscussions;