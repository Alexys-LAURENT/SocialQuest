import { DiscussionTab, Message, Profile } from '@/app/types/entities';
import { createClient } from '@/utils/supabase/client';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Tooltip } from '@nextui-org/react';
import { Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';

const MessageCard = ({ index, item, profileConnected, selectedCDiscussion, tooltipDeleteOpen, setTooltipDeleteOpen, tooltipUserOpen, setTooltipUserOpen }: { index: number, item: Message, profileConnected: Profile, selectedCDiscussion: DiscussionTab, tooltipDeleteOpen: { open: boolean, key: string }, setTooltipDeleteOpen: React.Dispatch<React.SetStateAction<{ open: boolean, key: string }>>, tooltipUserOpen: { open: boolean, key: string }, setTooltipUserOpen: React.Dispatch<React.SetStateAction<{ open: boolean, key: string }>> }) => {

    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [scrollPosition, setScrollPosition] = useState<number>(0)

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= 768) {
                setIsMobile(true)
            } else {
                setIsMobile(false)
            }
        }
        function setPosition() {
            setScrollPosition(document.getElementById('messages_container')!.scrollTop)
        }
        window.addEventListener('resize', handleResize)
        handleResize()

        document.getElementById('messages_container')?.addEventListener('scroll', setPosition)

        return () => {
            window.removeEventListener('resize', handleResize)
            document.getElementById('messages_container')?.removeEventListener('scroll', setPosition)
        }
    }, [])

    function generateKeyTooltipUser(index: number, id_user_message: string) {
        return `tooltip-${id_user_message === profileConnected?.id_user ? profileConnected?.username : selectedCDiscussion?.profiles[0]?.username}-${index}`
    }

    function generateKeyTooltipMessage(index: number, id_message: string) {
        return `tooltip-${id_message}-${index}`
    }

    function handleToggleTooltipDelete() {
        if (tooltipDeleteOpen.key === generateKeyTooltipMessage(index, item.id_message)) {
            setTooltipDeleteOpen({ open: !tooltipDeleteOpen.open, key: generateKeyTooltipMessage(index, item.id_message) })
        } else {
            setTooltipDeleteOpen({ open: true, key: generateKeyTooltipMessage(index, item.id_message) })
        }
    }

    function handleToggleTooltipUser() {
        if (tooltipUserOpen.key === generateKeyTooltipUser(index, item.id_user)) {
            setTooltipUserOpen({ open: !tooltipUserOpen.open, key: generateKeyTooltipUser(index, item.id_user) })
        } else {
            setTooltipUserOpen({ open: true, key: generateKeyTooltipUser(index, item.id_user) })
        }
    }

    return (
        <div key={item.id_message} className={`w-full min-h-[50px] flex justify-start ${item.id_user === profileConnected?.id_user ? "flex-row-reverse" : "flex-row"} gap-3 py-3 px-1`}>
            <Tooltip placement='bottom' updatePositionDeps={[scrollPosition]} key={generateKeyTooltipUser(index, item.id_user)} isOpen={isMobile === true ? tooltipUserOpen.key === generateKeyTooltipUser(index, item.id_user) ? tooltipUserOpen.open : false : undefined} content={item.id_user === profileConnected?.id_user ? "Vous" : selectedCDiscussion.profiles[0]?.username}>
                <img onClick={() => isMobile && handleToggleTooltipUser()}
                    src={item.id_user === profileConnected?.id_user ? profileConnected!.avatar_url : selectedCDiscussion.profiles[0]?.avatar_url} className='h-8 w-8 aspect-square rounded-full' />
            </Tooltip>

            {
                item.id_user === profileConnected?.id_user ? (
                    <>
                        {
                            item.isDeleted === false ? (
                                <Tooltip updatePositionDeps={[scrollPosition]} key={generateKeyTooltipMessage(index, item.id_message)} content={<MessagePopup isMobile={isMobile} setIsMobile={setIsMobile} handleToggleTooltipDelete={handleToggleTooltipDelete} id_message={item.id_message} setTooltipDeleteOpen={setTooltipDeleteOpen} />} isOpen={isMobile === true ? tooltipDeleteOpen.key === generateKeyTooltipMessage(index, item.id_message) ? tooltipDeleteOpen.open : false : undefined} placement='left'>
                                    <div onClick={() => isMobile && handleToggleTooltipDelete()}
                                        className={`max-w-[65%] sm:max-w-[70%] relative w-fit h-fit p-4  bg-textLight rounded-lg`}>
                                        <p className='text-black break-words text-sm sm:text-base'>{item.contenu}</p>
                                    </div>
                                </Tooltip>
                            ) : (
                                <div
                                    className={`max-w-[65%] sm:max-w-[70%] relative w-fit h-fit p-4  bg-white/20 rounded-lg`}>
                                    <p className='text-black break-words text-sm sm:text-base'>{item.contenu}</p>
                                </div>
                            )
                        }
                    </>


                ) : (
                    <div className='max-w-[65%] sm:max-w-[70%] relative w-fit h-fit p-4 bg-white rounded-lg'>
                        <p className='text-black break-words text-sm sm:text-base'>{item.contenu}</p>
                    </div>
                )

            }


        </div>
    );
};

export default MessageCard;


const MessagePopup = ({ id_message, setTooltipDeleteOpen, setIsMobile, handleToggleTooltipDelete, isMobile }: {
    id_message: string,
    setTooltipDeleteOpen: React.Dispatch<React.SetStateAction<{
        open: boolean;
        key: string;
    }>>,
    setIsMobile: React.Dispatch<React.SetStateAction<boolean>>,
    handleToggleTooltipDelete: () => void,
    isMobile: boolean
}) => {
    const supabase = createClient()

    const confirm = () => {
        deleteMessage(id_message)
        if (window.innerWidth > 768) {
            setIsMobile(false)
            handleToggleTooltipDelete()
        } else {
            setTooltipDeleteOpen({ open: false, key: '' })
        }
    };

    const cancel = () => {
        if (window.innerWidth > 768) {
            setIsMobile(false)
            handleToggleTooltipDelete()
        } else {
            setTooltipDeleteOpen({ open: false, key: '' })
        }
    };

    function deleteMessage(id_message: string) {
        supabase.from('messages').update({ contenu: "** Ce message à été supprimé **", isDeleted: true }).eq('id_message', id_message).then(({ data, error }) => {
            if (error) {
                console.error(error);
                return;
            }
            setTooltipDeleteOpen({ open: false, key: '' })
        })
    }
    return (
        <Popconfirm
            title="Supprimer ce message ?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Oui"
            cancelText="Non"
            okButtonProps={{ className: 'bg-red-500 hover:bg-red-600' }}
        >
            <TrashIcon onClick={() => { isMobile === false && handleToggleTooltipDelete(); setIsMobile(true) }} className='w-5 h-5 text-white cursor-pointer' />
        </Popconfirm>
    )
}