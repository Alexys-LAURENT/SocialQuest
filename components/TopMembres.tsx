import TopItemsSkeleton from "@/components/Skeletons/TopItemsSkeletons";
import TopMembresItems from "@/components/TopMembresItems";
import { Suspense } from "react";

const TopMembres = () => {

    return (
        <div className="p-4 w-full flex flex-col bg-bgLightCard dark:bg-bgDarkCard rounded-md transition-all !duration-500">
            <div className="flex flex-col min-h-[19.5rem] text-textDark dark:text-textLight transition-all !duration-[125ms] gap-4">
                <span className="text-xl font-semibold">Top Membres</span>
                <Suspense fallback={<TopItemsSkeleton />}>
                    <TopMembresItems />
                </Suspense>
            </div>
        </div >
    );
};

export default TopMembres;