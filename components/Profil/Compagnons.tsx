'use client';
import { Profile } from '@/app/types/entities';
import SearchBarCompagnons from '@/components/Profil/SearchBarCompagnons';
import { Avatar, Link } from '@nextui-org/react';
import { useState } from 'react';

const Compagnons = ({
  isUserProfil,
  userFriends,
  pageProfile,
}: {
  isUserProfil: boolean;
  userFriends: Profile[];
  pageProfile: Profile;
}) => {
  const [listFriends, setListFriends] = useState<Profile[]>(userFriends);
  return (
    <div className="flex flex-col gap-3 w-full h-[25rem] lg:h-[35rem] lg:w-2/6 bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder rounded-md py-2 px-4 transition-all !duration-500">
      <div>
        <div className="text-xl font-semibold text-textDark dark:text-textLight transition-all !duration-[125ms]">
          {isUserProfil ? 'Mes Compagnons' : 'Compagnons'}
        </div>
      </div>
      <div>
        <SearchBarCompagnons setListFriends={setListFriends} id_userPageProfile={pageProfile.id_user} />
      </div>
      <div className="flex flex-col gap-4 overflow-y-auto">
        {listFriends &&
          listFriends.length > 0 &&
          listFriends.map((user) => (
            <Link
              href={`/${user.username}`}
              key={`user-friend-${user.id_user}`}
              className="relative flex min-h-[3.5rem] items-center gap-2 py-2 rounded-md bg-bgLightPopover dark:bg-bgDarkPopover transition-all !duration-500"
            >
              <div className="flex items-center px-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-bgLightPopover dark:bg-bgDarkPopover">
                  <Avatar src={(user && user.avatar_url) || ''} className="transition-all rounded-full text-large" />
                </div>
                <div className="flex flex-col ml-2 text-textLight">
                  <div className="text-sm text-textDark dark:text-textLight transition-all !duration-[125ms]">
                    {user && user.username}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        {listFriends && listFriends.length === 0 && (
          <div className="text-center dark:text-tempTextLight">Aucun compagnon</div>
        )}
      </div>
    </div>
  );
};

export default Compagnons;
