import HebdoCaroussel from '@/components/Missions/HebdoCaroussel';
import React from 'react';

const page = () => {
    return (
        <div className="h-full w-full flex flex-col overflow-y-auto overflow-x-hidden items-center">
            <div className="relative w-full min-h-[10rem] md:min-h-[18rem]  bg-cover bg-center transition-all max-w-[1280px]">
                <HebdoCaroussel />
            </div>

            {/* content */}
            <div className="relative w-full min-h-[7rem] max-w-[1280px]">

            </div>
        </div>
    );
};

export default page;