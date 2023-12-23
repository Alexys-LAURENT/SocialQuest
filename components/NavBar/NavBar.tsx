'use client';
import React, { useState } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { User } from "@supabase/supabase-js";
import { Image, Switch } from "@nextui-org/react";
import { Badge } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { Progress } from "@nextui-org/react";
import { ArrowRightEndOnRectangleIcon, ArrowsPointingInIcon, ArrowsPointingOutIcon, BellIcon, BuildingStorefrontIcon, Cog8ToothIcon, CubeIcon, MagnifyingGlassIcon, MoonIcon, UserIcon } from "@heroicons/react/24/outline";
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
        <Navbar maxWidth="xl" className="py-2 bg-[#0a0a0a]">
            <NavbarContent justify="start">
                <NavbarBrand className="hidden md:flex text-3xl font-bold">
                    SOCIAL QUEST
                </NavbarBrand>
                <NavbarBrand className="md:hidden flex text-3xl font-bold">
                    SQ
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
                    <BuildingStorefrontIcon className="w-6 h-6" />
                </NavbarItem>
                {!user ? (
                    <>
                        <NavbarItem className="flex items-center">
                            <Badge content="5" color="danger" className="text-xs">
                                <BellIcon className="w-6 h-6" />
                            </Badge>
                        </NavbarItem>
                        <NavbarItem>
                            <Popover placement="bottom" classNames={{ base: "w-[18.5rem]" }} >
                                <Badge content="5" color="primary" className="text-xs">
                                    <PopoverTrigger>
                                        <Avatar isBordered src="https://i.pravatar.cc/150?u=a042581f4e29026024d" className="cursor-pointer w-[2.75rem] h-[2.75rem]" />
                                    </PopoverTrigger>
                                </Badge>
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
                                            <div className="relative">
                                                <Image
                                                    id="NextRewardImage"
                                                    className="sticky rounded-md h-full w-full transition-all ease-in-out transform"
                                                    src="/assets/Squelettes.png"
                                                    alt="Bannière Squelettes"
                                                    width={60}
                                                    height={60}
                                                />
                                                <div id="NextRewardImageToggle" className="absolute w-full h-full left-0 bottom-0 z-10 hover:bg-[#000000] opacity-0 hover:opacity-100 hover:bg-opacity-75 transition-all ease-in-out rounded-md cursor-pointer transform">
                                                    <div className="flex justify-center items-center h-full"
                                                        onClick={() => {
                                                            const RewardImage = document.getElementById("NextRewardImage") as HTMLImageElement;
                                                            const ExpandNextRewardImage = document.getElementById("ExpandNextRewardImage") as HTMLElement;
                                                            const ShrinkNextRewardImage = document.getElementById("ShrinkNextRewardImage") as HTMLElement;
                                                            const NextRewardImageToggle = document.getElementById("NextRewardImageToggle") as HTMLElement;
                                                            RewardImage.classList.toggle("scale-[4.94]");
                                                            RewardImage.classList.toggle("translate-x-[-173%]");
                                                            RewardImage.classList.toggle("translate-y-[42%]");
                                                            RewardImage.classList.toggle("rounded-md");
                                                            RewardImage.classList.toggle("rounded-sm");
                                                            ShrinkNextRewardImage.classList.toggle("transform");
                                                            NextRewardImageToggle.classList.toggle("translate-y-[-150%]");
                                                            NextRewardImageToggle.classList.toggle("translate-x-[20%]");
                                                            NextRewardImageToggle.classList.toggle("bg-[#000000]");
                                                            NextRewardImageToggle.classList.toggle("bg-opacity-75");
                                                            NextRewardImageToggle.classList.toggle("opacity-0");
                                                            ExpandNextRewardImage.classList.toggle("hidden");
                                                            ShrinkNextRewardImage.classList.toggle("hidden");
                                                        }}
                                                    >
                                                        <div className="text-sm">
                                                            <ArrowsPointingOutIcon id="ExpandNextRewardImage" className="w-6 h-6" />
                                                            <ArrowsPointingInIcon id="ShrinkNextRewardImage" className="w-6 h-6 hidden" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 text-lg select-none">
                                            <Link
                                                href="/profil"
                                                className="px-1 flex gap-2 items-center hover:bg-[#767676] hover:bg-opacity-75 transition-all ease-in-out rounded-md"
                                            >
                                                <UserIcon className="w-6 h-6" />
                                                <div className="">Profil</div>
                                            </Link>
                                            <Link
                                                href="/parametres"
                                                className="px-1 flex gap-2 items-center hover:bg-[#767676] hover:bg-opacity-75 transition-all ease-in-out rounded-md"
                                            >
                                                <Cog8ToothIcon className="w-6 h-6" />
                                                <div className="">Paramètres</div>
                                            </Link>
                                            <Link
                                                href="/inventaire"
                                                className="px-1 flex gap-2 items-center hover:bg-[#767676] hover:bg-opacity-75 transition-all ease-in-out rounded-md"
                                            >
                                                <CubeIcon className="w-6 h-6" />
                                                <div className="">Inventaire</div>
                                            </Link>
                                            <div className="flex justify-between">
                                                <div className="px-1 flex gap-2 items-center">
                                                    <MoonIcon className="w-6 h-6" />
                                                    <div className="">Mode sombre</div>
                                                </div>
                                                <div className="flex items-center">
                                                    <Switch aria-label="Mode sombre" classNames={{ wrapper: "mr-1 bg-[#d9d9d9]" }} />
                                                </div>
                                            </div>
                                            <Link
                                                href="/deconnexion"
                                                className="px-1 flex gap-2 items-center hover:bg-[#767676] hover:bg-opacity-75 transition-all ease-in-out rounded-md"
                                            >
                                                <ArrowRightEndOnRectangleIcon className="w-6 h-6" />
                                                <div className="">Déconnexion</div>
                                            </Link>
                                        </div>
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