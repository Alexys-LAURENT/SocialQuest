"use client"
import { createContext, useEffect, useState } from 'react';
import { NextReward, Profile } from '@/app/types/entities';
import { createBrowserClient } from '@supabase/ssr';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { getNextRewards } from '@/utils/getNextRewards';
import dynamic from 'next/dynamic';
type Content = "User" | "NavMenu";

// create a context
export const DrawerContext = createContext({
    showDrawer: (content: Content) => { },
    closeDrawer: () => { },
});

const PopOverUserContent = dynamic(() => import('@/components/NavBar/PopOverUserContent'));
const NavBarMenu = dynamic(() => import('@/components/NavBar/NavBarMenu'));
const Drawer = dynamic(() => import('antd').then((mod) => mod.Drawer));

// create a provider function
const DrawerProvider = ({ children, user }: { children: React.ReactNode, user: Profile | null }) => {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState<Content>("User");
    const [nextRewards, setNextRewards] = useState<NextReward[] | null>(null);
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
        window.location.href = "/";
    }

    const showDrawer = (content: Content) => {
        setContent(content);
        setOpen(true);
    };

    const closeDrawer = () => {
        setOpen(false);
    };

    useEffect(() => {
        const getRewards = async () => {
            if (user) {
                setNextRewards(await getNextRewards(user?.niveaux.libelle!));
            }
        }
        getRewards();
    }, [user])

    return (
        <DrawerContext.Provider value={{ showDrawer, closeDrawer }}>
            {
                <Drawer
                    styles={{ wrapper: { height: "auto" } }}
                    closeIcon={<XMarkIcon className='w-6 h-6 text-textDark dark:text-textLight' />}
                    title={content === "NavMenu" ? <p className='text-textDark dark:text-textLight'>Menu</p> : <></>}
                    placement={content === "User" ? "bottom" : "left"}
                    onClose={closeDrawer} open={open}
                    classNames={{ header: `${content === "User" ? "!hidden" : "bg-bgLight dark:bg-tempBgDark text-textDark dark:text-textLight transition-all !duration-400"}`, body: "bg-bgLight dark:bg-tempBgDark text-textDark dark:text-textLight transition-all !duration-400", mask: `flex ${content === "User" ? "sm:hidden" : "md:hidden"}` }}
                    className={`flex  ${content === "User" ? "sm:hidden" : "md:hidden"}`}>

                    {content === "User" && <PopOverUserContent customFunction={closeDrawer} user={user} signOut={signOut} />}
                    {content === "NavMenu" && <NavBarMenu customFunction={closeDrawer} />}

                </Drawer>
            }
            {children}
        </DrawerContext.Provider >
    );
};

export default DrawerProvider;