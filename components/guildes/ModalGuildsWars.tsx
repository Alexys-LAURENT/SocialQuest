'use client';
import { useContext, useState } from 'react';
import { ModalGuildsWarsContext } from '@/app/context/ModalGuildsWarsContext';
import { Button, Chip } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import CreateGuildWarForm from './CreateGuildWarForm';
import { GuildePage } from '@/app/types/entities';
import { User } from '@supabase/supabase-js';
import createGuildWar from '@/utils/createGuildWar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import GuildWarInfos from './GuildWarInfos';
const DynamicModal = dynamic(() => import('@nextui-org/react').then((mod) => mod.Modal));
const DynamicModalContent = dynamic(() => import('@nextui-org/react').then((mod) => mod.ModalContent));
const DynamicModalBody = dynamic(() => import('@nextui-org/react').then((mod) => mod.ModalBody));
const DynamicModalFooter = dynamic(() => import('@nextui-org/react').then((mod) => mod.ModalFooter));

const ModalGuildsWars = ({ guilde, user }: { guilde: GuildePage; user: User }) => {
  const router = useRouter();
  const { isOpen, onOpenChange, content } = useContext(ModalGuildsWarsContext);
  const [selectedGuild, setSelectedGuild] = useState<{ nom: string; id_guilde: string; avatar_url: string }>();
  const [guildWarGains, setGuildWarGains] = useState<
    {
      nom: string;
      rarete: string;
      image_url: string;
    }[]
  >();

  const handleCreateGuildWar = async () => {
    if (!selectedGuild) return;
    const newGuildWarGains = await createGuildWar(guilde.id_guilde, selectedGuild.id_guilde);
    if (!newGuildWarGains) return console.error('error createGuildWar');
    setGuildWarGains(newGuildWarGains);
  };

  const handleClose = (onClose: any) => {
    setSelectedGuild(undefined);
    setGuildWarGains(undefined);
    onClose();
    router.refresh();
  };

  return (
    <>
      <DynamicModal
        classNames={{
          base: 'm-0 border-b-none sm:border-md bg-tempBgLightSecondary dark:bg-tempBgDark rounded-md border border-tempLightBorder dark:border-tempDarkBorder',
        }}
        closeButton={<></>}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
      >
        <DynamicModalContent>
          {(onClose) => (
            <>
              <DynamicModalBody className="md:mt-10">
                {content === 'create' && (
                  <CreateGuildWarForm
                    guilde={guilde}
                    user={user}
                    selectedGuild={selectedGuild}
                    setSelectedGuild={setSelectedGuild}
                  />
                )}
                {content === 'create' && guildWarGains && (
                  <div className="flex flex-col gap-4">
                    <p className="text-center text-xl font-bold">Récompenses :</p>
                    <div className="flex flex-col gap-4">
                      {guildWarGains.map((item, i) => (
                        <div key={i} className="flex flex-row gap-4 items-center">
                          <Image src={item.image_url} alt={item.nom} width={50} height={50} />
                          <p>{item.nom}</p>
                          <Chip>{item.rarete}</Chip>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {content === 'info' && <GuildWarInfos />}
              </DynamicModalBody>
              <DynamicModalFooter>
                {!guildWarGains && (
                  <Button className="customButton bg-tempLightBorder dark:bg-tempDarkBorder" onPress={onClose}>
                    Fermer
                  </Button>
                )}

                {content === 'create' && !guildWarGains && (
                  <Button
                    className="customButton bg-secondary/70 border-secondary !text-white "
                    onPress={() => handleCreateGuildWar()}
                  >
                    Demander un combat
                  </Button>
                )}

                {content === 'create' && guildWarGains && (
                  <Button
                    className="customButton bg-secondary/70 border-secondary !text-white "
                    onPress={() => handleClose(onClose)}
                  >
                    Valider
                  </Button>
                )}
              </DynamicModalFooter>
            </>
          )}
        </DynamicModalContent>
      </DynamicModal>
    </>
  );
};

export default ModalGuildsWars;
