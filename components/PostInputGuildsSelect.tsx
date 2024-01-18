import { Select, SelectItem } from '@nextui-org/react';
import React, { Dispatch } from 'react';
import Image from 'next/image';


const PostInputGuildsSelect = ({ setGuilde, guildesUser }: { setGuilde: Dispatch<any>, guildesUser: any }) => {
    return (
        <Select
            label="Guilde"
            variant='underlined'
            placeholder="Pas de guilde"
            className="w-full"
            classNames={{ trigger: "bg-transparent group-data-[focus=true]:bg-opacity-30 data-[hover=true]:bg-opacity-30 rounded-none", popoverContent: "bg-[#11100e]" }}
            onChange={(e) => setGuilde(e.target.value)}
        >


            {guildesUser && guildesUser.map((guildeUser: any) => (
                <SelectItem key={guildeUser.guildes.id_guilde} value={guildeUser.guildes.id_guilde} textValue={guildeUser.guildes.nom}>
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