"use client";
import { useState, useEffect } from 'react';
import { getGuildesUser } from '@/utils/getGuildesUser';
import { Avatar, Button, Card } from '@nextui-org/react';
import Link from 'next/link';
import { formatCount } from '@/utils/formatCount';
import BtnCreateGuilde from '@/components/Home/BtnCreateGuilde';
import { Guilde } from '@/app/types/entities';
import TopItemsSkeleton from '../Skeletons/TopItemsSkeletons';

const UserGuildes = ({ customFunction, initGuildes }: { customFunction?: () => void, initGuildes?: any }) => {
  const [guildesUser, setGuildesUser] = useState<Guilde[] | null>(null);

  if (initGuildes && initGuildes && guildesUser === null) {
    setGuildesUser(initGuildes);
  }

  const fetchData = async () => {
    const data = await getGuildesUser();
    if (data) {
      setGuildesUser(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (id_guilde: string) => () => {
    document.getElementById(`Link-userGuilde-${id_guilde}`)?.click();
    if (customFunction) customFunction();
  };

  return (
    <div className="bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder rounded-md p-4 w-full flex flex-col gap-4">
      <h3 className="font-semibold">Guildes</h3>
      <div className="w-full flex flex-col gap-2">
        <BtnCreateGuilde customFunction={customFunction} fetchData={fetchData} />
        {!guildesUser && <TopItemsSkeleton number={3} />}
        {guildesUser && guildesUser.length === 0 && <p className="text-tiny text-tempLightHover/60">Aucune guilde</p>}
        {guildesUser &&
          guildesUser.length > 0 &&
          guildesUser.map((guilde, index) => (
            <div key={`userGuilde-${guilde.id_guilde}-${Math.random}`}>
              <Link id={`Link-userGuilde-${guilde.id_guilde}`} className='hidden' href={`/g/${guilde.nom}`} />
              <Button
                key={`guildes-topItem-${index}-${Math.random}`}
                className="w-full p-2 bg-tempBgLightSecondary hover:bg-tempLightBorder/50 dark:bg-tempBgDarkSecondary dark:hover:bg-tempDarkHover shadow-none border border-tempLightBorder dark:border-tempDarkBorder rounded-md !transition-all !duration-[125ms] h-auto"
                onClick={handleClick(guilde.id_guilde)}
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
                      <div className="text-left text-sm">{guilde.nom}</div>
                      <div className="text-left text-[0.6rem] text-gray-600 dark:text-gray-400 transition-all">
                        {formatCount(guilde.total_members)} membres
                      </div>
                    </div>
                  </div>
                </div>
              </Button>
            </div>
          ))}
      </div >
    </div>
  );
};

export default UserGuildes;
