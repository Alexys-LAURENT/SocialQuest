
const TopItemsSkeleton = ({ number }: { number?: number }) => {

    const items = Array.from({ length: number || 5 }, (_, index) => index);

    return (
        <div className="flex flex-col h-full gap-2">
            {
                items.map((index) => (
                    <div key={`top-item-skeleton-${index}-${Math.random}`} className="h-[58px] w-full">
                        <div className="flex items-center rounded-md bg-tempBgLightSecondary dark:bg-tempBgDark h-full w-full transition-all !duration-[500ms] border border-tempLightBorder dark:border-tempDarkBorder">
                            <div className="h-[35px] w-[35px] rounded-full bg-tempBgLightSkeleton dark:bg-tempBgDarkSkeleton animate-pulse mx-2"></div>
                            <div className="flex flex-col gap-1">
                                <div className="h-3 w-24 bg-tempBgLightSkeleton dark:bg-tempBgDarkSkeleton animate-pulse"></div>
                                <div className="h-3 w-16 bg-tempBgLightSkeleton dark:bg-tempBgDarkSkeleton animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div >
    );
};

export default TopItemsSkeleton;