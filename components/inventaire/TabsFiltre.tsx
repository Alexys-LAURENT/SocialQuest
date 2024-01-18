"use client"
import React, { useEffect } from 'react';
import { Item } from '@/app/types/entities';
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import Image from 'next/image';
import { useContext } from 'react';
import { InventaireContext } from '@/app/context/InventaireContext';

const TabsFiltre = ({ inventory }: { inventory: Item[] }) => {
    const { selectedItem, setSelectedItem } = useContext(InventaireContext)
    const tabsList = [{
        title: "Tout",
        key: "Tout",
        data: inventory
    },
    {
        title: "Bannières",
        key: "Bannières",
        data: inventory?.filter((item: any) => item.items.type === "banniere")
    },
    {
        title: "Badges",
        key: "Badges",
        data: inventory?.filter((item: any) => item.items.type === "badge")
    },
    {
        title: "Items",
        key: "Items",
        data: inventory?.filter((item: any) => item.items.type === "item")
    }]

    return (
        <Tabs aria-label="Options" items={tabsList} classNames={{ panel: "p-0" }}>
            {(item) => (
                <Tab key={item.key} title={item.title}>
                    <Card className='bg-transparent shadow-none'>
                        <CardBody className="p-0 w-full grid itemsWrapper justify-center gap-3 overflow-y-auto transition-all duration-500 ease-in-out">
                            {item.data?.map((item: any) => {
                                return (
                                    <div key={item.items.id_item} className={`cursor-pointer relative aspect-square rounded-lg ${selectedItem.id_item === item.items.id_item ? 'border-2 border-primary' : ''}`}
                                        onClick={() => { setSelectedItem(item.items) }}>
                                        <Image className='rounded-lg' src={item.items.image_url} alt={item.items.nom} fill layout="fill" objectFit="cover" sizes='100%' />
                                    </div>
                                )

                            })}
                        </CardBody>
                    </Card>
                </Tab>
            )
            }
        </Tabs >
    );
};

export default TabsFiltre;