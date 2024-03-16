'use client';
import { GuildePage } from '@/app/types/entities';
import { getGuildesNameWhereName } from '@/utils/getGuildesNameWhereName';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const CreateGuildWarForm = ({
  guilde,
  user,
  selectedGuild,
  setSelectedGuild,
}: {
  guilde: GuildePage;
  user: User;
  selectedGuild:
    | {
        nom: string;
        id_guilde: string;
        avatar_url: string;
      }
    | undefined;
  setSelectedGuild: Dispatch<
    SetStateAction<
      | {
          nom: string;
          id_guilde: string;
          avatar_url: string;
        }
      | undefined
    >
  >;
}) => {
  const [guildes, setGuildes] = useState<{ nom: string; id_guilde: string; avatar_url: string }[]>([]);
  const [inputValue, setInputValue] = useState('' as string);

  useEffect(() => {
    const getGuilds = async () => {
      const data = await getGuildesNameWhereName(inputValue, true, user.id);
      setGuildes(data as { nom: string; id_guilde: string; avatar_url: string }[]);
    };
    getGuilds();
  }, [inputValue, selectedGuild]);

  return (
    <div className="flex flex-col gap-10">
      <Autocomplete
        listboxProps={{ emptyContent: 'Aucune guilde trouvée' }}
        label="Guilde à affronter"
        placeholder="Rechercher une guilde"
        onInputChange={(newValue) => setInputValue(newValue)}
        onSelectionChange={(id_guilde) => setSelectedGuild(guildes.find((guild) => guild.id_guilde === id_guilde))}
      >
        {guildes.map((guild) => (
          <AutocompleteItem key={guild.id_guilde} value={guild.nom}>
            {guild.nom}
          </AutocompleteItem>
        ))}
      </Autocomplete>

      <div className="h-4/6 flex items-end mb-2 justify-around px-10 w-full ">
        <div className="flex flex-col gap-2 items-center justify-center">
          <Image src={guilde.avatar_url} className="w-20 h-20 rounded-full" alt="guild logo" width={50} height={50} />
          <p>{guilde.nom}</p>
        </div>
        <h2 className="text-2xl">VS</h2>
        <div className="flex flex-col gap-2 items-center justify-center">
          {selectedGuild && selectedGuild.avatar_url ? (
            <Image
              src={selectedGuild.avatar_url}
              className="w-20 h-20 rounded-full"
              alt="guild logo"
              width={50}
              height={50}
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-tempDarkHoverSecondary"></div>
          )}
          <p>{selectedGuild?.nom || '___'}</p>
        </div>
      </div>
    </div>
  );
};

export default CreateGuildWarForm;
