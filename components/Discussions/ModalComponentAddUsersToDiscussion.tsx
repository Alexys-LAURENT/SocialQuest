import { DiscussionTab, Profile, ProfileInDiscussion } from '@/app/types/entities';
import { Card, CardBody, Input, Avatar, Button, Listbox, ListboxItem, Chip } from '@nextui-org/react';
import React, { useContext, useEffect, useState } from 'react';
import { Modal, ModalContent, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { createClient } from '@/utils/supabase/client';
import { DiscussionContext } from '@/app/context/DiscussionContext';
import Image from 'next/image'
import defaultUser from '@/public/assets/defaultUser.svg'


const ModalComponentAddUsersToDiscussion = ({ isOpen, onOpenChange, defaultsProfiles, profileConnected, selectedCDiscussion }: { isOpen: boolean, onOpenChange: (open: boolean) => void, defaultsProfiles: ProfileInDiscussion[], profileConnected: Profile, selectedCDiscussion: DiscussionTab }) => {
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
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} closeButton={<></>} className='rounded-b-none max-w-none sm:max-w-md sm:rounded-b-xl' classNames={{ wrapper: 'w-full' }}>
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
                                                        classNames={{ avatar: 'rounded-full' }}
                                                        key={`Chip-${user!.id_user}`}
                                                        variant="flat"
                                                        avatar={
                                                            <Image src={user!.avatar_url || defaultUser.src} alt="avatar" width={50} height={50} />
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
                                        console.log(item),
                                        <ListboxItem key={item.id_user} textValue={item.username}>

                                            <div className='flex flex-row items-center gap-3 '>
                                                <Image src={item.avatar_url || defaultUser.src} alt="avatar" width={50} height={50} className={`w-6 h-6 sm:w-10 sm:h-10 bg-[#3f3f46] rounded-full`} />
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

export default ModalComponentAddUsersToDiscussion;