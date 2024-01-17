'use client';
import PopOverUserContent from "./PopOverUserContent";
import React, { useState, useContext } from "react";
import { NextReward, Profile } from "@/app/types/entities";
import { DrawerContext } from "@/app/context/DrawerContext";
import { Badge, Avatar, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

const PopoverUser = ({ signOut, user, nextRewards }: { signOut: () => void, user: Profile | null, nextRewards: NextReward[] | null }) => {
    const [isPopoverUserOpen, setIsPopoverUserOpen] = useState(false);
    const { showDrawer, closeDrawer } = useContext(DrawerContext);

    return (
        <Popover id="PopoverUser" placement="bottom" offset={15} classNames={{ base: "hidden sm:flex w-[18.5rem]" }} isOpen={isPopoverUserOpen} onOpenChange={setIsPopoverUserOpen} shouldCloseOnBlur={false} onClose={() => closeDrawer()}
            shouldCloseOnInteractOutside={(e) => !(e as HTMLElement).classList.contains("ant-image-preview-wrap")
                && !(e as HTMLElement).classList.contains("ant-image-preview-img")
                && !(e as HTMLElement).classList.contains("ant-image-preview-close")
                && !(e as HTMLElement).parentElement?.classList.contains("anticon-close")
                && !(e as HTMLElement).parentElement?.parentElement?.classList.contains("anticon-close")
                && !(e as HTMLElement).classList.contains("ant-image-preview-switch-right")
                && !(e as HTMLElement).classList.contains("ant-image-preview-switch-left")
                && !(e as HTMLElement).parentElement?.classList.contains("ant-image-preview-switch-right")
                && !(e as HTMLElement).parentElement?.classList.contains("ant-image-preview-switch-left")
                && !(e as HTMLElement).parentElement?.parentElement?.classList.contains("ant-image-preview-switch-right")
                && !(e as HTMLElement).parentElement?.parentElement?.classList.contains("ant-image-preview-switch-left")} >
            <PopoverTrigger>
                <div className="flex items-center cursor-pointer" onClick={() => showDrawer("User")} >
                    <Badge content={user?.niveaux.libelle} color="primary" className="text-xs flex">
                        <Avatar isBordered src={user?.avatar_url} className="cursor-pointer w-[2rem] h-[2rem] sm:w-[2.75rem] sm:h-[2.75rem] flex" />
                    </Badge>
                </div>
            </PopoverTrigger>
            <PopoverContent className="bg-[#3b3b3b]">
                <PopOverUserContent user={user} customFunction={() => {
                    setIsPopoverUserOpen(false);
                    closeDrawer();
                }} signOut={signOut} nextRewards={nextRewards} />
            </PopoverContent>
        </Popover >
    );
};

export default PopoverUser;