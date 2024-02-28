import React from 'react';

const PopoverNotificationsSkeleton = () => {
    return (

        <div className="w-full flex flex-col gap-3 py-3">
            <div className="w-full h-7 rounded-md animate-pulse bg-tempBgLightSkeleton dark:bg-tempBgDarkSkeleton" />
            <div className="w-full h-7 rounded-md animate-pulse bg-tempBgLightSkeleton dark:bg-tempBgDarkSkeleton" />
            <div className="w-full h-7 rounded-md animate-pulse bg-tempBgLightSkeleton dark:bg-tempBgDarkSkeleton" />
            <div className="w-full h-7 rounded-md animate-pulse bg-tempBgLightSkeleton dark:bg-tempBgDarkSkeleton" />
        </div>
    );
};

export default PopoverNotificationsSkeleton;