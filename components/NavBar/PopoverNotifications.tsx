import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardBody, CardFooter, CardHeader, Image, Listbox, ListboxItem } from "@nextui-org/react";
import { Badge } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { BellIcon } from "@heroicons/react/24/outline";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { Profile } from "@/app/types/entities";
import { getUserNotifications } from "@/utils/getUserNotifications";
import moment from "moment";

const PopoverNotifications = ({ user }: { user: Profile }) => {
    const [notifications, setNotifications] = useState<any>([]);

    useEffect(() => {
        async function getNotifications() {
            const data = await getUserNotifications(user.id_user);
            if (data !== false) {
                console.log(data);
                setNotifications(data);
            }
        }
        getNotifications();
    }
        , []);


    return (
        <Popover placement="bottom" offset={20} classNames={{ base: " w-[18.5rem]" }}>
            <PopoverTrigger>
                <div className="flex items-center cursor-pointer">
                    <Badge content={notifications.length} color="danger" className="text-xs">
                        <BellIcon className="w-6 h-6" />
                    </Badge>
                </div>
            </PopoverTrigger>
            <PopoverContent className="bg-[#3b3b3b]">
                <Listbox
                    items={notifications}
                    aria-label="Dynamic Actions"
                >
                    {(item: any) => (
                        <ListboxItem
                            classNames={{ title: "max-w-full whitespace-normal mb-1" }}
                            key={item.id_notification}
                            description={"Il y a " + moment(item.created_at).locale('fr').fromNow().split("ago")[0]}
                        >
                            <div className="flex gap-2">
                                {
                                    item.image_url &&
                                    <div className=" min-w-[40px] flex items-center">
                                        <Image src={item.image_url} alt={item.titre} width={40} height={40} className="rounded-full w-10 h-10 aspect-square" />
                                    </div>
                                }
                                <div className="flex flex-col">
                                    <span className="break-words">{item.titre}</span>
                                    <span className="break-words text-xs font-extralight">{item.message}</span>
                                </div>
                            </div>
                        </ListboxItem>
                    )}
                </Listbox>
            </PopoverContent>
        </Popover >
    );
};

export default PopoverNotifications;