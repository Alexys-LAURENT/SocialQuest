import { getGuildesUser } from '@/utils/getGuildesUser';
import { Avatar, Card } from '@nextui-org/react';
import Link from 'next/link';
import { formatCount } from '@/utils/formatCount';
import { PlusIcon } from '@heroicons/react/24/outline';

const UserGuildes = async () => {
  const guildesUser = await getGuildesUser()

  return (
    <div className='bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder rounded-md p-4 w-full flex flex-col gap-4'>
      <h3 className='font-semibold'>Guildes</h3>
      <div className='w-full flex flex-col gap-2'>
        <Card key={`create-guilde`}
          className="cursor-pointer p-2 bg-tempBgLightSecondary hover:bg-tempLightBorder/50 dark:bg-tempBgDarkSecondary dark:hover:bg-tempDarkHover shadow-none border border-tempLightBorder dark:border-tempDarkBorder rounded-md !transition-all !duration-[125ms] h-auto"
        >
          <div className="flex items-center">
            <PlusIcon className='w-6 h-6' />
            <div className="flex flex-col ml-2 transition-all text-textDark dark:text-textLight">
              <div className="text-sm">Créer une guilde</div>
            </div>
          </div>
        </Card>
        {guildesUser && guildesUser.length === 0 && <p className='text-tiny text-tempLightHover/60'>Aucune guildes</p>}
        {guildesUser && guildesUser.length > 0 && guildesUser.map((guilde, index) => (
          <Card
            key={`guildes-topItem-${index}-${Math.random}`}
            as={Link}
            className="p-2 bg-tempBgLightSecondary hover:bg-tempLightBorder/50 dark:bg-tempBgDarkSecondary dark:hover:bg-tempDarkHover shadow-none border border-tempLightBorder dark:border-tempDarkBorder rounded-md !transition-all !duration-[125ms] h-auto"
            href={`/g/${guilde.nom}`}
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
                  <div className="text-sm">{guilde.nom}</div>
                  <div className="text-[0.6rem] text-gray-600 dark:text-gray-400 transition-all">
                    {formatCount(guilde.total_members)} membres
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserGuildes;