
const TopItemsSkeleton = () => {
    return (
        <div className="flex flex-col h-full gap-2">
            {
                [1, 2, 3, 4, 5].map((item, index) => (
                    <div key={`top-item-skeleton-${index}-${Math.random}`} className="h-[48px] w-full">
                        <div className="rounded-xl bg-tempBgLightSkeleton dark:bg-tempBgDarkSkeleton animate-pulse h-full w-full transition-all !duration-[500ms]">

                        </div>
                    </div>
                ))
            }
        </div >
    );
};

export default TopItemsSkeleton;