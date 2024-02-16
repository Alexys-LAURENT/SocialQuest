import { Avatar, Card } from '@nextui-org/react';
import Link from 'next/link';
import { getTopGuildes } from '@/utils/getTopGuildes';
import Image from 'next/image';

const TopGuildesItems = async () => {
  const topGuildes = await getTopGuildes();

  const formatCount = (count: number) => {
    if (count >= 1000000) {
      return (Math.floor((count / 1000000) * 10) / 10).toFixed(1) + 'M'; // convert to M for number from > 1000000
    } else if (count >= 1000) {
      return (Math.floor(count / 100) / 10).toFixed(1) + 'k'; // convert to k for number from > 1000
    } else {
      return count;
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {topGuildes.map((guilde: any, index: any) => (
        <Card
          key={`guildes-topItem-${index}-${Math.random}`}
          as={Link}
          className="p-2 bg-tempBgLightSecondary hover:bg-tempLightBorder/50 dark:bg-tempBgDarkSecondary dark:hover:bg-tempDarkHover shadow-none border border-tempLightBorder dark:border-tempDarkBorder rounded-md !transition-all !duration-[125ms] h-auto"
          href={`/g/${guilde.name}`}
        >
          <div className="flex items-center justify-between gap-2 h-full w-full transition-all !duration-500">
            <div className="flex items-center">
              <div className="flex items-center justify-center bg-bgLightPopover dark:bg-bgDarkPopover rounded-full">
                <Avatar
                  src={guilde.avatar_url || ''}
                  className="rounded-full text-large transition-all w-[35px] h-[35px]"
                />
              </div>
              <div className="flex flex-col ml-2 transition-all text-textDark dark:text-textLight">
                <div className="text-sm">{guilde.name}</div>
                <div className="text-[0.6rem] text-gray-600 dark:text-gray-400 transition-all">
                  {formatCount(guilde.members)} membres
                </div>
              </div>
            </div>
            <div className="flex items-center w-fit h-full text-textDark dark:text-textLight transition-all">
              {/* if index is 0, 1 or 2, display the badge */}
              {index < 3 && (
                <Image
                  src={`/assets/medal-${index}.png`}
                  alt={`Rank ${index + 1}`}
                  className='w-5 h-5'
                  width={100}
                  height={100}
                />
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TopGuildesItems;
