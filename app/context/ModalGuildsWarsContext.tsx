'use client';
import { useDisclosure } from '@nextui-org/react';
import { createContext, useState } from 'react';
import { GuildWar } from '../types/entities';

export const ModalGuildsWarsContext = createContext({
  isOpen: false,
  showCreateGuildWar: () => {},
  showGuildWarsInfo: (GuildWar: GuildWar) => {},
  guildWar: null as GuildWar | null,
  content: 'create' as 'create' | 'info',
  onOpenChange: () => {},
});

export default function ModalGuildsWarsProvider({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [content, setContent] = useState<'create' | 'info'>('create');
  const [guildWar, setGuildWar] = useState<GuildWar | null>(null);

  const showCreateGuildWar = () => {
    setContent('create');
    onOpen();
  };

  const showGuildWarsInfo = (GuildWar: GuildWar) => {
    setContent('info');
    setGuildWar(GuildWar);
    onOpen();
  };

  return (
    <ModalGuildsWarsContext.Provider
      value={{ isOpen, showCreateGuildWar, showGuildWarsInfo, guildWar, content, onOpenChange }}
    >
      {children}
    </ModalGuildsWarsContext.Provider>
  );
}
