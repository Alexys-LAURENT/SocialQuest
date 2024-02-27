import { Select, SelectItem } from '@nextui-org/react';
import { Dispatch } from 'react';
import Image from 'next/image';
import { Guilde } from '@/app/types/entities';


const PostInputGuildsSelect = ({ setGuilde, guildesUser }: { setGuilde: Dispatch<string>, guildesUser: Guilde[] }) => {
    return (
        <Select
            aria-label='Guilde du post / Pas de guilde'
            name='Guilde du post / Pas de guilde'
            label="Guilde du post"
            variant='underlined'
            placeholder="Pas de guilde"
            className="w-full"
            classNames={{ trigger: "bg-transparent transition-all !duration-500 group-data-[focus=true]:bg-opacity-30 data-[hover=true]:bg-opacity-30 rounded-none", popoverContent: "h-44 bg-bgLight dark:bg-tempBgDark rounded-t-none border dark:border-tempDarkBorder border-tempLightBorder", selectorIcon: "text-textDark dark:text-textLight transition-all !duration-[250ms]" }}
            onChange={(e) => setGuilde(e.target.value)}
        >


            {guildesUser && guildesUser.map((guildeUser: Guilde) => (
                <SelectItem key={`${guildeUser.id_guilde}`} value={guildeUser.id_guilde} textValue={guildeUser.nom} className=' bg-bgLight dark:bg-tempBgDark'>
                    <div className="flex gap-2 items-center">
                        <Image alt={guildeUser.nom} className="flex-shrink-0 rounded-full aspect-square w-8 h-8" src={guildeUser.avatar_url!} width={20} height={20} />
                        <div className="flex flex-col">
                            <span className="text-small">{guildeUser.nom}</span>
                        </div>
                    </div>
                </SelectItem>
            ))}

        </Select>
    );
};

export default PostInputGuildsSelect;