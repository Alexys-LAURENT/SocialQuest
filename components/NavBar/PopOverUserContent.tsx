import { Image } from "antd";
import { NextReward, Profile } from "@/app/types/entities";
import { Progress, Switch } from '@nextui-org/react';
import { ArrowRightEndOnRectangleIcon, Cog8ToothIcon, CubeIcon, MoonIcon, UserIcon, ClipboardDocumentCheckIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Link from "next/link";


const PopOverUserContent = ({ user, customFunction, signOut, nextRewards }: { user: Profile | null, customFunction: () => void, signOut: () => void, nextRewards: NextReward[] | null }) => {
    const progressValue = (user?.xp! - user?.niveaux.xp_debut!) * 100 / (user?.niveaux.xp_fin! + 1);


    return (
        <div className="w-full px-1 py-2 gap-2 flex flex-col">
            <div>
                <div className="flex justify-between items-center">
                    <div className="text-sm">Level {user?.niveaux.libelle!}</div>
                    <div className="text-sm">Level {user?.niveaux.libelle! + 1}</div>
                </div>
                <Progress aria-label="Level" value={progressValue} title={`${(user?.xp! - user?.niveaux.xp_debut!)} / ${user?.niveaux.xp_fin! + 1} xp`} />
            </div>
            <div className="flex justify-end items-center gap-1 text-end text-[#979797]">
                {
                    nextRewards && (
                        <>
                            <div className="text-sm">Suivant : {nextRewards.length > 1 ? `${nextRewards.length} items` : nextRewards[0].items.nom}</div>
                            <div className="flex relative items-center justify-center rounded-md">
                                <Image.PreviewGroup preview={{ toolbarRender: () => (<></>), }}
                                    items={nextRewards.reduce((acc: any, item: any) => { acc.push(item.items.image_url); return acc; }, [])}>

                                    <Image className="h-7 w-auto aspect-auto rounded-md" src={nextRewards[0].items.image_url}
                                        alt={nextRewards[0].items.nom}></Image>

                                </Image.PreviewGroup>
                            </div>
                        </>
                    )
                }

            </div>
            <div className="flex flex-col text-lg select-none">
                <Link
                    href={`/${user?.username}`}
                    className="px-1 py-1 flex gap-2 items-center hover:bg-[#767676] hover:bg-opacity-75 transition-all ease-in-out rounded-md"
                    onClick={() =>
                        customFunction()
                    }
                >
                    <UserIcon className="w-6 h-6" />
                    <div className="">Profil</div>
                </Link>
                <Link
                    href={`/messages`}
                    className="px-1 py-1 flex gap-2 items-center hover:bg-[#767676] hover:bg-opacity-75 transition-all ease-in-out rounded-md"
                    onClick={() =>
                        customFunction()
                    }
                >
                    <div className="relative w-6 h-6">
                        <PaperAirplaneIcon className="absolute w-6 h-6 bottom-[0.1rem] left-[0.12rem] -rotate-45" />
                    </div>
                    <div className="">Messages</div>
                </Link>
                <Link
                    href={`/missions`}
                    className="px-1 py-1 flex gap-2 items-center hover:bg-[#767676] hover:bg-opacity-75 transition-all ease-in-out rounded-md"
                    onClick={() =>
                        customFunction()
                    }
                >
                    <ClipboardDocumentCheckIcon className="w-6 h-6" />
                    <div className="">Missions</div>
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
                <Link
                    href="#"
                    className="px-1 py-1 flex gap-2 items-center hover:bg-[#767676] hover:bg-opacity-75 transition-all ease-in-out rounded-md cursor-pointer"
                    onClick={() => {
                        customFunction();
                        signOut();
                    }}
                >
                    <ArrowRightEndOnRectangleIcon className="w-6 h-6" />
                    <div className="">Déconnexion</div>
                </Link>
            </div>
        </div>
    );
};

export default PopOverUserContent;