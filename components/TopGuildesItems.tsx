"use client";
import { useState, useEffect } from 'react';
import { Avatar, Button } from '@nextui-org/react';
import Link from 'next/link';
import { getTopGuildes } from '@/utils/getTopGuildes';
import Image from 'next/image';
import { formatCount } from '@/utils/formatCount';
import TopItemsSkeleton from './Skeletons/TopItemsSkeletons';

const TopGuildesItems = ({ customFunction, initGuildes }: { customFunction?: () => void, initGuildes?: any }) => {
  const [topGuildes, setTopGuildes] = useState([]);

  if (initGuildes && initGuildes.length > 0 && topGuildes.length === 0) {
    setTopGuildes(initGuildes);
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTopGuildes();
      setTopGuildes(data);
    };
    fetchData();
  }, []);


  const handleClick = (guilde_name: string) => () => {
    document.getElementById(`Link-topGuilde-${guilde_name}`)?.click();
    if (customFunction) customFunction();
  };

  return topGuildes.length === 0 ? (
    <TopItemsSkeleton />
  ) : (
    <div className="flex flex-col gap-2">
      {topGuildes.map((guilde: { name: string; avatar_url: string; members: number }, index: number) => (
        <div key={`topGuilde-${guilde.name}-${Math.random}`}>
          <Link id={`Link-topGuilde-${guilde.name}`} className='hidden' href={`/g/${guilde.name}`} />
          <Button
            key={`guildes-topItem-${index}-${Math.random}`}
            className="w-full p-2 bg-tempBgLightSecondary hover:bg-tempLightBorder/50 dark:bg-tempBgDarkSecondary dark:hover:bg-tempDarkHover shadow-none border border-tempLightBorder dark:border-tempDarkBorder rounded-md !transition-all !duration-[125ms] h-auto"
            onClick={handleClick(guilde.name)}
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
                  <div className="w-[130px] text-left text-sm text-ellipsis overflow-hidden">{guilde.name}</div>
                  <div className="text-[0.6rem] text-left text-gray-600 dark:text-gray-400 transition-all">
                    {formatCount(guilde.members)} {guilde.members > 1 ? 'membres' : 'membre'}
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
                    width={30}
                    height={30}
                  />
                </div>
              )}
            </div>
          </Button>
        </div>
      ))}
    </div>
  );
};

export default TopGuildesItems;
