"use client"
import { createContext, useState } from 'react';
import { Item } from '@/app/types/entities';

export const InventaireContext = createContext({
    selectedItem: {} as Item,
    setSelectedItem: (item: Item) => { }
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