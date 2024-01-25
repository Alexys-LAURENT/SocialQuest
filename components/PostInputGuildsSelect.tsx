import { Select, SelectItem } from '@nextui-org/react';
import { Dispatch } from 'react';
import Image from 'next/image';


const PostInputGuildsSelect = ({ setGuilde, guildesUser }: { setGuilde: Dispatch<any>, guildesUser: any }) => {
    return (
        <Select
            label="Guilde"
            variant='underlined'
            placeholder="Pas de guilde"
            className="w-full"
            classNames={{ trigger: "bg-transparent transition-all !duration-500 group-data-[focus=true]:bg-opacity-30 data-[hover=true]:bg-opacity-30 rounded-none", popoverContent: "bg-bgLight dark:bg-bgDark", selectorIcon: "text-textDark dark:text-textLight transition-all !duration-[250ms]" }}
            onChange={(e) => setGuilde(e.target.value)}
        >


            {guildesUser && guildesUser.map((guildeUser: any) => (
                <SelectItem key={`${guildeUser.guildes.id_guilde}`} value={guildeUser.guildes.id_guilde} textValue={guildeUser.guildes.nom} className=' bg-bgLight dark:bg-bgDark'>
                    <div className="flex gap-2 items-center">
                        <Image alt={guildeUser.guildes.nom} className="flex-shrink-0 rounded-full aspect-square w-8 h-8" src={guildeUser.guildes.avatar_url!} width={20} height={20} />
                        <div className="flex flex-col">
                            <span className="text-small">{guildeUser.guildes.nom}</span>
                        </div>
                    </div>
                </SelectItem>
            ))}

        </Select>
    );
};

export default PostInputGuildsSelect;