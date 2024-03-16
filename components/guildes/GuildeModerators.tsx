import { getGuildeModerators } from '@/utils/getGuildeModerators';
import { Avatar, Button } from '@nextui-org/react';
import Link from 'next/link';
import { formatCount } from '@/utils/formatCount';
import { Moderator } from '@/app/types/entities';

const GuildeModerators = async ({ id_guilde }: { id_guilde: string }) => {
  const moderators = await getGuildeModerators(id_guilde);

  return (
    <div className="p-2 w-full h-fit flex flex-col gap-2 bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder rounded-md">
      <div className="text-lg font-semibold">
        <h4>Modérateur{moderators!.length > 1 && 's'} ({formatCount(moderators!.length)})</h4>
      </div>
      <div className="w-full flex flex-col gap-2">
        {moderators &&
          moderators.map((moderator: Moderator) => (
            <Button
              key={`${id_guilde}-moderator-${moderator.username}`}
              as={Link}
              className="p-2 bg-tempBgLightSecondary hover:bg-tempLightBorder/50 dark:bg-tempBgDarkSecondary dark:hover:bg-tempDarkHover shadow-none border border-tempLightBorder dark:border-tempDarkBorder text-sm rounded-md text-textDark dark:text-textLight !transition-all !duration-[125ms] h-auto"
              href={`/${moderator.username}`}
            >
              <div className="flex items-center justify-between gap-2 h-full w-full transition-all !duration-500">
                <div className="flex items-center">
                  <div className="flex items-center justify-center rounded-full">
                    <Avatar
                      src={moderator.avatar_url || ''}
                      className="rounded-full text-large transition-all w-[35px] h-[35px]"
                    />
                  </div>
                  <div className="flex flex-col ml-2 transition-all text-textDark dark:text-textLight">
                    <div className="text-sm">{moderator.username}</div>
                    <div className="text-[0.6rem] text-gray-600 dark:text-gray-400 transition-all">
                      {moderator.is_admin ? 'Créateur' : 'Modérateur'}
                    </div>
                  </div>
                </div>
              </div>
            </Button>
          ))}
      </div>
    </div>
  );
};

export default GuildeModerators;
