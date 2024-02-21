import { useEffect, useState } from "react";
import { Badge } from "@nextui-org/react";
import { BellIcon } from "@heroicons/react/24/outline";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { Profile } from "@/app/types/entities";
import { getUserNotifications } from "@/utils/getUserNotifications";
import { createClient } from "@/utils/supabase/client";
import { readUserNotifications } from "@/utils/readUserNotifications";
import { Notification } from "@/app/types/entities";
import dynamic from 'next/dynamic';

const DynamicNotificationsListBox = dynamic(() => import('@/components/NavBar/NotificationsListBox'))

const PopoverNotifications = ({ user }: { user: Profile }) => {
    const [notifications, setNotifications] = useState<Notification[] | null>(null);
    const [notificationsNotRead, setNotificationsNotRead] = useState<Notification[]>([]);
    const supabase = createClient();
    useEffect(() => {
        getNotifications();

        const notificationsChannel = supabase.channel(`notifications:${user.id_user}`)
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'notifications', filter: `id_user=eq.${user.id_user}` },
                (payload) => {
                    getNotifications()
                }
            )
            .subscribe()
        return () => {
            notificationsChannel.unsubscribe()
        }
    }
        , []);

    async function getNotifications() {
        const data = await getUserNotifications(user.id_user);
        if (data !== false) {
            setNotifications(data);
            setNotificationsNotRead(data.filter((notification: Notification) => notification.is_read === false));
        }
    }

    return (
        <Popover placement="bottom" offset={20} classNames={{ base: " w-[18.5rem]" }} onClose={() => notificationsNotRead.length > 0 && readUserNotifications(user.id_user)}>
            <PopoverTrigger>
                <div className="flex items-center cursor-pointer">
                    <Badge content={notificationsNotRead.length} color="danger" className={`text-xs`} classNames={{ badge: `${notificationsNotRead.length > 0 ? "" : "opacity-0"}` }}>
                        <BellIcon className="w-6 h-6 text-textDark dark:text-textLight !duration-[125ms]" />
                    </Badge>
                </div>
            </PopoverTrigger>
            <PopoverContent className="bg-white dark:bg-tempBgDark border rounded-md border-white/30 transition-all !duration-500 max-h-[300px] overflow-y-auto">

                {
                    notifications ?
                        (
                            <DynamicNotificationsListBox notifications={notifications} />
                        )
                        :
                        (
                            <div className="w-full flex flex-col gap-3 py-3">
                                <div className="w-full h-7 rounded-md animate-pulse bg-bgDarkSecondary/60"></div>
                                <div className="w-full h-7 rounded-md animate-pulse bg-bgDarkSecondary/60"></div>
                                <div className="w-full h-7 rounded-md animate-pulse bg-bgDarkSecondary/60"></div>
                                <div className="w-full h-7 rounded-md animate-pulse bg-bgDarkSecondary/60"></div>

                            </div>
                        )
                }
            </PopoverContent>
        </Popover >
    );
};

export default PopoverNotifications;

