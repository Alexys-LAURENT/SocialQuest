'use client';
import { Button } from '@nextui-org/react';
import { useContext } from 'react';
import { ModalGuildsWarsContext } from '@/app/context/ModalGuildsWarsContext';
const ButtonCreateGuildWar = ({ isPossible }: { isPossible: boolean }) => {
  const { showCreateGuildWar } = useContext(ModalGuildsWarsContext);
  return (
    <Button className="customButton !text-tiny !w-full sm:!text-medium" onClick={showCreateGuildWar} disabled={!isPossible}>
      <span className='max-w-[685px] overflow-hidden text-ellipsis break-all'>{isPossible ? 'Demander un combat de guilde' : 'Vous avez déjà demandé un combat de guilde ce mois-ci'}</span>
    </Button>
  );
};

export default ButtonCreateGuildWar;
