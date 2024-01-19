"use client";
import React, { useLayoutEffect } from 'react';
import { useContext } from 'react';
import { InventaireContext } from '@/app/context/InventaireContext';
import dynamic from 'next/dynamic'
import { Profile } from '@/app/types/entities';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
const DynamicSelectedItemContent = dynamic(() => import('./SelectedItemContent'))


const SelectedItem = ({ profileConnected }: { profileConnected: Profile }) => {
    const { selectedItem, setSelectedItem } = useContext(InventaireContext);

    useLayoutEffect(() => {
        setSelectedItem(null)
    }, [])

    return selectedItem && selectedItem.items && selectedItem.items.id_item && (
        <div className={`min-w-[300px]  ${selectedItem ? "flex w-full md:w-[300px]" : "hidden md:flex"} flex-col bg-darkSecondary rounded-md`}>
            <ArrowLeftIcon onClick={() => setSelectedItem(null)} className='w-6 h-6 ms-4 mt-3 inline-block md:hidden cursor-pointer' />
            <DynamicSelectedItemContent selectedItem={selectedItem} profileConnected={profileConnected} setSelectedItem={setSelectedItem} />
        </div>

    );
};

export default SelectedItem;