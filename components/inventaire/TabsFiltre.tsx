"use client"
import React, { useEffect } from 'react';
import { Item, Profile } from '@/app/types/entities';
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import Image from 'next/image';
import { useContext } from 'react';
import { InventaireContext } from '@/app/context/InventaireContext';
import { StarIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
const TabsFiltre = ({ inventory, profileConnected, filterParam }: { inventory: Item[], profileConnected: Profile, filterParam: string }) => {
    const { selectedItem, setSelectedItem } = useContext(InventaireContext)

    const tabsList = [{
        title: "Tout",
        key: "Tout",
        data: inventory?.sort((a, b) => a.is_favorite ? -1 : 1)
    },
    {
        title: "Favoris",
        key: "Favoris",
        data: inventory?.filter((item: Item) => item.is_favorite)
    },
    {
        title: "Équipés",
        key: "Équipés",
        data: inventory?.filter((item: Item) => item.items.image_url === profileConnected.banner_url || profileConnected.users_badges.reduce((acc, badge) => { return acc || badge.items.image_url === item.items.image_url }, false))
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
            <Tabs className={`${selectedItem ? "hidden md:flex" : ""}`} aria-label="Options" items={tabsList} classNames={{ panel: "p-0", tab: "text-xs lg:text-sm" }} onSelectionChange={() => setSelectedItem(null)} defaultSelectedKey={filterParam ? filterParam : "Tout"}>
                {(item) => (
                    <Tab className={`${selectedItem ? "hidden md:flex flex-col" : ""}`} key={item.key} title={item.title}>
                        <Card className='bg-transparent shadow-none'>
                            <CardBody className="p-1 w-full grid itemsWrapper justify-start gap-3 overflow-y-auto transition-all duration-500 ease-in-out">
                                {item.data?.map((item: Item) => {
                                    return (
                                        <div key={item.items.id_item} className={`cursor-pointer relative aspect-square overflow-hidden rounded-lg ${selectedItem && selectedItem.items && selectedItem.items.id_item === item.items.id_item ? 'border-2 border-primary' : ''}`}
                                            onClick={() => { selectedItem?.items?.id_item === item.items.id_item ? setSelectedItem(null) : setSelectedItem(item) }}>
                                            {item.is_favorite && <StarIcon className='absolute top-1 right-1 z-50 w-4 h-4 lg:w-[1.2rem] lg:h-[1.2rem] fill-yellow-500 text-white' />}
                                            {item.items.image_url === profileConnected.banner_url && <CheckCircleIcon className='absolute top-1 left-1 z-50 w-4 h-4 lg:w-[1.2rem] lg:h-[1.2rem] fill-primary' />}
                                            {profileConnected.users_badges.reduce((acc, badge) => { return acc || badge.items.image_url === item.items.image_url }, false) && <CheckCircleIcon className='absolute top-1 left-1 z-50 w-4 h-4 lg:w-[1.2rem] lg:h-[1.2rem] fill-primary' />}
                                            <Image src={item.items.image_url} alt={item.items.nom} fill objectFit="cover" sizes='100%' />
                                        </div>
                                    )

                                })}
                            </CardBody>
                        </Card>
                    </Tab>
                )}
            </Tabs >
        </div>
    );
};

export default TabsFiltre;