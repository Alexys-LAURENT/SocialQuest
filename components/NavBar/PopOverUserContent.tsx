import { Profile } from '@/app/types/entities';
import SwitchTheme from '@/components/NavBar/SwitchTheme';
import NextRewards from '@/components/NextRewards';
import { formatCount } from '@/utils/formatCount';
import { formatCountText } from '@/utils/formatCountText';
import {
  ArrowRightEndOnRectangleIcon,
  ClipboardDocumentCheckIcon,
  Cog8ToothIcon,
  CubeIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { Divider, Progress } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';

const PopOverUserContent = ({
  user,
  customFunction,
  signOut,
}: {
  user: Profile;
  customFunction: () => void;
  signOut: () => void;
}) => {
  const progressValue =
    ((user?.xp! - user?.niveaux.xp_debut!) * 100) / (user?.niveaux.xp_fin! - user?.niveaux.xp_debut!);

  return (
    <div className="flex flex-col w-full gap-2 px-1 py-2 popOverUserContentWrapper text-textDark dark:text-textLight">
      <div>
        <span className="block mb-2 font-semibold">Connecté en tant que: @{user?.username}</span>
        <Divider />
      </div>
      <div className="levelWrapper">
        <div className="flex justify-between items-center transition-all !duration-[125ms]">
          <div className="text-tiny">Level {user?.niveaux.libelle!}</div>
          <div className="text-tiny">Level {user?.niveaux.libelle! + 1}</div>
        </div>
        <Progress
          aria-label="Level"
          value={progressValue}
          title={`${user?.xp!} / ${user?.niveaux.xp_fin! + 1} xp`}
          classNames={{ track: 'transition-all !duration-500', indicator: 'bg-secondary' }}
        />
      </div>

      <div className="nextRewardsWrapper flex justify-between sm:justify-end items-center gap-1 text-end text-[#979797]">
        <div
          className="flex items-center gap-1 px-1 py-1 rounded-md sm:hidden min-w-fit sm:px-2 bg-secondary/30"
          title={`${formatCountText(user.social_coins)} SocialCoins`}
        >
          <Image src="/assets/SocialCoin.png" alt="SocialCoin" width={16} height={16} />
          <p className="text-xs text-textDark dark:text-textLight transition-all !duration-[125ms]">
            {formatCount(user.social_coins)}
          </p>
        </div>
        <NextRewards user={user} />
      </div>

      <Divider />
      <div className="flex flex-col text-lg select-none">
        <Link
          href={`/${user?.username}`}
          className="flex items-center gap-2 px-1 py-1 transition-all ease-in-out rounded-md dark:hover:bg-tempDarkHover hover:bg-tempLightHover hover:bg-opacity-75"
          onClick={() => customFunction()}
        >
          <UserIcon className="w-5 h-5 text-textDark dark:text-textLight transition-all !duration-[125ms]" />
          <div className="text-textDark dark:text-textLight transition-all !duration-[125ms] text-sm font-semibold">
            Profil
          </div>
        </Link>
        <Link
          href={`/missions`}
          className="flex items-center gap-2 px-1 py-1 transition-all ease-in-out rounded-md dark:hover:bg-tempDarkHover hover:bg-tempLightHover hover:bg-opacity-75"
          onClick={() => customFunction()}
        >
          <ClipboardDocumentCheckIcon className="w-5 h-5 text-textDark dark:text-textLight transition-all !duration-[125ms]" />
          <div className="text-textDark dark:text-textLight transition-all !duration-[125ms] text-sm font-semibold">
            Missions
          </div>
        </Link>
        <Link
          href="/parametres"
          className="flex items-center gap-2 px-1 py-1 transition-all ease-in-out rounded-md dark:hover:bg-tempDarkHover hover:bg-tempLightHover hover:bg-opacity-75"
          onClick={() => customFunction()}
        >
          <Cog8ToothIcon className="w-5 h-5 text-textDark dark:text-textLight transition-all !duration-[125ms]" />
          <div className="text-textDark dark:text-textLight transition-all !duration-[125ms] text-sm font-semibold">
            Paramètres
          </div>
        </Link>
        <Link
          href={`/${user?.username}/inventaire`}
          className="flex items-center gap-2 px-1 py-1 transition-all ease-in-out rounded-md dark:hover:bg-tempDarkHover hover:bg-tempLightHover hover:bg-opacity-75"
          onClick={() => customFunction()}
        >
          <CubeIcon className="w-5 h-5 text-textDark dark:text-textLight transition-all !duration-[125ms]" />
          <div className="text-textDark dark:text-textLight transition-all !duration-[125ms] text-sm font-semibold">
            Inventaire
          </div>
        </Link>

        <SwitchTheme user={user} />

        <Link
          href="/"
          className="flex items-center gap-2 px-1 py-1 transition-all ease-in-out rounded-md cursor-pointer dark:hover:bg-tempDarkHover hover:bg-tempLightHover hover:bg-opacity-75"
          onClick={() => {
            customFunction();
            signOut();
          }}
        >
          <ArrowRightEndOnRectangleIcon className="w-5 h-5 text-textDark dark:text-textLight transition-all !duration-[125ms]" />
          <div className="text-textDark dark:text-textLight transition-all !duration-[125ms] text-sm font-semibold">
            Déconnexion
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PopOverUserContent;
