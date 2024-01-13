import { DiscussionTab, Profile, ProfileInDiscussion } from '@/app/types/entities';
import { Card, CardBody, Input, Avatar, Button, Tabs, Tab } from '@nextui-org/react';
import React, { useEffect } from 'react';
import defaultGroup from '@/public/assets/defaultGroup.svg'
import { TrashIcon } from '@heroicons/react/24/outline';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { createClient } from '@/utils/supabase/client';


const EditGroup = ({ profileConnected, selectedCDiscussion }: {
    profileConnected: Profile, selectedCDiscussion: DiscussionTab
}) => {
    const [inputValue, setInputValue] = React.useState<string>(selectedCDiscussion.nom)
    const [usersToDelete, setUsersToDelete] = React.useState<ProfileInDiscussion[]>([])
    const [usersToAdd, setUsersToAdd] = React.useState<ProfileInDiscussion[]>([])
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <div className='w-full h-full flex flex-col items-center'>
            <ModalComponent isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />
            <Tabs aria-label="Options" className=''>
                <Tab key="Général" title="Général" className='w-full flex justify-center'>
                    <Card className='w-11/12 min-h-[500px]'>
                        <CardBody className='justify-between'>
                            <div>

                                <div className='w-full py-4 h-auto flex justify-center items-center'>
                                    <Avatar className='w-14 h-14 sm:w-24 sm:h-24' src={selectedCDiscussion.image_url ? selectedCDiscussion.image_url : defaultGroup.src} />
                                </div>
                                <Input
                                    label='Nom du groupe'
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder='Nom du groupe'
                                    width='100%'
                                    className=''
                                    labelPlacement='outside'
                                />
                            </div>

                            <div>

                                <div className='flex w-full gap-3 justify-end mb-6'>
                                    <Button className='w-fit h-full bg-darkSecondary p-3 text-xs sm:text-base'>Annuler</Button>
                                    <Button className='w-fit h-full bg-blue-500 p-3 text-xs sm:text-base'>Enregister</Button>
                                </div>


                                {/* Supprimer */}
                                <Card className='border rounded-md border-red-500/40 min-h-[58px]'>
                                    <CardBody className=' flex-row items-center justify-between'>
                                        <label className='text-xs sm:text-base'> Supprimer ce groupe </label>
                                        <Button className='w-fit h-fit py-1 rounded-md text-red-500 text-xs sm:text-base'>Supprimer le groupe</Button>
                                    </CardBody>
                                </Card>
                            </div>
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="Membres" title="Membres" className='w-full flex justify-center'>
                    <Card className='w-11/12 min-h-[500px]'>
                        <CardBody className='gap-3'>
                            <Card className='min-h-[50px] sm:min-h-[64px]'>
                                <CardBody className='flex flex-row items-center gap-3'> <Avatar className='w-6 h-6 aspect-auto sm:w-10 sm:h-10' src={profileConnected.avatar_url} />
                                    <span className='text-xs sm:text-base'>{profileConnected.username} (vous)</span>
                                </CardBody>
                            </Card>
                            {
                                selectedCDiscussion.profiles.map((profile) => (
                                    <Card key={profile.id_user} className='min-h-[50px] sm:min-h-[64px]'>
                                        <CardBody className='flex flex-row items-center justify-between'>
                                            <div className='flex flex-row items-center gap-3 '>
                                                <Avatar className='w-6 h-6 aspect-auto sm:w-10 sm:h-10' src={profile.avatar_url} />
                                                <span className='text-xs sm:text-base'>{profile.username}</span>
                                            </div>
                                            <div className='flex flex-row items-center'>
                                                <TrashIcon className='h-6 w-6 text-red-500 cursor-pointer' />
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))
                            }







                            <Card className='min-h-[40px]'>
                                <CardBody className='flex flex-row items-center gap-3 justify-center p-0'> <Button onPress={onOpen} className='w-full h-full bg-transparent p-3 text-xs sm:text-base'>+</Button>
                                </CardBody>
                            </Card>

                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>
    );
};

export default EditGroup;



const ModalComponent = ({ onOpen, isOpen, onOpenChange }: { onOpen: () => void, isOpen: boolean, onOpenChange: (open: boolean) => void }) => {

    const supabase = createClient()
    const [users, setUsers] = React.useState<Profile[]>([])
    useEffect(() => {
        const getUsers = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
            if (data) {
                setUsers(data)
            }
            if (error) {
                console.log(error);
            }
        }
        getUsers()
    }, [])

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} closeButton={<></>}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <Input placeholder='Rechercher un utilisateur' />
                                {users.map((user) => (
                                    <Card key={user.id_user} className='min-h-[50px] sm:min-h-[64px]'>
                                        <CardBody className='flex flex-row items-center justify-between'>
                                            <div className='flex flex-row items-center gap-3 '>
                                                <Avatar className='w-6 h-6 aspect-auto sm:w-10 sm:h-10' src={user.avatar_url} />
                                                <span className='text-xs sm:text-base'>{user.username}</span>
                                            </div>
                                            <div className='flex flex-row items-center'>
                                                <TrashIcon className='h-6 w-6 text-red-500 cursor-pointer' />
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))}

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Annuler
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Valider
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}