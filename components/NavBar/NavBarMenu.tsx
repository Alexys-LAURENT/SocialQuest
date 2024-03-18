import { Listbox, ListboxItem } from '@nextui-org/react';
import { HomeIcon, BuildingStorefrontIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import UserGuildes from '@/components/Home/UserGuildes';
import TopGuildes from '@/components/TopGuildes';
import TopMembres from '@/components/TopMembres';
import { Profile } from '@/app/types/entities';

const NavBarMenu = ({ customFunction, user }: { customFunction: () => void, user: Profile | null }) => {
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

            <TopGuildes customFunction={customFunction} />
            <TopMembres customFunction={customFunction} />
            {user && <UserGuildes customFunction={customFunction} />}
        </div >
    );
};

export default NavBarMenu;