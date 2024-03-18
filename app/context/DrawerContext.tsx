"use client"
import { createContext, useLayoutEffect, useState } from 'react';
import { Profile } from '@/app/types/entities';
import { createBrowserClient } from '@supabase/ssr';
import { XMarkIcon } from '@heroicons/react/24/outline';
import PopOverUserContent from '@/components/NavBar/PopOverUserContent';
import NavBarMenu from '@/components/NavBar/NavBarMenu';
import { Drawer } from 'antd';
type Content = "User" | "NavMenu";

// create a context
export const DrawerContext = createContext({
    showDrawer: (content: Content) => { },
    closeDrawer: () => { },
    open: false,
});

// create a provider function
const DrawerProvider = ({ children, user }: { children: React.ReactNode, user: Profile | null }) => {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState<Content>("User");
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useLayoutEffect(() => {
        setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
    }, []);

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

    const showDrawer = (content: Content) => {
        setContent(content);
        setOpen(true);
    };

    const closeDrawer = () => {
        setOpen(false);
    };

    const handleDrawerDrag = (e: React.PointerEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
        e.preventDefault();
        const drawerUser = document.querySelector('.drawerUser') as HTMLElement;
        drawerUser.style.transition = 'transform 0.1s ease-out'; // Add transition
        const startY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        const handleDrag = (e: PointerEvent | TouchEvent) => {
            const currentY = 'touches' in e ? e.touches[0].clientY : e.clientY;
            const translateY = currentY - startY;
            if (translateY < 0) return; // Prevent dragging above the original position
            drawerUser.style.transform = `translateY(${translateY}px)`;
        };
        const handleDrop = (e: PointerEvent | TouchEvent) => {
            const currentY = 'changedTouches' in e ? e.changedTouches[0].clientY : e.clientY;
            const windowHeight = window.innerHeight;
            if (windowHeight - currentY < 200) {
                closeDrawer();
                setTimeout(() => {
                    drawerUser.style.transform = `translateY(0)`;
                }, 400);
            } else {
                drawerUser.style.transform = `translateY(0)`;
            }
            window.removeEventListener('touchmove', handleDrag);
            window.removeEventListener('touchend', handleDrop);
        };

        window.addEventListener('touchmove', handleDrag);
        window.addEventListener('touchend', handleDrop);
    };

    return (
        <DrawerContext.Provider value={{ showDrawer, closeDrawer, open }}>
            {
                <Drawer
                    styles={{ wrapper: { height: "auto" } }}
                    closeIcon={<XMarkIcon className='w-6 h-6 text-textDark dark:text-textLight' />}
                    title={content === "NavMenu" ? <p className='text-textDark dark:text-textLight'>Menu</p> : <></>}
                    placement={content === "User" ? "bottom" : "left"}
                    onClose={closeDrawer} open={open}
                    classNames={{ header: `${content === "User" ? "!hidden" : "bg-bgLight dark:bg-tempBgDark text-textDark dark:text-textLight transition-all !duration-400"}`, body: "relative border-t-2 border-t-tempLightBorder dark:border-t-tempDarkBorder bg-bgLight dark:bg-tempBgDark text-textDark dark:text-textLight transition-all !duration-400", mask: `flex ${content === "User" ? "sm:hidden" : "md:hidden"}` }}
                    className={`flex ${content === "User" ? "sm:hidden drawerUser" : "md:hidden"}`}>

                    {content === "User" && user && (
                        <>
                            {isTouchDevice &&
                                <div
                                    className="absolute w-full -top-2 h-9 left-0 justify-center items-center flex sm:hidden"
                                >
                                    <div
                                        className="absolute bg-neutral-500 w-20 h-2 rounded-full"
                                        onTouchStart={(e) => {
                                            handleDrawerDrag(e);
                                        }}
                                        onClick={() => {
                                            closeDrawer();
                                        }}
                                    />
                                </div>
                            }
                            <PopOverUserContent customFunction={closeDrawer} user={user} signOut={signOut} />
                        </>
                    )}
                    {content === "NavMenu" && <NavBarMenu customFunction={closeDrawer} user={user} />}

                </Drawer>
            }
            {children}
        </DrawerContext.Provider >
    );
};

export default DrawerProvider;