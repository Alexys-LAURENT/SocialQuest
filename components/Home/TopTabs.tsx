"use client"
import React from 'react';
import { Tabs, Tab } from "@nextui-org/react";
import Link from 'next/link';
import { Profile } from '@/app/types/entities';
import PostInput from '@/components/PostInput';

const TopTabs = ({ user, guildesUser }: { user: Profile | null, guildesUser: any }) => {
    return (
        <div className={`flex-col items-center justify-center ${!user && 'hidden'}`}>
            <Tabs aria-label="Options" defaultSelectedKey="NewPost" classNames={{ panel: 'px-0' }} className='lg:hidden flex justify-center items-center'>
                <Tab key="NewPost" title="Nouveau post" className="w-full lg:p-0 ">
                    {user && <PostInput index={true} guildesUser={guildesUser} />}
                </Tab>
                <Tab key="filtres" title="Filtres" className="w-full">
                    <div className="w-full flex flex-col bg-[#11100e] rounded-md text-xl font-semibold h-fit">
                        <Link href={`/${user ? user.username : 'login'}`} className='hover:bg-[#767676] hover:bg-opacity-75 py-1 px-2 rounded-md transition-all ease-in-out'>
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
    );
};

export default TopTabs;