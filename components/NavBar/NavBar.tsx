'use client'
import Link from "next/link";
import SearchBar from "@/components/NavBar/SearchBar";
import PopoverUser from "@/components/NavBar/PopoverUser";
import PopoverNotifications from "@/components/NavBar/PopoverNotifications";
import React, { useEffect, useContext } from "react";
import { Profile } from "@/app/types/entities";
import { Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { createBrowserClient } from '@supabase/ssr'
import { DrawerContext } from "@/app/context/DrawerContext";
import { BuildingStorefrontIcon, MagnifyingGlassIcon, Bars3Icon } from "@heroicons/react/24/outline";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

const NavBar = ({ user }: { user: Profile | null }) => {
    const router = useRouter();
    const pathName = usePathname();
    const { showDrawer } = useContext(DrawerContext);
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

    const formatCount = (count: number) => {
        if (count >= 1000000) {
            return (Math.floor(count / 1000000 * 10) / 10).toFixed(1) + 'M'; // convert to M for number from > 1000000
        } else if (count >= 1000) {
            return (Math.floor(count / 100) / 10).toFixed(1) + 'k'; // convert to k for number from > 1000 
        } else {
            return count;
        }
    }

    return activePath !== "/login" ? (
        <Navbar maxWidth="2xl" className="py-2 z-[100001] bg-bgDark" position="sticky">
            <NavbarContent justify="start">
                <NavbarBrand className="hidden md:flex text-3xl font-bold">
                    <span className="cursor-pointer"
                        onClick={() => {
                            (pathName !== "/") ? router.push("/") : router.refresh()
                        }}
                    >
                        SOCIAL QUEST
                    </span>
                </NavbarBrand>
                <NavbarItem className="md:hidden flex" onClick={() => showDrawer('NavMenu')}>
                    <Bars3Icon className="w-6 h-6 cursor-pointer" />
                </NavbarItem>
                <NavbarBrand className="md:hidden flex text-2xl font-bold">
                    <span className="cursor-pointer"
                        onClick={() => {
                            (usePathname() !== "/") ? router.push("/") : router.refresh()
                        }}
                    >
                        SQ
                    </span>
                </NavbarBrand>
                <NavbarItem>
                    <MagnifyingGlassIcon className="flex sm:hidden w-6 h-6" />
                </NavbarItem>
            </NavbarContent>


            <NavbarContent className="w-full max-w-2xl sm:px-8 xl:px-0" justify="center">
                <NavbarItem className="hidden sm:flex w-full">
                    <SearchBar />
                </NavbarItem>
            </NavbarContent>


            <NavbarContent justify="end" className="">
                {user && (
                    <NavbarItem className="flex min-w-fit items-center rounded-md px-1 sm:px-2 py-1 bg-secondary/30">
                        <div className="flex gap-1">
                            <img src="/assets/Solidium.png" className="h-4 w-4" alt="" />
                            <p className="text-xs">{formatCount(user.social_coin)}</p>
                        </div>
                    </NavbarItem>
                )}
                <NavbarItem className="hidden md:flex">
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