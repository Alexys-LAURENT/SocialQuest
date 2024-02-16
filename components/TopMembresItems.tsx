import { Avatar, Badge, Card } from '@nextui-org/react';
import Link from 'next/link';
import { getTopMembres } from '@/utils/getTopMembres';
import Image from 'next/image';

const TopMembresItems = async () => {
  const topMembres = await getTopMembres();

  return (
    <div className="flex flex-col gap-2">
      {topMembres.map((membre: any, index: any) => (
        <Card
          key={`member-topItem-${index}-${Math.random}`}
          as={Link}
          className="p-2 bg-tempBgLightSecondary hover:bg-tempLightBorder/50 dark:bg-tempBgDarkSecondary dark:hover:bg-tempDarkHover shadow-none border border-tempLightBorder dark:border-tempDarkBorder text-sm rounded-md text-textDark dark:text-textLight !transition-all !duration-[125ms] h-auto"
          href={membre.username}
        >
          <div className="flex items-center justify-between gap-2 h-full w-full transition-all !duration-500">
            <div className="flex items-center">
              <div className="flex items-center justify-center rounded-full">
                <Avatar
                  src={membre.avatar_url || ''}
                  className="rounded-full text-large transition-all w-[35px] h-[35px]"
                />
              </div>
              <div className="flex flex-col ml-2 transition-all text-textDark dark:text-textLight">
                <div className="text-sm">
                  {membre.username}
                </div>
                <div className="text-[0.6rem] text-gray-600 dark:text-gray-400 transition-all">
                  Niveau {membre.level}
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

export default TopMembresItems;
