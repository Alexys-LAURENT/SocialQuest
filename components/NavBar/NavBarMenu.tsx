import { Listbox, ListboxItem } from '@nextui-org/react';
import React from 'react';
import { HomeIcon, BuildingStorefrontIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
const NavBarMenu = ({ customFunction }: { customFunction: () => void }) => {
    return (
        <div className='flex flex-col w-full'>
            <Listbox
                aria-label="Actions"
                classNames={{ list: "gap-4" }}
            >

                <ListboxItem key="Accueil" as={Link} href='/' onClick={() =>
                    customFunction()
                } startContent={<HomeIcon className="w-6 h-6" />}>Accueil</ListboxItem>

                <ListboxItem key="Marché" as={Link} href='/shop' onClick={() =>
                    customFunction()
                } startContent={<BuildingStorefrontIcon className="w-6 h-6" />}>
                    Marché
                </ListboxItem>

                <ListboxItem key="Top Guildes" className='bg-bgLightCard dark:bg-bgDarkSecondary'>
                    <div>
                        Top Guildes
                    </div>
                    <div>lalal</div>
                </ListboxItem>
                <ListboxItem key="Top Membres" className='bg-bgLightCard dark:bg-bgDarkSecondary'>
                    <div>
                        Top Membres
                    </div>
                    <div>lalal</div>
                </ListboxItem>
            </Listbox>
        </div >
    );
};

export default NavBarMenu;