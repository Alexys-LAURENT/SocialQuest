'use client';
import PopOverUserContent from "@/components/NavBar/PopOverUserContent";
import React, { useState, useContext } from "react";
import { NextReward, Profile } from "@/app/types/entities";
import { DrawerContext } from "@/app/context/DrawerContext";
import { Badge, Avatar, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import Image from "next/image";
import defaultUser from "@/public/assets/defaultUser.svg";

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
                <div className="flex items-center cursor-pointer min-w-[32px] sm:min-w-[44px]" onClick={() => showDrawer("User")} >
                    <Badge content={user?.niveaux.libelle} color="primary" className="text-xs flex">
                        <Image src={user?.avatar_url || defaultUser.src} alt={user?.avatar_url! || defaultUser.src} width={48} height={48} className="relative inline-flex shrink-0 justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-tiny bg-default text-default-foreground w-[2rem] h-[2rem] sm:w-[2.75rem] sm:h-[2.75rem] rounded-full ring-2 ring-offset-2 ring-offset-background dark:ring-offset-background-dark ring-default" />
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