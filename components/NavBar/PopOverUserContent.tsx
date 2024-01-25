// import { Image } from "antd";
import { NextReward, Profile } from "@/app/types/entities";
import { Progress } from '@nextui-org/react';
import { ArrowRightEndOnRectangleIcon, Cog8ToothIcon, CubeIcon, UserIcon, ClipboardDocumentCheckIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import SwitchTheme from "@/components/NavBar/SwitchTheme";
import { useEffect, useState } from "react";
import { getNextRewards } from "@/utils/getNextRewards";
import dynamic from "next/dynamic";
// import image from antd dynamicly
const Image = dynamic(() => import("antd").then((mod) => mod.Image));
const PreviewGroup = dynamic(() => import("antd").then((mod) => mod.Image.PreviewGroup));

const PopOverUserContent = ({ user, customFunction, signOut }: { user: Profile | null, customFunction: () => void, signOut: () => void }) => {
    const progressValue = (user?.xp! - user?.niveaux.xp_debut!) * 100 / (user?.niveaux.xp_fin! + 1);
    const [nextRewards, setNextRewards] = useState<NextReward[] | null>(null);

    useEffect(() => {
        const getRewards = async () => {
            if (user) {
                setNextRewards(await getNextRewards(user?.niveaux.libelle!));
            }
        }
        getRewards();
    }, [user])

    return (
        <div className="popOverUserContentWrapper w-full px-1 py-2 gap-2 flex flex-col text-textDark dark:text-textLight">
            <div className="levelWrapper">
                <div className="flex justify-between items-center transition-all !duration-[125ms]">
                    <div className="text-sm">Level {user?.niveaux.libelle!}</div>
                    <div className="text-sm">Level {user?.niveaux.libelle! + 1}</div>
                </div>
                <Progress aria-label="Level" value={progressValue} title={`${(user?.xp! - user?.niveaux.xp_debut!)} / ${user?.niveaux.xp_fin! + 1} xp`} classNames={{ track: "transition-all !duration-500" }} />
            </div>
            <div className="nextRewardsWrapper flex justify-end items-center gap-1 text-end text-[#979797]">
                {
                    nextRewards && nextRewards.length > 0 ? (
                        <>
                            <div className="text-sm text-[#777777] dark:text-[#919191]">Suivant : {nextRewards.length > 1 ? `${nextRewards.length} items` : nextRewards[0].items.nom}</div>
                            <div className="flex relative items-center justify-center rounded-md">
                                <PreviewGroup preview={{ toolbarRender: () => (<></>), }}
                                    items={nextRewards.reduce((acc: any, item: any) => { acc.push(item.items.image_url); return acc; }, [])}>

                                    <Image className="!h-7 w-auto aspect-auto rounded-md" src={nextRewards[0].items.image_url}
                                        alt={nextRewards[0].items.nom}></Image>

                                </PreviewGroup>
                            </div>
                        </>
                    ) :
                        (
                            <div className="w-8/12 h-7 bg-[#2B2B2B] animate-pulse rounded-md"></div>
                        )
                }

            </div>
            <div className="flex flex-col text-lg select-none">
                <Link
                    href={`/${user?.username}`}
                    className="px-1 py-1 flex gap-2 items-center dark:hover:bg-[#767676] hover:bg-[#e5e5e5] hover:bg-opacity-75 transition-all ease-in-out rounded-md"
                    onClick={() =>
                        customFunction()
                    }
                >
                    <UserIcon className="w-6 h-6 text-textDark dark:text-textLight transition-all !duration-[125ms]" />
                    <div className="text-textDark dark:text-textLight transition-all !duration-[125ms]">Profil</div>
                </Link>
                <Link
                    href={`/messages`}
                    className="px-1 py-1 flex gap-2 items-center dark:hover:bg-[#767676] hover:bg-[#e5e5e5] hover:bg-opacity-75 transition-all ease-in-out rounded-md"
                    onClick={() =>
                        customFunction()
                    }
                >
                    <div className="relative w-6 h-6 text-textDark dark:text-textLight transition-all !duration-[125ms]">
                        <PaperAirplaneIcon className="absolute w-6 h-6 bottom-[0.1rem] left-[0.12rem] -rotate-45" />
                    </div>
                    <div className="text-textDark dark:text-textLight transition-all !duration-[125ms]">Messages</div>
                </Link>
                <Link
                    href={`/missions`}
                    className="px-1 py-1 flex gap-2 items-center dark:hover:bg-[#767676] hover:bg-[#e5e5e5] hover:bg-opacity-75 transition-all ease-in-out rounded-md"
                    onClick={() =>
                        customFunction()
                    }
                >
                    <ClipboardDocumentCheckIcon className="w-6 h-6 text-textDark dark:text-textLight transition-all !duration-[125ms]" />
                    <div className="text-textDark dark:text-textLight transition-all !duration-[125ms]">Missions</div>
                </Link>
                <Link
                    href="/parametres"
                    className="px-1 py-1 flex gap-2 items-center dark:hover:bg-[#767676] hover:bg-[#e5e5e5] hover:bg-opacity-75 transition-all ease-in-out rounded-md"
                    onClick={() =>
                        customFunction()
                    }
                >
                    <Cog8ToothIcon className="w-6 h-6 text-textDark dark:text-textLight transition-all !duration-[125ms]" />
                    <div className="text-textDark dark:text-textLight transition-all !duration-[125ms]">Paramètres</div>
                </Link>
                <Link
                    href={`/${user?.username}/inventaire`}
                    className="px-1 py-1 flex gap-2 items-center dark:hover:bg-[#767676] hover:bg-[#e5e5e5] hover:bg-opacity-75 transition-all ease-in-out rounded-md"
                    onClick={() =>
                        customFunction()
                    }
                >
                    <CubeIcon className="w-6 h-6 text-textDark dark:text-textLight transition-all !duration-[125ms]" />
                    <div className="text-textDark dark:text-textLight transition-all !duration-[125ms]">Inventaire</div>
                </Link>

                <SwitchTheme user={user} />

                <Link
                    href="/"
                    className="px-1 py-1 flex gap-2 items-center dark:hover:bg-[#767676] hover:bg-[#e5e5e5] hover:bg-opacity-75 transition-all ease-in-out rounded-md cursor-pointer"
                    onClick={() => {
                        customFunction();
                        signOut();
                    }}
                >
                    <ArrowRightEndOnRectangleIcon className="w-6 h-6 text-textDark dark:text-textLight transition-all !duration-[125ms]" />
                    <div className="text-textDark dark:text-textLight transition-all !duration-[125ms]">Déconnexion</div>
                </Link>
            </div>
        </div>
    );
};

export default PopOverUserContent;