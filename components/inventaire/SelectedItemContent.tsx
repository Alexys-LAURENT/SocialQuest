import React, { useState } from 'react';
import Image from 'next/image';
import { Button, ButtonGroup, Chip, Input } from '@nextui-org/react';
import { Item, Profile } from '@/app/types/entities';
import { useRouter } from 'next/navigation';
import { setCurrentUserBannerUrl } from '@/utils/setCurrentUserBannerUrl';
import { useContext } from 'react';
import { ToasterContext } from '@/app/context/ToasterContext';
import dynamic from 'next/dynamic'
import { StarIcon } from '@heroicons/react/24/outline';
import { Desequipbadge } from '@/utils/DesequipBadge';
import { toggleFavorite } from '@/utils/toggleFavorite';

const DynamicModalEquipBadge = dynamic(() => import('@/components/inventaire/ModalEquipBadge'));




const SelectedItemContent = ({ selectedItem, profileConnected, setSelectedItem, pageProfile, isUserInventory }: { selectedItem: Item, profileConnected: Profile, setSelectedItem: (item: any) => void, pageProfile: Profile, isUserInventory: boolean }) => {
    const [isOpen, setOpen] = useState(false);
    const onOpenChange = (open: boolean) => setOpen(open);
    const router = useRouter()
    const { success, error } = useContext(ToasterContext)

    const toggleFav = async () => {
        const isUpdated = await toggleFavorite(selectedItem)
        if (isUpdated) {
            selectedItem.is_favorite ? success('Désépinglé') : success('Épinglé')
            setSelectedItem({ ...selectedItem, is_favorite: !selectedItem.is_favorite })
            router.refresh()
        } else {
            error('Erreur lors de la mise à jour des favoris')
        }
    }

    return (
        <div className="flex flex-col justify-between h-full overflow-hidden">
            <div className="flex flex-row flex-wrap md:flex-col gap-4 p-4 w-full">
                <div className="relative flex aspect-square w-4/12 min-w-[140px] md:w-full overflow-hidden rounded-lg bg-black/20 ">
                    <Image className='object-cover' src={selectedItem.items.image_url} fill alt={selectedItem.items.description} sizes='100%' />
                </div>
                <div className='w-auto md:w-full '>
                    <div className="text-xl md:text-3xl font-bold text-textDark dark:text-textLight transition-all !duration-[125ms]">
                        <span className='working-break-words'>{selectedItem.items.nom}</span>
                    </div>
                    <div className="text-base md:text-medium text-textDark dark:text-textLight transition-all !duration-[125ms]">
                        <span className='working-break-words'>{selectedItem.items.description}</span>
                    </div>
                </div>
                <div className='flex gap-2 w-full'>
                    <Chip className='transition-all !duration-500'>
                        <span className='text-textDark dark:text-textLight  transition-all !duration-[125ms]'>
                            {selectedItem.items.type}
                        </span>
                    </Chip>
                    {selectedItem.items.type === "Arme" &&
                        <Chip className='transition-all !duration-500'>
                            <span className='text-textDark dark:text-textLight  transition-all !duration-[125ms]'>
                                {selectedItem.items.damage} dégats
                            </span>
                        </Chip>
                    }
                </div>

                {isUserInventory && selectedItem.items.type !== "Arme" &&
                    <ButtonGroup className='w-full'>
                        <EquiperBtn SelectedItem={selectedItem} pageProfile={pageProfile} onOpenChange={onOpenChange} />
                        <Button onClick={() => toggleFav()} className='px-3 min-w-0 transition-all !duration-500'>
                            {selectedItem.is_favorite ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className={`w-6 h-6 fill-textDark dark:fill-textLight bi bi-pin-angle-fill transition-all !duration-500`} viewBox="0 0 16 16">
                                    <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a6 6 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707s.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a6 6 0 0 1 1.013.16l3.134-3.133a3 3 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className={`w-6 h-6 fill-textDark dark:fill-textLight bi bi-pin-angle transition-all !duration-500`} viewBox="0 0 16 16">
                                    <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a6 6 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707s.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a6 6 0 0 1 1.013.16l3.134-3.133a3 3 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146m.122 2.112v-.002zm0-.002v.002a.5.5 0 0 1-.122.51L6.293 6.878a.5.5 0 0 1-.511.12H5.78l-.014-.004a5 5 0 0 0-.288-.076 5 5 0 0 0-.765-.116c-.422-.028-.836.008-1.175.15l5.51 5.509c.141-.34.177-.753.149-1.175a5 5 0 0 0-.192-1.054l-.004-.013v-.001a.5.5 0 0 1 .12-.512l3.536-3.535a.5.5 0 0 1 .532-.115l.096.022c.087.017.208.034.344.034q.172.002.343-.04L9.927 2.028q-.042.172-.04.343a1.8 1.8 0 0 0 .062.46z" />
                                </svg>
                            )}
                        </Button>
                    </ButtonGroup>
                }
            </div>

            <div className="flex flex-col border-t dark:border-gray-200 border-gray-500 gap-2 p-4 pb-12 overflow-y-auto">
                <p className='text-3xl font-bold text-center pb-4 text-textDark dark:text-textLight transition-all !duration-[125ms]'>
                    Marché
                </p>

                <p className='flex gap-1 text-sm text-textDark dark:text-textLight transition-all !duration-[125ms]'>
                    Prix moyen sur le marché : <span className='flex flex-row items-center gap-1 text-textDark dark:text-textLight transition-all !duration-[125ms]'> 125 <Image src='/assets/SocialCoin.png' width={16} height={16} alt='SocialCoin' /></span>
                </p>

                <Input type="number" label="Prix" className='w-full' size='sm' labelPlacement='inside' classNames={{ inputWrapper: 'py-0 h-10 rounded-none transition-all !duration-500' }} />

                <Button className='w-full rounded-none min-h-[40px]' color='primary' variant='flat'>
                    Mettre en vente
                </Button>
            </div>





            {isUserInventory && isOpen && <DynamicModalEquipBadge isOpen={isOpen} onOpenChange={onOpenChange} selectedItem={selectedItem} profileConnected={profileConnected} />}
        </div>
    );
};

export default SelectedItemContent;

const EquiperBtn = ({ SelectedItem, pageProfile, onOpenChange, }: { SelectedItem: Item, pageProfile: Profile, onOpenChange: (open: boolean) => void }) => {
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
        return pageProfile.banner_url === SelectedItem.items.image_url ? (
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
        return pageProfile.users_badges.reduce((acc, item) => { return acc || item.items.image_url === SelectedItem.items.image_url }, false) === false ? (
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
