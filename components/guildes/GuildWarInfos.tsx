'use client';

import { ModalGuildsWarsContext } from '@/app/context/ModalGuildsWarsContext';
import { Chip, Divider } from '@nextui-org/react';
import Image from 'next/image';
import { useContext } from 'react';
const GuildWarInfos = () => {
  const { guildWar } = useContext(ModalGuildsWarsContext);
  if (!guildWar) return null;
  const guildWarGains = [guildWar.item_1, guildWar.item_2, guildWar.item_3, guildWar.item_4, guildWar.item_5].filter(
    (item) => item !== null,
  );

  return (
    <div className="flex flex-col gap-10 items-center">
      <div className="h-4/6 flex items-end mb-2 justify-around px-10 w-full ">
        <div className="flex flex-col gap-2 items-center justify-center">
          <Image
            src={guildWar.guild_who_asked_infos.avatar_url}
            className="w-20 h-20 rounded-full"
            alt="guild logo"
            width={50}
            height={50}
          />
          <p>{guildWar.guild_who_asked_infos.nom}</p>
        </div>
        <h2 className="text-2xl">VS</h2>
        <div className="flex flex-col gap-2 items-center justify-center">
          <Image
            src={guildWar.guild_who_received_infos.avatar_url}
            className="w-20 h-20 rounded-full"
            alt="guild logo"
            width={50}
            height={50}
          />

          <p>{guildWar.guild_who_received_infos.nom}</p>
        </div>
      </div>
      <Divider />
      <p className="text-center text-xl font-bold">Récompenses :</p>
      {guildWarGains.map((item, i) => (
        <div key={i} className="flex flex-row gap-4 items-center">
          <Image src={item!.image_url} alt={item!.nom} width={50} height={50} />
          <p>{item!.nom}</p>
          <Chip>{item!.rarete}</Chip>
        </div>
      ))}
    </div>
  );
};

export default GuildWarInfos;
