
const TopItemsSkeleton = () => {
    return (
        <div className="flex flex-col h-full gap-2">
            {
                [1, 2, 3, 4, 5].map((item, index) => (
                    <div key={`top-item-skeleton-${index}-${Math.random}`} className="h-[48px] w-full">
                        <div className="rounded-xl bg-bgLightPopover dark:bg-bgDarkPopover/60 animate-pulse h-full w-full">

                        </div>
                    </div>
                ))
            }
        </div >
    );
};

export default TopItemsSkeleton;