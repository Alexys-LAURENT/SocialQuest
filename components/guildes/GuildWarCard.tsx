'use client';
import { Button, Chip, Progress } from '@nextui-org/react';
import { useContext } from 'react';
import { ModalGuildsWarsContext } from '@/app/context/ModalGuildsWarsContext';
import { GuildWar } from '@/app/types/entities';
import Image from 'next/image';
import { respondToGuildWar } from '@/utils/respondToGuildWar';
import { ToasterContext } from '@/app/context/ToasterContext';
import { useRouter } from 'next/navigation';

const GuildWarCard = ({ guildWar, to_answer }: { guildWar: GuildWar; to_answer: boolean }) => {
  const { showGuildWarsInfo } = useContext(ModalGuildsWarsContext);
  const { success, error } = useContext(ToasterContext);
  const router = useRouter();
  const handleRespondGuildWar = async (reponse: 'accept' | 'refuse') => {
    const isResponded = await respondToGuildWar(reponse, guildWar.id_guild_war);
    if (isResponded) {
      success('Votre réponse a bien été enregistrée');
      router.refresh();
    } else {
      error('Une erreur est survenue');
    }
  };

  return (
    <div
      onClick={() => showGuildWarsInfo(guildWar)}
      className="cursor-pointer w-full flex flex-col h-[150px] bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder rounded-md"
    >
      <div className="h-4/6 flex items-end mb-2 justify-around px-10 w-full ">
        <div className="flex flex-col gap-2 items-center justify-center">
          <Image
            src={guildWar.guild_who_asked_infos.avatar_url}
            alt={`avatar-${guildWar.guild_who_asked_infos.nom}`}
            width={50}
            height={50}
          />
          <p>{guildWar.guild_who_asked_infos.nom}</p>
        </div>
        <div className="flex flex-col h-full  items-center justify-around">
          {!to_answer && <Chip>{guildWar.status}</Chip>}
          {to_answer && (
            <div className="flex gap-4">
              <Button
                className="customButton bg-secondary/70 border-secondary text-white"
                onClick={() => handleRespondGuildWar('accept')}
              >
                Accepter
              </Button>
              <Button
                className="customButton bg-danger/70 border-danger text-white"
                onClick={() => handleRespondGuildWar('refuse')}
              >
                Refuser
              </Button>
            </div>
          )}
          <h2>VS</h2>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <Image
            src={guildWar.guild_who_received_infos.avatar_url}
            alt={`avatar-${guildWar.guild_who_received_infos.nom}`}
            width={50}
            height={50}
          />
          <p>{guildWar.guild_who_received_infos.nom}</p>
        </div>
      </div>
      <div className="h-2/6 w-full flex items-center justify-center ">
        <Progress value={50} className="max-w-md" />
      </div>
    </div>
  );
};

export default GuildWarCard;
