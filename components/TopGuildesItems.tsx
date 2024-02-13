import { Avatar, Button } from '@nextui-org/react';
import Link from 'next/link';
import { getTopGuildes } from '@/utils/getTopGuildes';

const TopGuildesItems = async () => {
    const topGuildes = await getTopGuildes();

    const formatCount = (count: number) => {
        if (count >= 1000000) {
            return (Math.floor(count / 1000000 * 10) / 10).toFixed(1) + 'M'; // convert to M for number from > 1000000
        } else if (count >= 1000) {
            return (Math.floor(count / 100) / 10).toFixed(1) + 'k'; // convert to k for number from > 1000 
        } else {
            return count;
        }
    }

    return (
        <div className="flex flex-col gap-2">
            {topGuildes.map((guilde: any, index: any) => (
                <Button key={`guildes-topItem-${index}-${Math.random}`} as={Link} className="p-0 text-sm text-textDark dark:text-textLight transition-all !duration-[125ms] h-auto"
                    href={`/g/${guilde.name}`}
                >
                    <div className="px-2 py-1 relative flex items-center justify-between gap-2 h-full w-full rounded-md bg-bgLightPopover dark:bg-bgDarkPopover transition-all !duration-500">
                        <div className="flex items-center">
                            <div className="flex items-center justify-center bg-bgLightPopover dark:bg-bgDarkPopover rounded-full">
                                <Avatar src={guilde.avatar_url || ''} className="rounded-full text-large transition-all w-[40px] h-[40px]" />
                            </div>
                            <div className="flex flex-col ml-2 transition-all text-textDark dark:text-textLight">
                                <div className="text-sm">
                                    {guilde.name}
                                </div>
                                <div className="text-[0.6rem] text-gray-600 dark:text-gray-400 transition-all">
                                    {formatCount(guilde.members)} membres
                                </div>
                            </div>
                        </div>
                    </div>
                </Button>
            ))}
        </div>
    );
};

export default TopGuildesItems;