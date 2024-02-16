import { DocumentIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

const PostInputSkeleton = () => {
    return (
        <div className="w-full h-fit flex flex-col min-h-fit">
            <div className="flex flex-col h-full w-full bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder rounded-t-md py-2 px-6 gap-1 transition-all !duration-500">
                <div className="animate-pulse rounded-md bg-tempBgLightSkeleton dark:bg-tempBgDarkSkeleton w-full h-[56px] transition-all !duration-500"></div>

                <div className="animate-pulse rounded-md bg-tempBgLightSkeleton dark:bg-tempBgDarkSkeleton w-full h-[50px] transition-all !duration-500"></div>

                <div className="animate-pulse rounded-md bg-tempBgLightSkeleton dark:bg-tempBgDarkSkeleton w-full h-[90px] transition-all !duration-500"></div>
            </div>
            <div className="h-[30px] w-full bg-tempLightBorder dark:bg-[#1f1e1b] rounded-b-md transition-all !duration-500">
                <div className="flex justify-between items-center h-full px-2">
                    <DocumentIcon className="w-5 h-5 text-textDark dark:text-textLight transition-all !duration-[125ms]" />
                    <PaperAirplaneIcon className="w-5 h-5  text-textDark dark:text-textLight mb-[0.25rem] ml-[0.15rem] -rotate-45 transition-all !duration-[125ms]" />
                </div>
            </div>
        </div >
    );
};

export default PostInputSkeleton;