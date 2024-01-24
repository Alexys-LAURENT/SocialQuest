import { Avatar } from '@nextui-org/react';
import React from 'react';

const PostSkeleton = () => {
    return (
        <div className="flex flex-col border border-gray-500 rounded-md p-2 gap-1">

            <div className="flex gap-2">
                <div className='w-[32px] h-[32px] bg-bgDarkSecondary/80 animate-pulse rounded-full'></div>
                <div className="flex items-center justify-between w-full">
                    <div className="flex gap-1 w-full">
                        <div className='w-[60%] h-6 bg-bgDarkSecondary/80 animate-pulse rounded-md'></div>
                    </div>
                </div>
            </div>


            <div className="flex flex-col px-10 gap-2">
                <div className='flex flex-col gap-3'>
                    <div className={`text-md font-bold working-break-words `}>
                        <div className='w-[60%] h-6 bg-bgDarkSecondary/80 animate-pulse rounded-md'></div>
                    </div>
                    <div className="text-textLight working-break-words h-6">
                        <div className='w-[60%] h-6 bg-bgDarkSecondary/80 animate-pulse rounded-md'></div>
                    </div>
                </div>

                <div className="flex md:flex-row gap-2 flex-col-reverse justify-between">

                    <div className="text-slate-400 text-xs flex items-end">

                    </div>
                </div>
            </div>

        </div>
    );
};

export default PostSkeleton;