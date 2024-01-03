'use client';
import React from 'react';
import { Tabs, Tab } from "@nextui-org/react";
import Link from 'next/link';
import { Profile } from '@/app/types/entities';

const TopTabs = ({ user }: { user: Profile }) => {
    return (
        <>
            <div className="hidden lg:flex">
                <div className="w-full flex flex-col min-h-[10rem]">
                    <div className="h-[80%] w-full bg-[#11100e] rounded-t-md">

                    </div>
                    <div className="h-[20%] w-full bg-[#1f1e1b] rounded-b-md">

                    </div>
                </div>
            </div>

            <div className="lg:hidden flex flex-col items-center justify-center">
                <Tabs aria-label="Options" defaultSelectedKey="NewPost" classNames={{ panel: 'px-0' }}>
                    <Tab key="NewPost" title="Nouveau post" className="w-full">
                        <div className="w-full h-full flex flex-col min-h-[10rem]">
                            <div className="h-[80%] w-full bg-[#11100e] rounded-t-md">

                            </div>
                            <div className="h-[20%] w-full bg-[#1f1e1b] rounded-b-md">

                            </div>
                        </div>
                    </Tab>
                    <Tab key="links" title="Liens" className="w-full">
                        <div className="w-full flex flex-col bg-[#11100e] rounded-md text-xl font-semibold h-fit">
                            <Link href={`/${user?.username}`} className='hover:bg-[#767676] hover:bg-opacity-75 py-1 px-2 rounded-md transition-all ease-in-out'>
                                Ma page
                            </Link>
                            <Link href={`#`} className='hover:bg-[#767676] hover:bg-opacity-75 py-1 px-2 rounded-md transition-all ease-in-out'>
                                Mes Compagnons
                            </Link>
                            <Link href={`#`} className='hover:bg-[#767676] hover:bg-opacity-75 py-1 px-2 rounded-md transition-all ease-in-out'>
                                Mes Guildes
                            </Link>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </>
    );
};

export default TopTabs;