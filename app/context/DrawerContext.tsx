"use client"
import React, { createContext, useState } from 'react';
import { Profile } from '@/app/types/entities';
import { Drawer } from 'antd';
import PopOverUserContent from '@/components/NavBar/PopOverUserContent';
import { createBrowserClient } from '@supabase/ssr';
import NavBarMenu from '@/components/NavBar/NavBarMenu';
import { XMarkIcon } from '@heroicons/react/24/outline';
type Content = "User" | "NavMenu";

// create a context
export const DrawerContext = createContext({
    showDrawer: (content: Content) => { },
    closeDrawer: () => { },
});

// create a provider function
const DrawerProvider = ({ children, user }: { children: React.ReactNode, user: Profile | null }) => {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState<Content>("User");

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

    return (
        <DrawerContext.Provider value={{ showDrawer, closeDrawer }}>
            <Drawer
                contentWrapperStyle={{ height: "auto" }}
                closeIcon={<XMarkIcon className='w-6 h-6 text-textLight' />}
                title={content === "NavMenu" ? <p className='text-textLight'>Menu</p> : <></>}
                placement={content === "User" ? "bottom" : "left"}
                onClose={closeDrawer} open={open}
                classNames={{ header: `${content === "User" ? "hidden" : "bg-bgDark text-textLight"}`, body: "bg-bgDark text-textLight", mask: `flex ${content === "User" ? "sm:hidden" : "md:hidden"}` }}
                className={`flex  ${content === "User" ? "sm:hidden" : "md:hidden"}`}>

                {content === "User" && <PopOverUserContent customFunction={closeDrawer} user={user} signOut={signOut} />}
                {content === "NavMenu" && <NavBarMenu customFunction={closeDrawer} />}

            </Drawer>
            {children}
        </DrawerContext.Provider >
    );
};

export default DrawerProvider;