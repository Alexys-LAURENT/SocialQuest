import TopGuildesItems from '@/components/TopGuildesItems';
import { Suspense } from 'react';
import TopItemsSkeleton from '@/components/Skeletons/TopItemsSkeletons';

const TopGuildes = () => {
  return (
    <div className="p-4 w-full flex flex-col bg-tempBgLightSecondary dark:bg-tempBgDark border dark:border-tempDarkBorder border-tempLightBorder rounded-md transition-all !duration-500">
      <div className="flex flex-col min-h-[19.5rem] text-textDark dark:text-textLight transition-all !duration-[125ms] gap-4">
        <h3 className="text-base font-semibold">Top Guildes</h3>
        <Suspense fallback={<TopItemsSkeleton />}>
          <TopGuildesItems />
        </Suspense>
      </div>
    </div>
  );
};

export default TopGuildes;
