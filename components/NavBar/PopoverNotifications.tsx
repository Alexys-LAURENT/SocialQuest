import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardBody, CardFooter, CardHeader, Image, Listbox, ListboxItem, Skeleton } from "@nextui-org/react";
import { Badge } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { BellIcon } from "@heroicons/react/24/outline";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { Profile } from "@/app/types/entities";
import { getUserNotifications } from "@/utils/getUserNotifications";
import moment from "moment";
import { createClient } from "@/utils/supabase/client";
import { readUserNotifications } from "@/utils/readUserNotifications";
import { Notification } from "@/app/types/entities";
const PopoverNotifications = ({ user }: { user: Profile }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
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
            setNotificationsNotRead(data.filter((notification: any) => notification.is_read === false));
        }
    }

    return (
        <Popover placement="bottom" offset={20} classNames={{ base: " w-[18.5rem]" }} onClose={() => notificationsNotRead.length > 0 && readUserNotifications(user.id_user)}>
            <PopoverTrigger >
                <div className="flex items-center cursor-pointer">
                    <Badge content={notificationsNotRead.length} color="danger" className={`text-xs`} classNames={{ badge: `${notificationsNotRead.length > 0 ? "" : "opacity-0"}` }}>
                        <BellIcon className="w-6 h-6" />
                    </Badge>
                </div>
            </PopoverTrigger>
            <PopoverContent className="bg-[#3b3b3b] max-h-[300px] overflox-y-auto">

                {
                    notifications && notifications.length > 0 ?
                        (

                            <Listbox
                                items={notifications}
                                aria-label="Dynamic Actions"
                                classNames={{ base: "max-h-[250px] overflow-y-auto" }}
                            >
                                {(item: Notification) => (
                                    <ListboxItem
                                        classNames={{ title: "max-w-full w-full whitespace-normal mb-1", base: `data-[hover=true]:bg-darkSecondary/40 ${item.link ? "data-[hover=true]:cursor-pointer" : "data-[hover=true]:cursor-default"}` }}
                                        key={item.id_notification}
                                        description={"Il y a " + moment(item.created_at).locale('fr').fromNow().split("ago")[0]}
                                    >
                                        <LinkOrNot theLink={item.link}>
                                            <div className="flex gap-2 w-full">
                                                {
                                                    item.image_url &&
                                                    <div className=" min-w-[40px] flex items-center">
                                                        <Image src={item.image_url} alt={item.titre} width={40} height={40} className="rounded-full w-10 h-10 aspect-square" />
                                                    </div>
                                                }
                                                <div className="flex flex-col w-full">
                                                    <div className="w-full flex relative">
                                                        <span className="break-words text-sm w-[calc(100%-20px)]">{item.titre}</span>
                                                        {
                                                            item.is_read === false &&
                                                            <span className="w-[10px] h-[10px] absolute top-0 right-0 rounded-full bg-blue-500 animate-pulse"></span>
                                                        }
                                                    </div>
                                                    <span className="break-words text-xs font-extralight">{item.message}</span>
                                                </div>
                                            </div>
                                        </LinkOrNot>
                                    </ListboxItem>
                                )}
                            </Listbox>
                        )
                        :
                        (
                            <div className="w-full flex flex-col gap-3 py-3">
                                <div className="w-full h-7 rounded-md animate-pulse bg-darkSecondary/60"></div>
                                <div className="w-full h-7 rounded-md animate-pulse bg-darkSecondary/60"></div>
                                <div className="w-full h-7 rounded-md animate-pulse bg-darkSecondary/60"></div>
                                <div className="w-full h-7 rounded-md animate-pulse bg-darkSecondary/60"></div>

                            </div>
                        )
                }
            </PopoverContent>
        </Popover >
    );
};

export default PopoverNotifications;


const LinkOrNot = ({ theLink, children }: { theLink: string | undefined, children: ReactNode }) => {
    return theLink !== null ? (
        <Link href={theLink!}>
            {children}
        </Link>
    ) : (
        <>
            {children}
        </>
    )
}