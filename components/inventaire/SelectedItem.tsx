"use client";
import React from 'react';
import { useContext } from 'react';
import { InventaireContext } from '@/app/context/InventaireContext';
import Image from 'next/image';
import { Button } from '@nextui-org/react';

const SelectedItem = () => {
    const { selectedItem } = useContext(InventaireContext);
    console.log(selectedItem);
    return (
        <div className="flex flex-col p-4 gap-4">
            <div className="relative flex w-full aspect-auto">
                <Image className='rounded-lg' src={selectedItem.image_url} alt={selectedItem.description} width={300} height={300} />
            </div>
            <div className="text-3xl font-bold">
                {selectedItem.nom}
            </div>
            <div className="text-xl">
                {selectedItem.description}
            </div>
            {selectedItem.type === "arme" &&
                <div className="text-xl">
                    {selectedItem.damage} dégats
                </div>
            }
            <Button variant='flat' color='primary' className='w-full'>
                Équiper
            </Button>
        </div>
    );
};

export default SelectedItem;