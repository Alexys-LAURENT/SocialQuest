'use client'
import Link from "next/link";
import SearchBar from "@/components/NavBar/SearchBar";
import PopoverUser from "@/components/NavBar/PopoverUser";
import PopoverNotifications from "@/components/NavBar/PopoverNotifications";
import { useContext } from "react";
import { Profile } from "@/app/types/entities";
import { Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { createBrowserClient } from '@supabase/ssr'
import { DrawerContext } from "@/app/context/DrawerContext";
import { BuildingStorefrontIcon, MagnifyingGlassIcon, Bars3Icon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import SocialQuestLogo from "@/public/assets/SocialQuestLogoNoBg.png";
import { formatCount } from "@/utils/formatCount";
import { formatCountText } from "@/utils/formatCountText";


import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out', error)
            return;
        }
        window.location.href = "/";
    }

    return activePath !== "/login" && activePath !== "/resetPassword" ? (
        <Navbar maxWidth="2xl" className="py-2 bg-bgLight dark:bg-tempBgDark transition-all !duration-500" position="sticky" classNames={{ wrapper: "px-4 sm:px-6" }}>
            <NavbarContent justify="start">
                <NavbarItem className="flex md:hidden" onClick={() => showDrawer('NavMenu')}>
                    <Bars3Icon className="w-6 h-6 cursor-pointer text-textDark dark:text-textLight transition-all !duration-[125ms]" />
                </NavbarItem>
                <NavbarItem>
                    <NavbarBrand className="text-3xl font-bold text-textDark dark:text-textLight transition-all !duration-[150ms]">
                        <Link
                            href="/"
                            aria-label="HomePage"
                            onClick={() => {
                                (pathName !== "/") ? router.push("/") : router.refresh()
                            }}
                            className="w-max border-1 border-transparent invert dark:invert-0 rounded-[0.65rem] transition-all !duration-[150ms]"
                        >
                            <Image src={SocialQuestLogo.src} alt="SocialQuest Logo" width={40} height={40} />
                        </Link>
                    </NavbarBrand>
                </NavbarItem>
                <NavbarItem>
                    <MagnifyingGlassIcon className="flex sm:hidden w-6 h-6 text-textDark dark:text-textLight" />
                </NavbarItem>
            </NavbarContent>


            <NavbarContent className="w-full max-w-2xl sm:px-8 xl:px-0" justify="center">
                <NavbarItem className="hidden sm:flex w-full">
                    <SearchBar />
                </NavbarItem>
            </NavbarContent>


            <NavbarContent justify="end">
                {user && (
                    <NavbarItem className="hidden sm:flex min-w-fit items-center rounded-md px-1 sm:px-2 py-1 bg-secondary/30">
                        <div className="flex gap-1" title={`${formatCountText(user.social_coins)} SocialCoins`}>
                            <img src="/assets/SocialCoin.png" className="h-4 w-4" alt="" />
                            <p className="text-xs text-textDark dark:text-textLight transition-all !duration-[125ms]">{formatCount(user.social_coins)}</p>
                        </div>
                    </NavbarItem>
                )}
                <NavbarItem className="hidden md:flex">
                    <Link
                        href="/shop"
                        aria-label="Boutique"
                    >
                        <BuildingStorefrontIcon className="w-6 h-6 text-textDark dark:text-textLight transition-all !duration-500 hover:!duration-250 hover:opacity-60" />
                    </Link>
                </NavbarItem>
                {user ? (
                    <>
                        <NavbarItem className="flex items-center">
                            <PopoverNotifications user={user} />
                        </NavbarItem>
                        <NavbarItem>
                            <Link
                                href={`/messages`}
                                className="items-center"
                            >
                                <PaperAirplaneIcon className="w-6 h-6 mb-1 -rotate-45 text-textDark dark:text-textLight !duration-[125ms] hover:opacity-60" />
                            </Link>
                        </NavbarItem>
                        <NavbarItem className="min-w-[32px]">
                            <PopoverUser signOut={signOut} user={user} />
                        </NavbarItem>
                    </>
                ) : (
                    <NavbarItem>
                        <Button as={Link} href="/login" variant="flat" className="customButton bg-secondary/70 border-secondary text-textLight">
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