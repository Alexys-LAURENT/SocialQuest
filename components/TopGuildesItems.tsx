import { Avatar, Button } from '@nextui-org/react';
import Link from 'next/link';
import { getTopGuildes } from '@/utils/getTopGuildes';
import Image from 'next/image';
import { formatCount } from '@/utils/formatCount';

const TopGuildesItems = async () => {
  const topGuildes = await getTopGuildes();

  return (
    <div className="flex flex-col gap-2">
      {topGuildes.map((guilde: { name: string; avatar_url: string; members: number }, index: number) => (
        <Button
          key={`guildes-topItem-${index}-${Math.random}`}
          as={Link}
          className="p-2 bg-tempBgLightSecondary hover:bg-tempLightBorder/50 dark:bg-tempBgDarkSecondary dark:hover:bg-tempDarkHover shadow-none border border-tempLightBorder dark:border-tempDarkBorder rounded-md !transition-all !duration-[125ms] h-auto"
          href={`/g/${guilde.name}`}
        >
          <div className={`flex items-center justify-between gap-2 h-full w-full transition-all !duration-500`}>
            <div className={`flex items-center overflow-hidden ${index < 3 ? 'w-10/12' : 'w-full'}`}>
              <div className="flex items-center justify-center bg-bgLightPopover dark:bg-bgDarkPopover rounded-full">
                <Avatar
                  src={guilde.avatar_url || ''}
                  className="rounded-full text-large transition-all w-[35px] h-[35px]"
                />
              </div>
              <div className="flex flex-col ml-2 transition-all text-textDark dark:text-textLight">
                <div className="w-[130px] text-sm text-ellipsis overflow-hidden">{guilde.name}</div>
                <div className="text-[0.6rem] text-gray-600 dark:text-gray-400 transition-all">
                  {formatCount(guilde.members)} membres
                </div>
              </div>
            </div>
            {index < 3 && (
              <div className="flex justify-center items-center h-full text-textDark dark:text-textLight transition-all w-2/12">
                {/* if index is 0, 1 or 2, display the badge */}
                <Image
                  src={`/assets/medal-${index}.png`}
                  alt={`Rank ${index + 1}`}
                  className='min-w-[1.25rem] w-[1.25rem] min-h-[1.25rem] h-[1.25rem]'
                  width={100}
                  height={100}
                />
              </div>
            )}
          </div>
        </Button>
      ))}
    </div>
  );
};

export default TopGuildesItems;
