'use client'
import Link from "next/link";
import SearchBar from "@/components/NavBar/SearchBar";
import PopoverUser from "@/components/NavBar/PopoverUser";
import PopoverNotifications from "@/components/NavBar/PopoverNotifications";
import React, { useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { createBrowserClient } from '@supabase/ssr'
import { BuildingStorefrontIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem
} from "@nextui-org/react";

const NavBar = ({ user }: { user: User | null }) => {
    const activePath = usePathname();

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const signOut = async () => {
        console.log("signOut");
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error(error);
            return;
        }
        window.location.reload();
    }

    useEffect(() => {
        if (activePath === "/login") {
            document.getElementsByTagName("main")[0].classList.remove("h-[calc(100vh-5rem)]");
            document.getElementsByTagName("main")[0].classList.add("h-screen");
        } else {
            document.getElementsByTagName("main")[0].classList.remove("h-screen");
            document.getElementsByTagName("main")[0].classList.add("h-[calc(100vh-5rem)]");
        }
    }, []);

    return activePath !== "/login" ? (
        <Navbar maxWidth="xl" className="py-2 bg-bgDark" position="static">
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
                {user ? (
                    <>
                        <NavbarItem className="flex items-center">
                            <PopoverNotifications />
                        </NavbarItem>
                        <NavbarItem>
                            <PopoverUser signOut={signOut} user={user} />
                        </NavbarItem>
                    </>
                ) : (
                    <NavbarItem>
                        <Button as={Link} color="primary" href="/login" variant="flat">
                            Login
                        </Button>
                    </NavbarItem>
                )}
            </NavbarContent>
        </Navbar >
    ) : (
        <>
        </>
    );
}

export default NavBar;