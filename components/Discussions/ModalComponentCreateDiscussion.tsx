"use client"
import { useEffect, useState } from 'react';
import { Card, CardBody, Button, Avatar, Chip, Input, Listbox, ListboxItem, Modal, ModalBody, ModalContent, ModalFooter } from '@nextui-org/react';
import { DiscussionTab, Profile } from '@/app/types/entities';
import { createClient } from '@/utils/supabase/client';
import defaultUser from '@/public/assets/defaultUser.svg'
import Image from 'next/image'


const ModalComponentCreateDiscussion = ({ isOpen, setOpen, onOpenChange, profileConnected, setDiscussions, refetchDiscussions, setSelectedDiscussion }:
    { isOpen: boolean, setOpen: (open: boolean) => void, onOpenChange: (open: boolean) => void, profileConnected: Profile, setDiscussions: any, refetchDiscussions: any, setSelectedDiscussion: (conversation: DiscussionTab | null) => void }) => {
    const supabase = createClient()
    const [InputValue, setInputValue] = useState<string>('')
    const [users, setUsers] = useState<Profile[]>([])
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

    async function createDiscussion(ids: string[], nom: string) {
        const { data: newDiscussion, error: errorInsertDiscussion } = await supabase
            .from('discussions')
            .upsert({ is_group: ids.length >= 3, nom: ids.length >= 3 ? nom : null })
            .select('*')
        if (errorInsertDiscussion) {
            console.log(errorInsertDiscussion);
        }

        const { data, error: errorInsertDiscussionUsers } = await supabase
            .from('discussions_users')
            .insert(ids.map(id => ({ id_discussion: newDiscussion![0].id_discussion, id_user: id })))
        if (errorInsertDiscussionUsers) {
            console.log(errorInsertDiscussionUsers);
        }

        setOpen(false)
        setInputValue('')

        async function refetchDiscussionsCreate() {
            const refresh = await refetchDiscussions()
            setDiscussions(refresh)
            setSelectedDiscussion(refresh.find((discussion: DiscussionTab) => discussion.id_discussion === newDiscussion![0].id_discussion))
        }
        refetchDiscussionsCreate()

    }

    useEffect(() => {
        const getUsers = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .not('id_user', 'in', `(${profileConnected.id_user})`)
            if (data) {
                setUsers(data)
            }
            if (error) {
                console.log(error);
            }
        }
        getUsers()
        setSelectedKeys([])
    }, [isOpen])

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} closeButton={<></>} className='rounded-b-none max-w-none sm:max-w-md sm:rounded-b-xl' classNames={{ wrapper: 'w-full' }}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                {Array.from(selectedKeys).length >= 2 &&
                                    <Input placeholder='Nom de la discussion' value={InputValue} onChange={(e) => setInputValue(e.target.value)} />
                                }
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
                                <Button color="primary" onClick={() => createDiscussion([...Array.from(selectedKeys), profileConnected.id_user] as string[], InputValue)}
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

export default ModalComponentCreateDiscussion;