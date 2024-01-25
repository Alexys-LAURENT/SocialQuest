
import ListDiscussionsSuspenser from '@/components/Discussions/ListDiscussionsSuspenser';
import ListDiscussionsSkeleton from '@/components/Skeletons/Discussions/listDiscussionSkeleton';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';


const MessagesWrapper = dynamic(() => import('@/components/Discussions/MessagesWrapper'));


const page = async () => {

    return (
        <div className="h-full w-full flex flex-col overflow-hidden items-center">

            <div className="relative w-full h-[100%] max-w-[1280px] bg-red-100/0 flex">

                <Suspense fallback={<ListDiscussionsSkeleton />}>
                    <ListDiscussionsSuspenser />
                </Suspense>
                <MessagesWrapper />

            </div>
        </div>
    );
};

export default page;