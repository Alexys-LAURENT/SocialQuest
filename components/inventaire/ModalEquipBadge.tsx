"use client"
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { Item, Profile } from '@/app/types/entities';
import Image from 'next/image';
import { setEquipbadge } from '@/utils/setEquipBadge';
import { useContext } from 'react';
import { ToasterContext } from '@/app/context/ToasterContext';
import { useRouter } from 'next/navigation';

const ModalEquipBadge = ({ isOpen, onOpenChange, selectedItem, profileConnected }: { isOpen: boolean, onOpenChange: (open: boolean) => void, selectedItem: Item, profileConnected: Profile }) => {
    const { success, error } = useContext(ToasterContext)
    const router = useRouter()


    const handleEquipBadge = async (old_badge_url: string | null) => {
        var isUpdated;
        if (old_badge_url) {
            isUpdated = await setEquipbadge(selectedItem.items.image_url, old_badge_url)
        } else {
            isUpdated = await setEquipbadge(selectedItem.items.image_url)
        }
        if (isUpdated === true) {
            onOpenChange(false)
            success('Badge équipé')
            router.refresh()
        }
        else if (isUpdated === false) {
            error('Erreur lors de l\'équipement du badge')
        }
    }

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='rounded-b-none max-w-none sm:max-w-md sm:rounded-b-xl' classNames={{ wrapper: 'w-full' }}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                            </ModalHeader>
                            <ModalBody>
                                <div className='w-full h-full flex flex-col p-4 pb-8 gap-3 items-center justify-center'>

                                    <div className='flex flex-col justify-center items-center text-center'>
                                        <span>Badge séléctionné</span>
                                        <div className='relative w-[70px] h-[70px]'>
                                            <Image src={selectedItem.items.image_url} fill alt={selectedItem.items.nom}></Image>
                                        </div>
                                    </div>

                                    <div className='w-full flex flex-col gap-2 justify-center items-center'>
                                        <span>Emplacements</span>

                                        <div className='w-full flex flex-row gap-4 justify-center '>



                                            <div onClick={() => handleEquipBadge(profileConnected.users_badges[0] && profileConnected.users_badges[0].items.image_url || null)} className='cursor-pointer relative flex justify-center items-center min-w-[70px] min-h-[70px] bg-darkSecondary rounded-md'>
                                                {profileConnected.users_badges[0] ? <Image src={profileConnected.users_badges[0].items.image_url} fill alt={profileConnected.users_badges[0].items.nom}></Image> : <span className='opacity-30'>vide</span>}
                                            </div>

                                            <div onClick={() => handleEquipBadge(profileConnected.users_badges[1] && profileConnected.users_badges[1].items.image_url || null)} className='cursor-pointer relative flex justify-center items-center min-w-[70px] min-h-[70px] bg-darkSecondary rounded-md'>
                                                {profileConnected.users_badges[1] ? <Image src={profileConnected.users_badges[1].items.image_url} fill alt={profileConnected.users_badges[1].items.nom}></Image> : <span className='opacity-30'>vide</span>}
                                            </div>

                                            <div onClick={() => handleEquipBadge(profileConnected.users_badges[2] && profileConnected.users_badges[2].items.image_url || null)} className='cursor-pointer relative flex justify-center items-center min-w-[70px] min-h-[70px] bg-darkSecondary rounded-md'>
                                                {profileConnected.users_badges[2] ? <Image src={profileConnected.users_badges[2].items.image_url} fill alt={profileConnected.users_badges[2].items.nom}></Image> : <span className='opacity-30'>vide</span>}
                                            </div>

                                            <div onClick={() => handleEquipBadge(profileConnected.users_badges[3] && profileConnected.users_badges[3].items.image_url || null)} className='cursor-pointer relative flex justify-center items-center min-w-[70px] min-h-[70px] bg-darkSecondary rounded-md'>
                                                {profileConnected.users_badges[3] ? <Image src={profileConnected.users_badges[3].items.image_url} fill alt={profileConnected.users_badges[3].items.nom}></Image> : <span className='opacity-30'>vide</span>}
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default ModalEquipBadge;