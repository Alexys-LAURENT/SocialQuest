import { DiscussionTab, Profile, ProfileInDiscussion } from '@/app/types/entities';
import { Card, CardBody, Input, Avatar, Button, Tabs, Tab, Listbox, ListboxItem, Chip } from '@nextui-org/react';
import React, { useContext, useEffect, useState } from 'react';
import defaultGroup from '@/public/assets/defaultGroup.svg'
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Modal, ModalContent, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { createClient } from '@/utils/supabase/client';
import { DiscussionContext } from '@/app/context/DiscussionContext';

const EditGroup = ({ profileConnected, selectedCDiscussion, setIsEditingGroup }: {
    profileConnected: Profile, selectedCDiscussion: DiscussionTab, setIsEditingGroup: (isEditingGroup: boolean) => void
}) => {
    const [inputValue, setInputValue] = React.useState<string>(selectedCDiscussion.nom)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { removeUserFromSelectedDiscussion, updateCurrentSelectedDiscussion } = useContext(DiscussionContext)


    return (
        <div className='w-full h-full flex flex-col items-center relative'>
            <XMarkIcon onClick={() => setIsEditingGroup(false)} className='h-6 w-6 text-white absolute cursor-pointer right-12 top-3 block ' />
            <ModalComponent isOpen={isOpen} onOpenChange={onOpenChange} defaultsProfiles={selectedCDiscussion.profiles as ProfileInDiscussion[]} profileConnected={profileConnected} selectedCDiscussion={selectedCDiscussion} />
            <Tabs aria-label="Options" className=''>
                <Tab key="Général" title="Général" className='w-full flex justify-center'>
                    <Card className='w-11/12 min-h-[100px]'>
                        <CardBody className='justify-between'>
                            <div>

                                <div className='w-full py-4 h-auto flex justify-center items-center'>
                                    <Avatar className={`w-14 h-14 sm:w-24 sm:h-24 ${!selectedCDiscussion.image_url && "invert"}`} src={selectedCDiscussion.image_url ? selectedCDiscussion.image_url : defaultGroup.src} />
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

                                <div className='flex w-full gap-3 justify-end my-6'>
                                    <Button className='w-fit h-full bg-darkSecondary p-3 text-xs sm:text-base'>Annuler</Button>
                                    <Button className='w-fit h-full bg-blue-500 p-3 text-xs sm:text-base' isDisabled={inputValue.length === 0} onClick={() => updateCurrentSelectedDiscussion(inputValue)}>Enregister</Button>
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
                    <Card className='w-11/12 overflow-y-auto max-h-[500px]'>
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
                                                <TrashIcon onClick={() => removeUserFromSelectedDiscussion(profile.id_user)} className='h-6 w-6 text-red-500 cursor-pointer' />
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



const ModalComponent = ({ isOpen, onOpenChange, defaultsProfiles, profileConnected, selectedCDiscussion }: { isOpen: boolean, onOpenChange: (open: boolean) => void, defaultsProfiles: ProfileInDiscussion[], profileConnected: Profile, selectedCDiscussion: DiscussionTab }) => {
    const supabase = createClient()
    const [users, setUsers] = useState<Profile[]>([])
    const profilesUsernames = defaultsProfiles.map((profile) => profile.username).join(',')
    const [selectedKeys, setSelectedKeys] = React.useState<React.Key[]>([]);
    const { addUsersToSelectedDiscussion } = useContext(DiscussionContext)

    useEffect(() => {
        const getUsers = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .not('username', 'in', `(${profilesUsernames},${profileConnected.username})`)
            if (data) {
                setUsers(data)
            }
            if (error) {
                console.log(error);
            }
        }
        getUsers()
        setSelectedKeys([])
    }, [selectedCDiscussion])

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} closeButton={<></>}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <Input placeholder='Rechercher un utilisateur' />

                                <Card>
                                    <CardBody className='flex flex-row items-center gap-1 w-full flex-wrap max-h-[125px]'>
                                        {
                                            Array.from(selectedKeys).map((key) => users.find((user) => user.id_user === key)).length === 0
                                                ?
                                                <Chip
                                                    key={`Chip-empty`}
                                                    variant="flat"
                                                    className='opacity-20'
                                                >
                                                    Aucun utilisateur selectionné
                                                </Chip>
                                                :
                                                Array.from(selectedKeys).map((key) => users.find((user) => user.id_user === key)).map((user) => (
                                                    <Chip
                                                        key={`Chip-${user!.id_user}`}
                                                        variant="flat"
                                                        avatar={
                                                            <Avatar
                                                                src={user!.avatar_url}
                                                            />
                                                        }
                                                    >
                                                        {user!.username}
                                                    </Chip>
                                                ))
                                        }
                                    </CardBody>
                                </Card>
                                <Listbox
                                    aria-label="Multiple selection example"
                                    variant="flat"
                                    disallowEmptySelection={false}
                                    selectionMode="multiple"
                                    items={users}
                                    onSelectionChange={(keys) => setSelectedKeys(keys as unknown as React.Key[])}
                                    selectedKeys={selectedKeys}
                                >
                                    {(item) => item && (
                                        <ListboxItem key={item.id_user}>

                                            <div className='flex flex-row items-center gap-3 '>
                                                <Avatar className='w-6 h-6 aspect-auto sm:w-10 sm:h-10' src={item.avatar_url} />
                                                <span className='text-xs sm:text-base'>{item.username}</span>
                                            </div>

                                        </ListboxItem>

                                    )}
                                </Listbox>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose} onClick={() => setSelectedKeys([])}>
                                    Annuler
                                </Button>
                                <Button color="primary" onPress={onClose} onClick={() => addUsersToSelectedDiscussion(Array.from(selectedKeys) as string[])}
                                    isDisabled={Array.from(selectedKeys).map((key) => users.find((user) => user.id_user === key)).length === 0}
                                    className={`${Array.from(selectedKeys).map((key) => users.find((user) => user.id_user === key)).length === 0 && "hover:select-none bg-gray-800"}`}>
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