'use client'
import Link from "next/link";
import SearchBar from "@/components/NavBar/SearchBar";
import PopoverUser from "@/components/NavBar/PopoverUser";
import PopoverNotifications from "@/components/NavBar/PopoverNotifications";
import React, { useEffect, useContext, use } from "react";
import { NextReward, Profile } from "@/app/types/entities";
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

const NavBar = ({ user, nextRewards }: { user: Profile | null, nextRewards: NextReward[] | null }) => {
    const router = useRouter();
    const pathName = usePathname();
    const { showDrawer } = useContext(DrawerContext);
    const activePath = usePathname();
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error(error);
            return;
        }
        router.push("/")
        router.refresh()
    }

    const formatCount = (count: number) => {
        if (count >= 1000000) {
            return (Math.floor(count / 1000000 * 10) / 10).toFixed(1) + 'M'; // convert to M for number from > 1000000
        } else if (count >= 1000) {
            return (Math.floor(count / 100) / 10).toFixed(1) + 'k'; // convert to k for number from > 1000 
        } else {
            return count;
        }
    }

    const formatCountText = (count: number) => {
        let countStr = count.toString();
        let index = countStr.length - 3;
        while (index > 0) {
            countStr = countStr.substring(0, index) + ',' + countStr.substring(index);
            index -= 3;
        }
        return countStr;
    }

    return activePath !== "/login" ? (
        <Navbar maxWidth="2xl" className="py-2 bg-bgDark" position="sticky">
            <NavbarContent justify="start">
                <NavbarBrand className="hidden md:flex text-3xl font-bold">
                    <Link
                        href="/"
                        onClick={() => {
                            (pathName !== "/") ? router.push("/") : router.refresh()
                        }}
                    >
                        SOCIAL QUEST
                    </Link>
                </NavbarBrand>
                <NavbarItem className="flex md:hidden" onClick={() => showDrawer('NavMenu')}>
                    <Bars3Icon className="w-6 h-6 cursor-pointer" />
                </NavbarItem>
                <NavbarBrand className="md:hidden flex text-2xl font-bold">
                    <Link
                        href="/"
                        onClick={() => {
                            (pathName !== "/") ? router.push("/") : router.refresh()
                        }}
                    >
                        SQ
                    </Link>
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
                        <div className="flex gap-1" title={`${formatCountText(user.social_coins)} SocialCoins`}>
                            <img src="/assets/SocialCoin.png" className="h-4 w-4" alt="" />
                            <p className="text-xs">{formatCount(user.social_coins)}</p>
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
                            <PopoverNotifications user={user} />
                        </NavbarItem>
                        <NavbarItem>
                            <PopoverUser signOut={signOut} user={user} nextRewards={nextRewards} />
                        </NavbarItem>
                    </>
                ) : (
                    <NavbarItem>
                        <Button as={Link} color="primary" href="/login" variant="flat">
                            Connexion
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