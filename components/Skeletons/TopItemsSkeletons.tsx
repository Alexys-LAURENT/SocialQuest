
const TopItemsSkeleton = ({ number }: { number?: number }) => {

    const items = Array.from({ length: number || 5 }, (_, index) => index);

    return (
        <div className="flex flex-col h-full gap-2">
            {
                items.map((index) => (
                    <div key={`top-item-skeleton-${index}-${Math.random}`} className="h-[57.6px] w-full">
                        <div className="rounded-md bg-tempBgLightSkeleton dark:bg-tempBgDarkSkeleton animate-pulse h-full w-full transition-all !duration-[500ms]">

                        </div>
                    </div>
                ))
            }
        </div >
    );
};

export default TopItemsSkeleton;