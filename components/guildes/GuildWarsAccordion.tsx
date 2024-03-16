'use client';
import { GuildWar, GuildePage } from '@/app/types/entities';
import { Accordion, AccordionItem } from '@nextui-org/react';
import GuildWarCard from './GuildWarCard';
import { User } from '@supabase/supabase-js';

const GuildWarsAccordion = ({
  myGuildWars,
  otherGuildWars,
  guildWarsEnCours,
  guildWarsTermines,
  user,
  guilde,
}: {
  myGuildWars: GuildWar[];
  otherGuildWars: GuildWar[];
  guildWarsEnCours: GuildWar[];
  guildWarsTermines: GuildWar[];
  user: User | null;
  guilde: GuildePage;
}) => {
  let sections = [
    {
      key: 'guildWarsEnCours',
      title: 'Combats en cours',
      data: guildWarsEnCours,
      noDataMessage: 'Aucun combat de guilde en cours',
    },
    {
      key: 'guildWarsTermines',
      title: 'Combats terminés',
      data: guildWarsTermines,
      noDataMessage: 'Aucun combat de guilde terminé',
    },
  ];

  if (guilde.created_by === user?.id) {
    sections.push({
      key: 'myGuildWars',
      title: 'Mes demandes',
      data: myGuildWars,
      noDataMessage: "Vous n'avez pas fait de demande de combat de guilde",
    });
    sections.push({
      key: 'otherGuildWars',
      title: 'Demandes reçues',
      data: otherGuildWars,
      noDataMessage: "Vous n'avez pas reçu de demande de combat de guilde",
    });
  }

  return (
    <Accordion>
      {sections.map((section, i) => (
        <AccordionItem key={section.key} aria-label={section.key} title={section.title}>
          <div className="w-full flex flex-col gap-4">
            {section.data && section.data.length > 0 ? (
              section.data.map((guildWar, i) => (
                <GuildWarCard key={i} guildWar={guildWar} to_answer={section.key === 'otherGuildWars'} />
              ))
            ) : (
              <div className="w-full flex items-center justify-center">
                <p className="text-large font-semibold text-tempTextSecondary dark:text-tempDarkTextSecondary">
                  {section.noDataMessage}
                </p>
              </div>
            )}
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default GuildWarsAccordion;
