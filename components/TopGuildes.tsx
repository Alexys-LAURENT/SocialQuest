import TopGuildesItems from "@/components/TopGuildesItems";
import { Suspense } from "react";
import TopItemsSkeleton from "@/components/Skeletons/TopItemsSkeletons";

const TopGuildes = () => {

    return (
        <div className="p-4 w-full flex flex-col bg-bgLightCard dark:bg-bgDarkCard rounded-md transition-all !duration-500">
            <div className="flex flex-col min-h-[19.5rem] text-textDark dark:text-textLight transition-all !duration-[125ms] gap-4">
                <span className="text-xl font-semibold">Top Guildes</span>
                <Suspense fallback={<TopItemsSkeleton />}>
                    <TopGuildesItems />
                </Suspense>
            </div>
        </div >
    );
};

export default TopGuildes;