"use client"
import { useContext } from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { DiscussionContext } from '@/app/context/DiscussionContext';
import { PlusIcon } from '@heroicons/react/24/outline';




const ListDiscussionsSkeleton = () => {

    const { selectedCDiscussion } = useContext(DiscussionContext);


    return (
        <div className={`${selectedCDiscussion ? 'hidden sm:flex' : ' flex '} w-full sm:w-3/12 min-w-[200px] h-full border-e-none sm:border-e-2 border-white/20 no-scrollbar  flex-col flex-nowrap overflow-y-auto gap-4 pb-3 px-3`}>
            <div className="flex justify-between">
                <div className="text-xl">
                    Discussions
                </div>
                <div className='bg-default/40 flex items-center justify-center rounded-full h-8 w-8 p-0 min-w-0 aspect-square'>
                    <div className='flex'>
                        <PlusIcon className='h-6 w-6 rounded-full' />
                    </div>
                </div>

            </div>
            {[1, 2, 3, 4, 5].map((item: number) => (
                <Card key={`ListDiscussionsSkeleton-${item}`} className={`rounded-md min-h-[55px] `}>
                    <CardBody className='flex-row p-0' >
                        <div className='w-full h-full gap-2 p-2 bg-transparent flex justify-start'>
                            <div className='aspect-square max-w-[40px] min-w-[40px] flex'>
                                <div className='h-10 w-10 bg-gray-700 animate-pulse rounded-full'></div>
                            </div>
                            <div className=' w-full overflow-hidden flex flex-col bg-green-300/0 h-full items-start'>
                                <div className='flex w-10/12 h-4 bg-gray-700 animate-pulse rounded-md'></div>
                                <div className='flex w-8/12 h-4 bg-gray-700 animate-pulse rounded-md mt-2'></div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
};

export default ListDiscussionsSkeleton;


