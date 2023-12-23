import Link from "next/link";
import React, { useState } from "react";
import { Badge } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { Progress } from "@nextui-org/react";
import { Image, Switch } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { ArrowRightEndOnRectangleIcon, ArrowsPointingInIcon, ArrowsPointingOutIcon, Cog8ToothIcon, CubeIcon, MoonIcon, UserIcon } from "@heroicons/react/24/outline";

const PopoverUser = () => {
    const [isPopoverUserOpen, setIsPopoverUserOpen] = useState(false);

    return (
        <Popover id="PopoverUser" placement="bottom" offset={15} classNames={{ base: "w-[18.5rem]" }} isOpen={isPopoverUserOpen} onOpenChange={setIsPopoverUserOpen}>
            <PopoverTrigger>
                <div className="flex items-center cursor-pointer">
                    <Badge content="5" color="primary" className="text-xs">
                        <Avatar isBordered src="https://i.pravatar.cc/150?u=a042581f4e29026024d" className="cursor-pointer w-[2.75rem] h-[2.75rem]" />
                    </Badge>
                </div>
            </PopoverTrigger>
            <PopoverContent className="bg-[#3b3b3b]">
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
                        <div className="flex relative h-9 items-center justify-center">
                            {/* <Image
                                                    id="NextRewardImage"
                                                    className="sticky rounded-md h-full max-h-10 w-full transition-all ease-in-out transform"
                                                    src="/assets/Lee.png"
                                                    alt="Bannière Squelettes"
                                                    width={60}
                                                    height={60}
                                                /> */}
                            <Image
                                id="NextRewardImage"
                                className="sticky rounded-md h-full transition-all ease-in-out transform"
                                classNames={{ wrapper: "h-full" }}
                                src="/assets/Dragon.png"
                                alt="Bannière Squelettes"
                            />
                            <div id="NextRewardImageToggle" className="flex items-center justify-center absolute w-full h-full left-0 bottom-0 z-10 hover:bg-[#000000] opacity-0 hover:opacity-100 hover:bg-opacity-75 transition-all ease-in-out rounded-md cursor-pointer transform"
                                onClick={() => {
                                    const RewardImage = document.getElementById("NextRewardImage") as HTMLImageElement;
                                    const ExpandNextRewardImage = document.getElementById("ExpandNextRewardImage") as HTMLElement;
                                    const ShrinkNextRewardImage = document.getElementById("ShrinkNextRewardImage") as HTMLElement;
                                    const NextRewardImageToggle = document.getElementById("NextRewardImageToggle") as HTMLElement;
                                    RewardImage.classList.toggle("scale-[4.6]");
                                    RewardImage.classList.toggle("translate-x-[-160%]");
                                    RewardImage.classList.toggle("translate-y-[35%]");
                                    RewardImage.classList.toggle("rounded-md");
                                    RewardImage.classList.toggle("rounded-sm");
                                    ShrinkNextRewardImage.classList.toggle("transform");
                                    NextRewardImageToggle.classList.toggle("translate-y-[-135%]");
                                    NextRewardImageToggle.classList.toggle("translate-x-[10%]");
                                    NextRewardImageToggle.classList.toggle("bg-[#000000]");
                                    NextRewardImageToggle.classList.toggle("bg-opacity-75");
                                    NextRewardImageToggle.classList.toggle("opacity-0");
                                    ExpandNextRewardImage.classList.toggle("hidden");
                                    ShrinkNextRewardImage.classList.toggle("hidden");
                                }}>
                                <div className="flex justify-center items-center h-full"

                                >
                                    <div className="text-sm">
                                        <ArrowsPointingOutIcon id="ExpandNextRewardImage" className="w-6 h-6" />
                                        <ArrowsPointingInIcon id="ShrinkNextRewardImage" className="w-6 h-6 hidden" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col text-lg select-none">
                        <Link
                            href="/profil"
                            className="px-1 py-1 flex gap-2 items-center hover:bg-[#767676] hover:bg-opacity-75 transition-all ease-in-out rounded-md"
                            onClick={() => {
                                setIsPopoverUserOpen(false);
                            }}
                        >
                            <UserIcon className="w-6 h-6" />
                            <div className="">Profil</div>
                        </Link>
                        <Link
                            href="/parametres"
                            className="px-1 py-1 flex gap-2 items-center hover:bg-[#767676] hover:bg-opacity-75 transition-all ease-in-out rounded-md"
                            onClick={() => {
                                setIsPopoverUserOpen(false);
                            }}
                        >
                            <Cog8ToothIcon className="w-6 h-6" />
                            <div className="">Paramètres</div>
                        </Link>
                        <Link
                            href="/inventaire"
                            className="px-1 py-1 flex gap-2 items-center hover:bg-[#767676] hover:bg-opacity-75 transition-all ease-in-out rounded-md"
                            onClick={() => {
                                setIsPopoverUserOpen(false);
                            }}
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
                            href="/deconnexion"
                            className="px-1 py-1 flex gap-2 items-center hover:bg-[#767676] hover:bg-opacity-75 transition-all ease-in-out rounded-md"
                            onClick={() => {
                                setIsPopoverUserOpen(false);
                            }}
                        >
                            <ArrowRightEndOnRectangleIcon className="w-6 h-6" />
                            <div className="">Déconnexion</div>
                        </Link>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default PopoverUser;