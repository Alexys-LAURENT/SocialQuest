"use client"
import { createContext, useState } from 'react';
import { Item } from '@/app/types/entities';

export const InventaireContext = createContext({
    selectedItem: {} as Item | null,
    setSelectedItem: (item: Item | null) => { }
});

const InventaireProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    return (
        <InventaireContext.Provider value={{ selectedItem, setSelectedItem }}>
            {children}
        </InventaireContext.Provider>
    )
}

export default InventaireProvider;