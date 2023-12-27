'use client';
import PopOverUserContent from "./PopOverUserContent";
import React, { useState, useContext } from "react";
import { User } from "@supabase/supabase-js";
import { DrawerContext } from "@/app/context/DrawerContext";
import { Badge, Avatar, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

const PopoverUser = ({ signOut, user }: { signOut: () => void, user: User | null }) => {
    const [isPopoverUserOpen, setIsPopoverUserOpen] = useState(false);
    const { showDrawer, closeDrawer } = useContext(DrawerContext);

    return (
        <Popover id="PopoverUser" placement="bottom" offset={15} classNames={{ base: "hidden sm:flex w-[18.5rem]" }} isOpen={isPopoverUserOpen} onOpenChange={setIsPopoverUserOpen} shouldCloseOnBlur={false} onClose={() => closeDrawer()}
            shouldCloseOnInteractOutside={(e) => !(e as HTMLElement).classList.contains("ant-image-preview-wrap")
                && !(e as HTMLElement).classList.contains("ant-image-preview-img")
                && !(e as HTMLElement).classList.contains("ant-image-preview-close")
                && !(e as HTMLElement).parentElement?.classList.contains("anticon-close")
                && !(e as HTMLElement).parentElement?.parentElement?.classList.contains("anticon-close")}>
            <PopoverTrigger>
                <div className="flex items-center cursor-pointer" onClick={() => showDrawer("User")} >
                    <Badge content="5" color="primary" className="text-xs hidden sm:flex">
                        <Avatar isBordered src={user?.user_metadata?.avatar_url} className="cursor-pointer w-[2.75rem] h-[2.75rem] hidden sm:flex" />
                    </Badge>
                    {/* mobile : */}
                    <Badge content="5" color="primary" className="text-xs flex sm:hidden">
                        <Avatar isBordered src={user?.user_metadata?.avatar_url} className="cursor-pointer w-[2rem] h-[2rem] flex sm:hidden" />
                    </Badge>
                </div>
            </PopoverTrigger>
            <PopoverContent className="bg-[#3b3b3b]">
                <PopOverUserContent user={user} customFunction={() => setIsPopoverUserOpen(false)} signOut={signOut} />
            </PopoverContent>
        </Popover >
    );
};

export default PopoverUser;