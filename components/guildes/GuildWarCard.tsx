'use client';
import { Button, Chip, Progress } from '@nextui-org/react';
import { useContext } from 'react';
import { ModalGuildsWarsContext } from '@/app/context/ModalGuildsWarsContext';
import { GuildWar } from '@/app/types/entities';
import Image from 'next/image';
import { respondToGuildWar } from '@/utils/respondToGuildWar';
import { ToasterContext } from '@/app/context/ToasterContext';
import { useRouter } from 'next/navigation';
import Crown from '@/public/assets/crown.png';
import { formatCount } from '@/utils/formatCount';

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

  const sumDamage = (participations: any[]) => {
    return participations.reduce((sum, participation) => {
      if (!participation.items) return sum;
      return sum + participation.items.reduce((itemSum: any, item: any) => {
        if (!item || typeof item.damage !== 'number') return itemSum;
        return itemSum + item.damage;
      }, 0);
    }, 0);
  }

  const damageGuildWhoAsk = sumDamage(guildWar.participationsGuildWhoAsk);
  const damageGuildWhoReceived = sumDamage(guildWar.participationsGuildWhoReceived);

  const totalDamage = damageGuildWhoAsk + damageGuildWhoReceived;
  const percentage = damageGuildWhoAsk === damageGuildWhoReceived ? 50 : totalDamage > 0 ? (damageGuildWhoAsk / totalDamage) * 100 : 0;

  return (
    <div
      onClick={() => showGuildWarsInfo(guildWar)}
      className="px-10 cursor-pointer w-full flex flex-col h-[150px] bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder rounded-md"
    >
      <div className="flex items-end mb-3 justify-around w-full pt-6">
        <div className="relative flex flex-col gap-2 items-center justify-center">
          <Image
            src={guildWar.guild_who_asked_infos.avatar_url}
            alt={`avatar-${guildWar.guild_who_asked_infos.nom}`}
            width={50}
            height={50}
          />
          <p>{guildWar.guild_who_asked_infos.nom}</p>
          <Image
            className={`absolute rotate-[25deg] -right-2 -top-4 ${percentage <= 50 ? 'hidden' : ''}`}
            src={Crown.src}
            alt="crown"
            width={40}
            height={40}
          />
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
        <div className="relative flex flex-col gap-2 items-center justify-center">
          <Image
            src={guildWar.guild_who_received_infos.avatar_url}
            alt={`avatar-${guildWar.guild_who_received_infos.nom}`}
            width={50}
            height={50}
          />
          <p>{guildWar.guild_who_received_infos.nom}</p>
          <Image
            className={`absolute rotate-[25deg] -right-2 -top-4 ${percentage >= 50 ? 'hidden' : ''}`}
            src={Crown.src}
            alt="crown"
            width={40}
            height={40}
          />
        </div>
      </div>
      <div className="w-full flex items-center justify-center ">
        <Progress value={percentage} className="max-w-md" classNames={{ labelWrapper: 'relative', label: 'absolute -bottom-2 left-0 text-tiny', value: 'absolute -bottom-2 right-0 text-tiny', track: 'bg-red-500', indicator: 'rounded-r-none' }} disableAnimation showValueLabel label={`${formatCount(damageGuildWhoAsk)} dégat${damageGuildWhoAsk > 1 ? 's' : ''}`} valueLabel={`${formatCount(damageGuildWhoReceived)} dégat${damageGuildWhoReceived > 1 ? 's' : ''}`} />
      </div>
    </div>
  );
};

export default GuildWarCard;
