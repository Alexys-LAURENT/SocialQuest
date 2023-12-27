import { Progress,Switch } from '@nextui-org/react';
import { User } from '@supabase/supabase-js';
import Image from "@/components/Image";
import { ArrowRightEndOnRectangleIcon, Cog8ToothIcon, CubeIcon, MoonIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";


const PopOverUserContent = ({user,customFunction,signOut}:{user:User|null, customFunction:()=>void,signOut:()=>void}) => {
    return (
        <div className="w-full px-1 py-2 gap-2 flex flex-col">
        <div>
            <div className="flex justify-between items-center">
                <div className="text-sm">Level 2</div>
                <div className="text-sm">Level 3</div>
            </div>
            <Progress aria-label="Level" value={60} className="max-w-md" />
        </div>
        <div className="flex justify-end items-center gap-1 text-end text-[#979797]">
            <div className="text-sm">Suivant : Bannière Squelettes</div>
            <div className="flex relative h-9 items-center justify-center rounded-md">
                <Image
                    src="/assets/Dragon.png"
                    alt="Bannière Squelettes"
                />
            </div>
        </div>
        <div className="flex flex-col text-lg select-none">
            <Link
                href={`/${user?.user_metadata?.username}`}
                className="px-1 py-1 flex gap-2 items-center hover:bg-[#767676] hover:bg-opacity-75 transition-all ease-in-out rounded-md"
                onClick={() => 
                    customFunction()
                }
            >
                <UserIcon className="w-6 h-6" />
                <div className="">Profil</div>
            </Link>
            <Link
                href="/parametres"
                className="px-1 py-1 flex gap-2 items-center hover:bg-[#767676] hover:bg-opacity-75 transition-all ease-in-out rounded-md"
                onClick={() => 
                    customFunction()
                }
            >
                <Cog8ToothIcon className="w-6 h-6" />
                <div className="">Paramètres</div>
            </Link>
            <Link
                href="/inventaire"
                className="px-1 py-1 flex gap-2 items-center hover:bg-[#767676] hover:bg-opacity-75 transition-all ease-in-out rounded-md"
                onClick={() => 
                    customFunction()
                }
            >
                <CubeIcon className="w-6 h-6" />
                <div className="">Inventaire</div>
            </Link>
            <div className="flex justify-between">
                <div className="px-1 py-1 flex gap-2 items-center">
                    <MoonIcon className="w-6 h-6" />
                    <div className="">Mode sombre</div>
                </div>
                <div className="flex items-center">
                    <Switch aria-label="Mode sombre" classNames={{ wrapper: "mr-1 bg-[#d9d9d9]" }} />
                </div>
            </div>
            <div
                className="px-1 py-1 flex gap-2 items-center hover:bg-[#767676] hover:bg-opacity-75 transition-all ease-in-out rounded-md cursor-pointer"
                onClick={() => {
                    customFunction();
                    signOut();
                }}
            >
                <ArrowRightEndOnRectangleIcon className="w-6 h-6" />
                <div className="">Déconnexion</div>
            </div>
        </div>
    </div>
    );
};

export default PopOverUserContent;