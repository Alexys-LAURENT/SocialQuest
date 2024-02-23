import { DiscussionTab, Profile, ProfileInDiscussion } from '@/app/types/entities';
import { Card, CardBody, Input, Button, Tabs, Tab } from '@nextui-org/react';
import { useContext, useState } from 'react';
import defaultGroup from '@/public/assets/defaultGroup.svg'
import defaultUser from '@/public/assets/defaultUser.svg'
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useDisclosure } from "@nextui-org/react";
import { createClient } from '@/utils/supabase/client';
import { DiscussionContext } from '@/app/context/DiscussionContext';
import { Popconfirm } from 'antd';
import { ToasterContext } from '@/app/context/ToasterContext';
import dynamic from 'next/dynamic'
import Image from 'next/image'

const DynamicModalComponentAddUsersToDiscussion = dynamic(() => import('@/components/Discussions/ModalComponentAddUsersToDiscussion'))



const EditGroup = ({ profileConnected, selectedCDiscussion, setSelectedDiscussion, setIsEditingGroup }: {
    profileConnected: Profile, selectedCDiscussion: DiscussionTab, setSelectedDiscussion: (discussion: DiscussionTab | null) => void, setIsEditingGroup: (isEditingGroup: boolean) => void
}) => {
    const [inputValue, setInputValue] = useState<string>(selectedCDiscussion.nom)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { removeUserFromSelectedDiscussion, updateCurrentSelectedDiscussion } = useContext(DiscussionContext)
    const { success, error: errorToaster } = useContext(ToasterContext)

    const confirm = async () => {
        const supabase = createClient()
        const { error } = await supabase.from('discussions').delete().match({ id_discussion: selectedCDiscussion.id_discussion })
        if (error) {
            console.log('errorDeleteGroup', error)
            errorToaster('Une erreur est survenue')
        }
        setIsEditingGroup(false)
        setSelectedDiscussion(null)
        success('Groupe supprimé avec succès')
    };

    const cancel = () => { };


    return (
        <div className='w-full h-full flex flex-col items-center relative mt-3'>
            <XMarkIcon onClick={() => setIsEditingGroup(false)} className='h-6 w-6 text-white absolute cursor-pointer right-5 sm:right-8 top-[0.6rem] block' />
            {isOpen && <DynamicModalComponentAddUsersToDiscussion isOpen={isOpen} onOpenChange={onOpenChange} defaultsProfiles={selectedCDiscussion.profiles as ProfileInDiscussion[]} profileConnected={profileConnected} selectedCDiscussion={selectedCDiscussion} />}
            <Tabs aria-label="Options">
                <Tab key="Général" title="Général" className='w-full flex justify-center px-3 sm:px-6'>
                    <Card className='w-full min-h-[100px]'>
                        <CardBody className='justify-between'>
                            <div>

                                <div className='w-full py-4 h-auto flex justify-center items-center'>
                                    <Image src={selectedCDiscussion.image_url ? selectedCDiscussion.image_url : defaultGroup.src} alt="group" width={100} height={100} className={`p-1 w-14 h-14 sm:w-24 sm:h-24 bg-[#3f3f46] rounded-full ${!selectedCDiscussion.image_url && "invert"}`} />
                                </div>
                                <Input
                                    label='Nom du groupe'
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder='Nom du groupe'
                                    width='100%'
                                    labelPlacement='outside'
                                    classNames={{ label: 'pl-1' }}
                                />
                            </div>

                            <div>

                                <div className='flex w-full gap-3 justify-end my-6'>
                                    <Button className='customButton text-xs sm:text-base' onClick={() => setInputValue(selectedCDiscussion.nom)}>
                                        Annuler
                                    </Button>
                                    <Button className='customButton bg-secondary text-xs sm:text-base' isDisabled={inputValue.length === 0} onClick={() => updateCurrentSelectedDiscussion(inputValue)}>
                                        Enregister
                                    </Button>
                                </div>


                                {/* Supprimer */}
                                <Card className='border rounded-md border-red-500/40 min-h-[58px]'>
                                    <CardBody className=' flex-row items-center justify-between'>
                                        <label className='text-xs sm:text-base'> Suppression </label>

                                        <Popconfirm
                                            className='relative'
                                            title="Supprimer ce groupe ?"
                                            onConfirm={confirm}
                                            onCancel={cancel}
                                            okText="Oui"
                                            cancelText="Non"
                                            okButtonProps={{ className: 'bg-red-500 hover:bg-red-600' }}
                                        >
                                            <Button variant='light' color='danger' className='customButton text-danger text-xs sm:text-base'>Supprimer le groupe</Button>
                                        </Popconfirm>
                                    </CardBody>
                                </Card>
                            </div>
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="Membres" title="Membres" className='w-full flex justify-center px-3 sm:px-6'>
                    <Card className='w-full'>
                        <CardBody className='gap-3 overflow-y-auto max-h-[500px] pb-0'>
                            <Card className='min-h-[50px] sm:min-h-[64px]'>
                                <CardBody className='flex flex-row items-center gap-3'>
                                    <Image src={profileConnected.avatar_url!} alt="group" width={100} height={100} className={`w-6 h-6 sm:w-10 sm:h-10 bg-[#3f3f46] rounded-full ${!profileConnected.avatar_url && "invert"}`} />
                                    <span className='text-xs sm:text-base'>{profileConnected.username} (vous)</span>
                                </CardBody>
                            </Card>
                            {
                                selectedCDiscussion.profiles.map((profile) => (
                                    <Card key={`EditGroup-${profile.id_user}`} className='min-h-[50px] sm:min-h-[64px]'>
                                        <CardBody className='flex flex-row items-center justify-between'>
                                            <div className='flex flex-row items-center gap-3 '>
                                                <Image src={profile.avatar_url ? profile.avatar_url : defaultUser.src} alt="group" width={100} height={100} className={`w-6 h-6 sm:w-10 sm:h-10 bg-[#3f3f46] rounded-full`} />
                                                <span className='text-xs sm:text-base'>{profile.username}</span>
                                            </div>
                                            <div className='flex flex-row items-center'>
                                                <TrashIcon onClick={() => removeUserFromSelectedDiscussion(profile.id_user)} className='h-6 w-6 text-red-500 cursor-pointer' />
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))
                            }







                        </CardBody>
                        <CardBody className=''>
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



