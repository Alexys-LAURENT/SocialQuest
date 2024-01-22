"use client"
import React from 'react';
import { Item, Profile } from '@/app/types/entities';
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import Image from 'next/image';
import { useContext } from 'react';
import { InventaireContext } from '@/app/context/InventaireContext';
import { StarIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
const TabsFiltre = ({ inventory, profileConnected, pageProfile, filterParam, isUserInventory }: { inventory: Item[], profileConnected: Profile, pageProfile: Profile, filterParam: string, isUserInventory: boolean }) => {
    const { selectedItem, setSelectedItem } = useContext(InventaireContext)

    const tabsList = [{
        title: "Tout",
        key: "Tout",
        data: inventory?.sort((a, b) => a.is_favorite ? -1 : 1)
    }, {
        title: "Épinglés",
        key: "Épinglés",
        data: inventory?.filter((item: Item) => item.is_favorite)
    },
    {
        title: "Équipés",
        key: "Équipés",
        data: inventory?.filter((item: Item) => item.items.image_url === pageProfile?.banner_url || pageProfile?.users_badges.reduce((acc, badge) => { return acc || badge.items.image_url === item.items.image_url }, false))
    },
    {
        title: "Bannières",
        key: "Bannières",
        data: inventory?.filter((item: Item) => item.items.type === "Bannière")
    },
    {
        title: "Badges",
        key: "Badges",
        data: inventory?.filter((item: Item) => item.items.type === "Badge")
    },
    {
        title: "Items",
        key: "Items",
        data: inventory?.filter((item: Item) => item.items.type === "Arme")
    }
    ]


    return (
        <div className={` ${selectedItem ? "hidden md:flex" : ""} flex w-full h-full gap-6 flex-col  transition-all`}>
            <Tabs className={`${selectedItem ? "hidden md:flex" : ""}`} aria-label="Options" items={tabsList} classNames={{ panel: "p-0", tab: "text-xs lg:text-sm", tabList: "gap-1 lg:gap-2" }} onSelectionChange={() => setSelectedItem(null)} defaultSelectedKey={filterParam ? filterParam : "Tout"}>
                {(item) => (
                    <Tab className={`${selectedItem ? "hidden md:flex flex-col" : ""}`} key={item.key} title={item.title}>
                        <Card className='bg-transparent shadow-none'>
                            <CardBody className="p-1 w-full grid itemsWrapper justify-start gap-3 overflow-y-auto transition-all duration-500 ease-in-out">
                                {item.data?.map((item: Item) => {
                                    return (
                                        <div key={item.items.id_item} className={`cursor-pointer relative aspect-square overflow-hidden rounded-lg ${selectedItem && selectedItem.items && selectedItem.id_item_user === item.id_item_user ? 'border-2 border-primary' : ''}`}
                                            onClick={() => { selectedItem?.id_item_user === item.id_item_user ? setSelectedItem(null) : setSelectedItem(item) }}>
                                            {item.is_favorite &&
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="absolute top-1 right-1 z-50 w-4 h-4 lg:w-[1.15rem] lg:h-[1.15rem] fill-white bi bi-pin-angle-fill" viewBox="0 0 16 16">
                                                    <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a6 6 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707s.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a6 6 0 0 1 1.013.16l3.134-3.133a3 3 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146" />
                                                </svg>
                                            }
                                            {item.items.image_url === pageProfile.banner_url && <CheckCircleIcon className='absolute top-1 left-1 z-50 w-4 h-4 lg:w-[1.2rem] lg:h-[1.2rem] fill-primary' />}
                                            {pageProfile.users_badges.reduce((acc, badge) => { return acc || badge.items.image_url === item.items.image_url }, false) && <CheckCircleIcon className='absolute top-1 left-1 z-50 w-4 h-4 lg:w-[1.2rem] lg:h-[1.2rem] fill-primary' />}
                                            <Image src={item.items.image_url} alt={item.items.nom} fill objectFit="cover" sizes='100%' className='drop-shadow-xl' />

                                        </div>
                                    )

                                })}
                            </CardBody>
                        </Card>
                    </Tab>
                )}
            </Tabs >
        </div >
    );
};

export default TabsFiltre;