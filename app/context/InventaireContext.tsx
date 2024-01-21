"use client"
import React, { createContext, useState } from 'react';
import { Item } from '@/app/types/entities';

export const InventaireContext = createContext({
    selectedItem: {} as Item,
    setSelectedItem: (item: any) => { }
});

const InventaireProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedItem, setSelectedItem] = useState({} as Item);

    return (
        <InventaireContext.Provider value={{ selectedItem, setSelectedItem }}>
            {children}
        </InventaireContext.Provider>
    )
}

export default InventaireProvider;