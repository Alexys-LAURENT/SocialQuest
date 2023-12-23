'use client';
import React, { useState } from "react";
import Link from "next/link";
import PopoverUser from "@/components/NavBar/PopoverUser";
import PopoverNotifications from "@/components/NavBar/PopoverNotifications";
import { User } from "@supabase/supabase-js";
import { Button } from "@nextui-org/react";
import { BuildingStorefrontIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
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
        <Navbar maxWidth="xl" className="py-2 bg-[#0a0a0a]" position="static">
            <NavbarContent justify="start">
                <NavbarBrand className="hidden md:flex text-3xl font-bold">
                    <Link
                        href="/"
                    >
                        SOCIAL QUEST
                    </Link>
                </NavbarBrand>
                <NavbarBrand className="md:hidden flex text-3xl font-bold">
                    <Link
                        href="/"
                    >
                        SQ
                    </Link>
                </NavbarBrand>
                <NavbarItem>
                    <MagnifyingGlassIcon className="flex md:hidden w-6 h-6" />
                </NavbarItem>
            </NavbarContent>


            <NavbarContent className="w-full max-w-2xl md:px-8 xl:px-0" justify="center">
                <NavbarItem className="hidden md:flex w-full">
                    <SearchBar />
                </NavbarItem>
            </NavbarContent>


            <NavbarContent justify="end">
                <NavbarItem>
                    <Link
                        href="/shop"
                    >
                        <BuildingStorefrontIcon className="w-6 h-6" />
                    </Link>
                </NavbarItem>
                {!user ? (
                    <>
                        <NavbarItem className="flex items-center">
                            <PopoverNotifications />
                        </NavbarItem>
                        <NavbarItem>
                            <PopoverUser />
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