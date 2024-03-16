import { getGuildWarsByGuildId } from '@/utils/getGuildWarsByGuildId';
import ButtonCreateGuildWar from './ButtonCreateGuildWar';
import { GuildePage } from '@/app/types/entities';
import GuildWarsAccordion from './GuildWarsAccordion';
import moment from 'moment';
import { User } from '@supabase/supabase-js';

const GuildWarsSuspenser = async ({ guilde, user }: { guilde: GuildePage; user: User | null }) => {
  const guildWars = await getGuildWarsByGuildId(guilde!.id_guilde, guilde!.created_by === user?.id);
  const myGuildWars = guildWars.filter(
    (guildWar) => guildWar.guild_who_asked_infos.id_guilde === guilde!.id_guilde && guildWar.status === 'En attente',
  );
  const otherGuildWars = guildWars.filter(
    (guildWar) => guildWar.guild_who_received_infos.id_guilde === guilde!.id_guilde && guildWar.status === 'En attente',
  );
  const guildWarsEnCours = guildWars.filter((guildWar) => guildWar.status === 'En cours');
  const guildWarsTermines = guildWars.filter((guildWar) => guildWar.status === 'Terminé');

  // filter before
  const filteredGuildWars = guildWars.filter((guildWar) => {
    return guildWar.guild_who_asked_infos.id_guilde === guilde!.id_guilde;
  });


  //   map all guildWars to check if the user have already asked for a guildWar in the current month by using momentjs
  const isPossible = filteredGuildWars.length > 0 ? !filteredGuildWars
    .map((guildWar) => {
      const date = moment(guildWar.requested_at);
      return date.month() === moment().month() && date.year() === moment().year();
    })
    .includes(true) : true;


  return (
    <>
      {guilde.created_by === user?.id && <ButtonCreateGuildWar isPossible={isPossible} />}

      <div className="w-full flex flex-col gap-4">
        <GuildWarsAccordion
          myGuildWars={myGuildWars}
          otherGuildWars={otherGuildWars}
          guildWarsEnCours={guildWarsEnCours}
          guildWarsTermines={guildWarsTermines}
          user={user}
          guilde={guilde}
        />
      </div>
    </>
  );
};

export default GuildWarsSuspenser;
