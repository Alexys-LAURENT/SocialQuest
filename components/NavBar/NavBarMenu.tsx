import { Listbox, ListboxItem } from '@nextui-org/react';
import { HomeIcon, BuildingStorefrontIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import UserGuildes from '@/components/Home/UserGuildes';

const TopGuildes = dynamic(() => import('@/components/TopGuildes'));
const TopMembres = dynamic(() => import('@/components/TopMembres'));
const NavBarMenu = ({ customFunction }: { customFunction: () => void }) => {
    return (
        <div className='flex flex-col w-full gap-4'>
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
            </Listbox>

            <TopGuildes />
            <TopMembres />
            <UserGuildes />
        </div >
    );
};

export default NavBarMenu;