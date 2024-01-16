"use client"
import React, { useContext, useEffect } from 'react';
import { Card, CardBody, Button, Avatar, Chip, Input, Listbox, ListboxItem, Modal, ModalBody, ModalContent, ModalFooter } from '@nextui-org/react';
import { DiscussionTab, Profile, ProfileInDiscussion } from '@/app/types/entities';
import { DiscussionContext } from '@/app/context/DiscussionContext';
import { createClient } from '@/utils/supabase/client';
import { getProfileConnected } from '@/utils/getProfileConnected';
import defaultGroup from '@/public/assets/defaultGroup.svg'
import { PlusIcon } from '@heroicons/react/24/outline';

const ListDiscussions = ({ initDiscussions, refetchDiscussions }: { initDiscussions: DiscussionTab[], refetchDiscussions: any }) => {
    const [discussions, setDiscussions] = React.useState<DiscussionTab[] | null>(initDiscussions);
    const [isOpen, setOpen] = React.useState(false);
    const onOpenChange = (open: boolean) => setOpen(open);
    const [profileConnected, setProfileConnected] = React.useState<Profile | null>(null);
    const { selectedCDiscussion, setSelectedDiscussion, setIsEditingGroup, setComponentReloaded } = useContext(DiscussionContext);
    const supabase = createClient()



    useEffect(() => {

        async function getProfile() {
            const profile = await getProfileConnected()
            setProfileConnected(profile)
            console.log(profile);
        }
        getProfile()


        // get an array of id_discussion
        const id_discussions = discussions?.map(discussion => discussion.id_discussion)
        const messagesChannel = supabase.channel(`listDiscussions`)
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'messages' },
                (payload: any) => {
                    if (id_discussions?.includes(payload.new.id_discussion)) {
                        refetchDiscussions2()
                    }
                }
            )
            .subscribe()
        return () => {
            messagesChannel.unsubscribe()
        }
    }
        , [])

    async function refetchDiscussions2() {
        const refresh = await refetchDiscussions()
        setDiscussions(refresh)
    }

    useEffect(() => {
        refetchDiscussions2()
    }
        , [selectedCDiscussion])




    return discussions && (
        <div className={`${selectedCDiscussion ? 'hidden sm:flex' : ' flex '} w-full sm:w-3/12 min-w-[200px] h-full border-e-2 border-white/20 no-scrollbar  flex-col flex-nowrap overflow-y-auto gap-4 pb-3 px-3`}>
            <div className="flex justify-between">
                <div className="text-xl">
                    Discussions
                </div>
                <Button variant='flat'
                    onClick={() => { setOpen(true) }}
                    className='rounded-full h-8 w-8 p-0 min-w-0 aspect-square'>
                    <div className='flex'>
                        <PlusIcon className='h-6 w-6 rounded-full' />
                    </div>
                </Button>
                {profileConnected &&
                    <ModalComponent isOpen={isOpen} setOpen={setOpen} onOpenChange={onOpenChange} profileConnected={profileConnected} refetchDiscussions={refetchDiscussions} setDiscussions={setDiscussions} setSelectedDiscussion={setSelectedDiscussion} />
                }
            </div>
            {discussions.map((item: DiscussionTab, index: number) => (
                <Card key={index} className={`rounded-md min-h-[55px] ${selectedCDiscussion?.id_discussion === item?.id_discussion ? 'bg-gradient-to-tl from-[#D4781A] to-[#AA3678]' : ''} `}>
                    <CardBody className='flex-row p-0' >
                        <Button onClick={() => [setIsEditingGroup(false), setComponentReloaded(true), setSelectedDiscussion(item)]} className='w-full h-full p-2 bg-transparent flex justify-start'>
                            <div className='aspect-square max-w-[40px] min-w-[40px] flex'>
                                {item?.is_group === false ?
                                    <Avatar src={item?.profiles[0].avatar_url} className='h-10 w-10 aspect-square rounded-full' />
                                    :
                                    <Avatar src={defaultGroup.src} className='h-10 w-10 p-1 aspect-square rounded-full invert bg-contain' />
                                }
                            </div>
                            <div className=' w-full overflow-hidden flex flex-col bg-green-300/0 h-full items-start'>
                                <h1 className='text-md font-semibold'>
                                    {item?.is_group === false ?
                                        item?.profiles[0].username
                                        :
                                        item.nom
                                    }
                                </h1>
                                <p className='text-ellipsis line-clamp-1 flex w-full text-left'>{item?.dernier_message?.contenu}</p>
                            </div>
                        </Button>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
};

export default ListDiscussions;


const ModalComponent = ({ isOpen, setOpen, onOpenChange, profileConnected, setDiscussions, refetchDiscussions, setSelectedDiscussion }:
    { isOpen: boolean, setOpen: (open: boolean) => void, onOpenChange: (open: boolean) => void, profileConnected: Profile, setDiscussions: any, refetchDiscussions: any, setSelectedDiscussion: any }) => {
    const supabase = createClient()
    const [InputValue, setInputValue] = React.useState<string>('')
    const [users, setUsers] = React.useState<Profile[]>([])
    const [selectedKeys, setSelectedKeys] = React.useState<React.Key[]>([]);

    async function createDiscussion(ids: string[], nom: string) {
        const { data: newDiscussionId, error: errorInsertDiscussion } = await supabase
            .from('discussions')
            .upsert({ is_group: ids.length >= 3, nom: ids.length >= 3 ? nom : null })
            .select('*')
        if (errorInsertDiscussion) {
            console.log(errorInsertDiscussion);
        }

        const { data, error: errorInsertDiscussionUsers } = await supabase
            .from('discussions_users')
            .insert(ids.map(id => ({ id_discussion: newDiscussionId![0].id_discussion, id_user: id })))
        if (errorInsertDiscussionUsers) {
            console.log(errorInsertDiscussionUsers);
        }

        setOpen(false)
        setInputValue('')

        async function refetchDiscussionsCreate() {
            const refresh = await refetchDiscussions()
            setDiscussions(refresh)

            // a faire
            // setSelectedDiscussion()
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
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} closeButton={<></>}>
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
                                <Button color="primary" onPress={onClose} onClick={() => createDiscussion([...Array.from(selectedKeys), profileConnected.id_user] as string[], InputValue)}
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