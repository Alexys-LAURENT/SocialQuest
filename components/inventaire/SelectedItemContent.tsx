import React, { useState } from 'react';
import Image from 'next/image';
import { Button, ButtonGroup, Chip } from '@nextui-org/react';
import { Item, Profile } from '@/app/types/entities';
import { useRouter } from 'next/navigation';
import { setCurrentUserBannerUrl } from '@/utils/setCurrentUserBannerUrl';
import { useContext } from 'react';
import { ToasterContext } from '@/app/context/ToasterContext';
import dynamic from 'next/dynamic'
import { StarIcon } from '@heroicons/react/24/outline';
import { Desequipbadge } from '@/utils/DesequipBadge';
import { toggleFavorite } from '@/utils/toggleFavorite';

const DynamicModalEquipBadge = dynamic(() => import('./ModalEquipBadge'))




const SelectedItemContent = ({ selectedItem, profileConnected, setSelectedItem }: { selectedItem: Item, profileConnected: Profile, setSelectedItem: (item: any) => void }) => {
    const [isOpen, setOpen] = useState(false);
    const onOpenChange = (open: boolean) => setOpen(open);
    const router = useRouter()
    const { success, error } = useContext(ToasterContext)

    const toggleFav = async () => {
        const isUpdated = await toggleFavorite(selectedItem)
        if (isUpdated) {
            selectedItem.is_favorite ? success('Favori retiré') : success('Item ajouté aux favoris')
            setSelectedItem({ ...selectedItem, is_favorite: !selectedItem.is_favorite })
            router.refresh()
        } else {
            error('Erreur lors de la mise à jour des favoris')
        }
    }

    return (
        <div className="flex flex-row flex-wrap md:flex-col p-4 gap-4">
            <div className="relative flex aspect-square w-4/12 md:w-full overflow-hidden rounded-lg bg-black/20 ">
                <Image className='object-cover' src={selectedItem.items.image_url} fill alt={selectedItem.items.description} />
            </div>
            <div className='w-7/12 md:w-full '>
                <div className="text-xl md:text-3xl font-bold">
                    <span className='working-break-words'>{selectedItem.items.nom}</span>
                </div>
                <div className="text-base md:text-medium">
                    <span className='working-break-words'>{selectedItem.items.description}</span>
                </div>
            </div>
            <div className='flex gap-2'>
                <Chip>
                    {selectedItem.items.type}
                </Chip>
                {selectedItem.items.type === "Arme" &&
                    <Chip>
                        {selectedItem.items.damage} dégats
                    </Chip>
                }
            </div>

            {selectedItem.items.type !== "Arme" &&
                <ButtonGroup className='w-full'>
                    <EquiperBtn SelectedItem={selectedItem} profileConnected={profileConnected} onOpenChange={onOpenChange} />
                    <Button onClick={() => toggleFav()} className='px-3 min-w-0'><StarIcon className={`${selectedItem.is_favorite ? "fill-yellow-500 text-yellow-500" : ""} w-7 h-7 `} /></Button>
                </ButtonGroup>
            }
            {isOpen && <DynamicModalEquipBadge isOpen={isOpen} onOpenChange={onOpenChange} selectedItem={selectedItem} profileConnected={profileConnected} />}
        </div>
    );
};

export default SelectedItemContent;

const EquiperBtn = ({ SelectedItem, profileConnected, onOpenChange }: { SelectedItem: Item, profileConnected: Profile, onOpenChange: (open: boolean) => void }) => {
    const router = useRouter()
    const { success, error } = useContext(ToasterContext)
    const handleToggleBanner = async (image_url: string | null) => {
        const isUpdated = await setCurrentUserBannerUrl(image_url)
        if (isUpdated) {
            image_url ? success('Bannière équipée') : success('Bannière retirée')
            router.refresh()
        } else {
            error('Erreur lors de la mise à jour de la bannière')
        }
    }

    const handleRemoveBadge = async () => {
        const isRemoved = await Desequipbadge(SelectedItem.items.image_url)
        if (isRemoved) {
            success('Badge retiré')
            router.refresh()
        }
        else {
            error('Erreur lors du retrait du badge')
        }
    }


    if (SelectedItem.items.type === "Bannière") {
        return profileConnected.banner_url === SelectedItem.items.image_url ? (
            <Button onClick={() => handleToggleBanner(null)} variant='flat' color='danger' className='w-full'>
                Déséquiper
            </Button>
        ) : (
            <Button onClick={() => handleToggleBanner(SelectedItem.items.image_url)} variant='flat' color='primary' className='w-full'>
                Équiper
            </Button>
        )
    }

    if (SelectedItem.items.type === "Badge") {
        return profileConnected.users_badges.reduce((acc, item) => { return acc || item.items.image_url === SelectedItem.items.image_url }, false) === false ? (
            <Button onClick={() => onOpenChange(true)} variant='flat' color='primary' className='w-full'>
                Équiper
            </Button>
        ) :
            (
                <Button onClick={() => handleRemoveBadge()} variant='flat' color='danger' className='w-full'>
                    Déséquiper
                </Button>
            )
    }
}
