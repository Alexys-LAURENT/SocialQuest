import { Link, Button } from '@nextui-org/react';
import { getBannieresUser } from '@/utils/getItemsProfil';
import { Item, Profile } from '@/app/types/entities';
import APropos from '@/components/Profil/APropos';
import { getNextRewards } from '@/utils/getNextRewards';
import BannieresProfil from '@/components/Profil/BannieresProfil';
import BadgesProfil from '@/components/Profil/BadgesProfil';
import { Suspense } from 'react';
import ProfileItemSkeleton from '@/components/Skeletons/ProfileItemSkeleton';

const Infos = async ({ isUserProfil, user }: { isUserProfil: boolean; user: Profile }) => {
  const nextRewards = await getNextRewards(user?.niveaux?.libelle!);

  const bannieres = (await getBannieresUser(user?.id_user!)) as unknown as Item[];

  return (
    <div className="flex flex-col w-full h-[35rem] lg:w-4/6 gap-0 sm:gap-6 rounded-md transition-all">
      <APropos isUserProfil={isUserProfil} user={user} nextRewards={nextRewards} />

      <div className="flex flex-col gap-6 h-[60%] justify-center">
        <div className="flex flex-col gap-2 h-[40%] sm:h-1/2">
          <Button
            as={Link}
            href={`/${user.username}/inventaire?q=Bannières`}
            variant="flat"
            className="bg-secondary/30 w-max rounded-sm text-textDark dark:text-textLight transition-all !duration-500"
          >
            {isUserProfil ? 'Mes bannières épinglées' : 'Bannières épinglées'}
          </Button>
          <div className="relative flex h-full gap-6 bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder transition-all !duration-500 rounded-md py-2 px-3 overflow-x-auto">
            <div id="BannersWrapper" className="overflow-x-auto flex w-full h-full gap-6 scroll-smooth">
              <Suspense fallback={<ProfileItemSkeleton />}>
                <BannieresProfil isUserProfil={isUserProfil} bannieres={bannieres} />
              </Suspense>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 h-[40%] sm:h-1/2">
          <Button
            as={Link}
            href={`/${user.username}/inventaire?q=Badges`}
            variant="flat"
            className="bg-secondary/30 w-max rounded-sm text-textDark dark:text-textLight transition-all !duration-500"
          >
            {isUserProfil ? 'Mes badges épinglées' : 'Badges épinglées'}
          </Button>
          <div className="relative flex h-full gap-6 bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder transition-all !duration-500 rounded-md py-2 px-3">
            <div id="BadgesWrapper" className="overflow-x-auto flex w-full h-full gap-6 scroll-smooth">
              <Suspense fallback={<ProfileItemSkeleton />}>
                <BadgesProfil isUserProfil={isUserProfil} user={user} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infos;
