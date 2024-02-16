const CompagnonSkeleton = ({ isUserProfil }: { isUserProfil: boolean }) => {
    return (
        <div className="flex flex-col gap-3 w-full h-[25rem] lg:h-[35rem] rounded-md lg:w-2/6 bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder py-2 px-4 transition-all !duration-500">
            <div>
                <div className="text-xl font-semibold text-textDark dark:text-textLight transition-all !duration-[125ms]">
                    {isUserProfil ? "Mes Compagnons" : "Compagnons"}
                </div>
            </div>
            <div>
                <div className='w-full h-[56px] bg-tempBgLightSkeleton dark:bg-tempBgDarkSkeleton animate-pulse rounded-lg transition-all !duration-500'></div>
            </div>
            <div className="flex flex-col gap-4 overflow-y-auto">
                {
                    [1, 2, 3].map((item, index) => (
                        <div key={`user-friend-skeleton-${item}`} className="relative flex min-h-[4.5rem] items-center gap-2 py-2 rounded-md bg-tempBgLightSkeleton dark:bg-tempBgDarkSkeleton animate-pulse transition-all !duration-500">

                        </div>
                    ))
                }

            </div>
        </div>
    );
};

export default CompagnonSkeleton;