'use client';
import React, { useState } from "react";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { Badge } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { BellIcon, BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import SearchBar from "@/components/NavBar/SearchBar";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem
} from "@nextui-org/react";

const NavBar = ({ user }: { user: User | null }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <Navbar maxWidth="xl" className="py-2">
            <NavbarContent justify="start">
                <NavbarBrand className="hidden sm:flex text-3xl font-bold">
                    SOCIAL QUEST
                </NavbarBrand>
                <NavbarBrand className="sm:hidden flex text-3xl font-bold">
                    SQ
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="w-full max-w-2xl px-8 xl:px-0" justify="center">
                <NavbarItem className="w-full">
                    <SearchBar />
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    <BuildingStorefrontIcon className="w-6 h-6" />
                </NavbarItem>
                {user ? (
                    <>
                        <NavbarItem className="flex items-center">
                            <Badge content="5" color="danger" className="text-xs">
                                <BellIcon className="w-6 h-6" />
                            </Badge>
                        </NavbarItem>
                        <NavbarItem>
                            <Popover placement="bottom">
                                <Badge content="5" color="primary" className="text-xs">
                                    <PopoverTrigger>
                                        <Avatar isBordered src="https://i.pravatar.cc/150?u=a042581f4e29026024d" className="cursor-pointer w-[2.75rem] h-[2.75rem]" />
                                    </PopoverTrigger>
                                </Badge>
                                <PopoverContent>
                                    <div className="px-1 py-2">
                                        <div className="text-small font-bold">Popover Content</div>
                                        <div className="text-tiny">This is the popover content</div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </NavbarItem>
                    </>
                ) : (
                    <NavbarItem>
                        <Button as={Link} color="primary" href="#" variant="flat">
                            Login
                        </Button>
                    </NavbarItem>
                )}
            </NavbarContent>
        </Navbar >
    );
}

export default NavBar;