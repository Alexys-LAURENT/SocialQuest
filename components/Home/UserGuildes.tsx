"use client";
import { useState, useEffect } from 'react';
import { getGuildesUser } from '@/utils/getGuildesUser';
import { Avatar, Button, Spinner } from '@nextui-org/react';
import Link from 'next/link';
import { formatCount } from '@/utils/formatCount';
import BtnCreateGuilde from '@/components/Home/BtnCreateGuilde';
import { Guilde } from '@/app/types/entities';
import TopItemsSkeleton from '../Skeletons/TopItemsSkeletons';

const UserGuildes = ({ customFunction, initGuildes, maxHeight }: { customFunction?: () => void, initGuildes?: any, maxHeight?: boolean }) => {
  const [guildesUser, setGuildesUser] = useState<Guilde[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);


  if (initGuildes && initGuildes && guildesUser === null) {
    setGuildesUser(initGuildes.guildesUser);
    setIsLast(initGuildes.isLastPage);
  }

  const fetchData = async () => {
    const data = await getGuildesUser(0);
    if (data) {
      setGuildesUser(data.guildesUser);
      setIsLast(data.isLastPage);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const loadMore = async () => {
    if (!guildesUser || isLoading || isLast) return;

    setIsLoading(true);
    const offset = guildesUser.length;
    const data = await getGuildesUser(offset);
    if (data) {
      setGuildesUser([...guildesUser, ...data.guildesUser]);
      setIsLast(data.isLastPage);
      setFirstLoad(false);
    }
    setIsLoading(false);
  };

  const loadLess = async () => {
    if (!guildesUser) return;
    if (isLoading) return;
    if (guildesUser.slice(0, guildesUser.length - 4).length < 4) {
      setGuildesUser(guildesUser.slice(0, 4));
    } else {
      setGuildesUser(guildesUser.slice(0, guildesUser.length - 4));
    }
    setIsLast(false);
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id_guilde: string) => {
    e.preventDefault();

    if (customFunction) {
      customFunction();
    }

    document.getElementById(`guildes-userGuildes-${id_guilde}`)?.click();

  };

  return (
    <div className={`bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder rounded-md p-4 w-full flex flex-col gap-4 ${maxHeight ? 'max-h-[calc(100vh-7rem)]' : ''}`}>
      <h3 className="font-semibold">Guildes</h3>
      <div className="w-full flex flex-col gap-2 overflow-y-auto">
        <BtnCreateGuilde customFunction={customFunction} fetchData={fetchData} />
        {!guildesUser && <TopItemsSkeleton number={3} />}
        {guildesUser && guildesUser.length === 0 && <p className="text-tiny text-tempLightHover/60">Aucune guilde</p>}
        {guildesUser &&
          guildesUser.length > 0 && (
            guildesUser.map((guilde, index) => (
              <div key={`userGuilde-${guilde.id_guilde}-${Math.random}`}>
                <Link id={`guildes-userGuildes-${guilde.id_guilde}`} href={`/g/${guilde.nom}`} />
                <Button
                  as={Link}
                  href={`/g/${guilde.nom}`}
                  key={`guildes-topItem-${index}-${Math.random}`}
                  className="w-full p-2 bg-tempBgLightSecondary hover:bg-tempLightBorder/50 dark:bg-tempBgDarkSecondary dark:hover:bg-tempDarkHover shadow-none border border-tempLightBorder dark:border-tempDarkBorder rounded-md !transition-all !duration-[125ms] h-auto"
                  // on let go of the button, the function is called
                  onClick={(e) => handleClick(e, guilde.id_guilde)}
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
                          {formatCount(guilde.total_members)} {guilde.total_members > 1 ? 'membres' : 'membre'}
                        </div>
                      </div>
                    </div>
                  </div>
                </Button>
              </div>
            ))
          )}
        {guildesUser && guildesUser.length > 0 && (
          <div className="flex gap-2">
            {!isLast && (
              <Button onClick={loadMore} className="w-full p-2 bg-tempBgLightSecondary hover:bg-tempLightBorder/50 dark:bg-tempBgDarkSecondary dark:hover:bg-tempDarkHover shadow-none border border-tempLightBorder dark:border-tempDarkBorder rounded-md !transition-all !duration-[125ms] h-auto">
                {!isLoading ? 'Voir plus' : <Spinner size="sm" className="scale-75" color="white" />}
              </Button>
            )}
            {!firstLoad && guildesUser.length > 4 && (
              <Button onClick={loadLess} className="w-full p-2 bg-tempBgLightSecondary dark:bg-tempBgDarkSecondary shadow-none border border-tempLightBorder dark:border-tempDarkBorder rounded-md !transition-all !duration-[125ms] h-auto">
                Voir moins
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserGuildes;
