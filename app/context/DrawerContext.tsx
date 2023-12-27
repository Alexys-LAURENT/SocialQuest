"use client"
import React, { createContext, useState } from 'react';
import { Drawer } from 'antd';
import PopOverUserContent from '@/components/NavBar/PopOverUserContent';
import { User } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';
import NavBarMenu from '@/components/NavBar/NavBarMenu';
import { XMarkIcon } from '@heroicons/react/24/outline';
type Content = "User" | "NavMenu";

// create a context
export const DrawerContext = createContext({
    showDrawer: (content: Content) => { },
});

// create a provider function
const DrawerProvider = ({ children, user }: { children: React.ReactNode, user: User | null }) => {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState<Content>("User");

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
        window.location.href = "/";
    }

    const showDrawer = (content: Content) => {
        setContent(content);
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <DrawerContext.Provider value={{ showDrawer }}>
            <Drawer
                contentWrapperStyle={{ height: "auto" }}
                closeIcon={<XMarkIcon className='w-6 h-6 text-textLight' />}
                title={content === "NavMenu" ? <p className='text-textLight'>Menu</p> : <></>}
                placement={content === "User" ? "bottom" : "left"}
                onClose={onClose} open={open}
                classNames={{ header: `${content === "User" ? "hidden" : "bg-bgDark text-textLight"}`, body: "bg-bgDark text-textLight", mask: "flex sm:hidden" }}
                className='flex sm:hidden'>

                {content === "User" && <PopOverUserContent customFunction={onClose} user={user} signOut={signOut} />}
                {content === "NavMenu" && <NavBarMenu customFunction={onClose} />}

            </Drawer>
            {children}
        </DrawerContext.Provider>
    );
};

export default DrawerProvider;