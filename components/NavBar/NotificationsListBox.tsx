import React, { ReactNode } from "react";
import { Image, Listbox, ListboxItem } from "@nextui-org/react";
import moment from "moment";
import { Notification } from "@/app/types/entities";
import Link from "next/link";
import "@/utils/momentLocaleFr";
const NotificationsListBox = ({ notifications }: { notifications: Notification[] }) => {

    return (
        <Listbox
            items={notifications}
            aria-label="Dynamic Actions"
            classNames={{ base: "max-h-[250px] overflow-y-auto" }}
        >
            {(item: Notification) => (
                <ListboxItem
                    textValue={item.id_notification}
                    classNames={{ title: "max-w-full w-full whitespace-normal mb-1", base: `data-[hover=true]:bg-darkSecondary/40 ${item.link ? "data-[hover=true]:cursor-pointer" : "data-[hover=true]:cursor-default"}` }}
                    key={item.id_notification}
                    description={moment(item.created_at).fromNow()}
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
    );
};

export default NotificationsListBox;


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