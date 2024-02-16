const PostSkeleton = () => {
    return (
        <div className="flex flex-col border border-tempLightBorder dark:border-tempDarkBorder rounded-md p-2 gap-1">

            <div className="flex gap-2">
                <div className='w-[32px] h-[32px] bg-tempBgLightSkeleton dark:bg-tempBgDarkSkeleton animate-pulse rounded-full transition-all !duration-[500ms]'></div>
                <div className="flex items-center justify-between w-full">
                    <div className="flex gap-1 w-full">
                        <div className='w-[60%] h-6 bg-tempBgLightSkeleton dark:bg-tempBgDarkSkeleton animate-pulse rounded-md transition-all !duration-[500ms]'></div>
                    </div>
                </div>
            </div>


            <div className="flex flex-col px-10 gap-2">
                <div className='flex flex-col gap-3'>
                    <div className={`text-md font-bold working-break-words `}>
                        <div className='w-[60%] h-6 bg-tempBgLightSkeleton dark:bg-tempBgDarkSkeleton animate-pulse rounded-md transition-all !duration-[500ms]'></div>
                    </div>
                    <div className="text-textLight working-break-words h-6">
                        <div className='w-[60%] h-6 bg-tempBgLightSkeleton dark:bg-tempBgDarkSkeleton animate-pulse rounded-md transition-all !duration-[500ms]'></div>
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