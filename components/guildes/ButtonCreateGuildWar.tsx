'use client';
import { Button } from '@nextui-org/react';
import { useContext } from 'react';
import { ModalGuildsWarsContext } from '@/app/context/ModalGuildsWarsContext';
const ButtonCreateGuildWar = ({ isPossible }: { isPossible: boolean }) => {
  const { showCreateGuildWar } = useContext(ModalGuildsWarsContext);
  return (
    <Button className="customButton !w-full !text-medium" onClick={showCreateGuildWar} disabled={!isPossible}>
      {isPossible ? 'Demander un combat de guilde' : 'Vous avez déjà demandé un combat de guilde ce mois-ci'}
    </Button>
  );
};

export default ButtonCreateGuildWar;
