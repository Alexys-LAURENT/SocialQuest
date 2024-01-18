import { DiscussionTab, Message, Profile } from '@/app/types/entities';
import { createClient } from '@/utils/supabase/client';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Avatar, Tooltip } from '@nextui-org/react';
import { Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Link from 'next/link';

const MessageCard = ({ index, item, profileConnected, selectedCDiscussion, tooltipDeleteOpen, setTooltipDeleteOpen, tooltipUserOpen, setTooltipUserOpen, tooltipOthersOpen, setTooltipOthersOpen, prevMessage, nextMessage }: { index: number, item: Message, profileConnected: Profile, selectedCDiscussion: DiscussionTab, tooltipDeleteOpen: { open: boolean, key: string }, setTooltipDeleteOpen: React.Dispatch<React.SetStateAction<{ open: boolean, key: string }>>, tooltipUserOpen: { open: boolean, key: string }, setTooltipUserOpen: React.Dispatch<React.SetStateAction<{ open: boolean, key: string }>>, nextMessage: { id_user?: string, timestamp?: string }, prevMessage: { id_user?: string, timestamp?: string }, tooltipOthersOpen: { open: boolean, key: string }, setTooltipOthersOpen: React.Dispatch<React.SetStateAction<{ open: boolean, key: string }>> }) => {

    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [scrollPosition, setScrollPosition] = useState<number>(0)
    const prevMessageTimestamp = prevMessage.timestamp ? moment(prevMessage.timestamp).format('DD/MM/YYYY HH:mm') : null
    const itemTimestamp = item.created_at ? moment(item.created_at).format('DD/MM/YYYY HH:mm') : null
    const nextMessageTimestamp = nextMessage.timestamp ? moment(nextMessage.timestamp).format('DD/MM/YYYY HH:mm') : null

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

    useEffect(() => {

        if (tooltipUserOpen.open === true) {
            setTooltipUserOpen({ open: false, key: '' })
        }
        if (tooltipDeleteOpen.open === true) {
            setTooltipDeleteOpen({ open: false, key: '' })
        }
        if (tooltipOthersOpen.open === true) {
            setTooltipOthersOpen({ open: false, key: '' })
        }
    }
        , [scrollPosition])

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

    function handleToggleTooltipOthers() {
        if (tooltipOthersOpen.key === generateKeyTooltipMessage(index, item.id_message)) {
            setTooltipOthersOpen({ open: !tooltipOthersOpen.open, key: generateKeyTooltipMessage(index, item.id_message) })
        } else {
            setTooltipOthersOpen({ open: true, key: generateKeyTooltipMessage(index, item.id_message) })
        }
    }

    return (
        <div key={item.id_message} className={`w-full min-h-[40px] pe-2 flex justify-start ${item.id_user === profileConnected?.id_user ? "flex-row-reverse" : "flex-row"} gap-3 px-1 ${(prevMessage.id_user !== item.id_user) ? "pt-3" : "pt-[1.5px]"} ${(nextMessage.id_user !== item.id_user) ? "pb-3" : "pb-[1.5px]"}`}>
            {prevMessage.id_user !== item.id_user ? (
                <Tooltip className='hidden sm:flex' placement='bottom' updatePositionDeps={[scrollPosition]} key={generateKeyTooltipUser(index, item.id_user)} isOpen={isMobile === true ? tooltipUserOpen.key === generateKeyTooltipUser(index, item.id_user) ? tooltipUserOpen.open : false : undefined} content={item.id_user === profileConnected?.id_user ? "Vous" : selectedCDiscussion.profiles.find(profile => profile.id_user === item.id_user)?.username}>
                    <Avatar as={Link} onClick={() => isMobile && handleToggleTooltipUser()}
                        href={`/${item.profiles?.username}`}
                        src={item.id_user === profileConnected?.id_user ? profileConnected!.avatar_url : selectedCDiscussion.profiles.find(profile => profile.id_user === item.id_user)?.avatar_url} className='min-h-[2rem] min-w-[2rem] max-h-[2rem] max-w-[2rem] aspect-square rounded-full' />
                </Tooltip>
            ) : (
                <div className='min-w-[2rem] max-w-[2rem] items-end flex flex-col justify-end' />
            )}

            {
                item.id_user === profileConnected?.id_user ? (
                    <>
                        {
                            item.isDeleted === false ? (
                                <div className="w-full flex flex-col items-end gap-1 min-h-[40px]">
                                    <Tooltip updatePositionDeps={[scrollPosition]} key={generateKeyTooltipMessage(index, item.id_message)} content={<MessagePopup isMobile={isMobile} setIsMobile={setIsMobile} handleToggleTooltipDelete={handleToggleTooltipDelete} id_message={item.id_message} setTooltipDeleteOpen={setTooltipDeleteOpen} timestamp={item.created_at} />} isOpen={isMobile === true ? tooltipDeleteOpen.key === generateKeyTooltipMessage(index, item.id_message) ? tooltipDeleteOpen.open : false : undefined} placement='left'>
                                        <div onClick={() => isMobile && handleToggleTooltipDelete()}
                                            className={`max-w-[65%] sm:max-w-[70%] relative flex items-center w-fit h-full px-3 py-2 bg-secondary rounded-lg ${prevMessage.id_user === item.id_user ? "rounded-tr-none" : ""} ${nextMessage.id_user === item.id_user ? "rounded-br-none" : ""}`}>
                                            <p className='select-text text-white working-break-words text-sm sm:text-base'>{item.contenu}</p>
                                        </div>
                                    </Tooltip>
                                </div>
                            ) : (
                                <div className="w-full flex flex-col items-end gap-1 min-h-[40px]">
                                    <Tooltip updatePositionDeps={[scrollPosition]} key={generateKeyTooltipMessage(index, item.id_message)} content={<MessagePopupOthers isMobile={isMobile} setIsMobile={setIsMobile} setTooltipOthersOpen={setTooltipOthersOpen} timestamp={item.created_at} />} isOpen={isMobile === true ? tooltipOthersOpen.key === generateKeyTooltipMessage(index, item.id_message) ? tooltipOthersOpen.open : false : undefined} placement='left'>
                                        <div onClick={() => isMobile && handleToggleTooltipOthers()}
                                            className={`max-w-[65%] sm:max-w-[70%] relative flex items-center w-fit h-full px-3 py-2 bg-darkSecondary rounded-lg ${prevMessage.id_user === item.id_user ? "rounded-tr-none" : ""} ${nextMessage.id_user === item.id_user ? "rounded-br-none" : ""}`}>
                                            <p className='select-text text-textLight working-break-words italic text-xs sm:text-sm'>{item.contenu}</p>
                                        </div>
                                    </Tooltip>
                                </div>
                            )
                        }
                    </>


                ) : (
                    <>
                        {
                            item.isDeleted === false ? (
                                <div className="w-full flex flex-col items-start gap-1 min-h-[40px]">
                                    <Tooltip updatePositionDeps={[scrollPosition]} key={generateKeyTooltipMessage(index, item.id_message)} content={<MessagePopupOthers isMobile={isMobile} setIsMobile={setIsMobile} setTooltipOthersOpen={setTooltipOthersOpen} timestamp={item.created_at} />} isOpen={isMobile === true ? tooltipOthersOpen.key === generateKeyTooltipMessage(index, item.id_message) ? tooltipOthersOpen.open : false : undefined} placement='right'>
                                        <div onClick={() => isMobile && handleToggleTooltipOthers()}
                                            className={`max-w-[65%] sm:max-w-[70%] relative flex items-center w-fit h-full px-3 py-2 bg-textLight rounded-lg ${prevMessage.id_user === item.id_user ? "rounded-tl-none" : ""} ${nextMessage.id_user === item.id_user ? "rounded-bl-none" : ""}`}>
                                            <p className='select-text text-black working-break-words text-sm sm:text-base'>{item.contenu}</p>
                                        </div>
                                    </Tooltip>
                                </div>
                            ) : (
                                <div className="w-full flex flex-col items-start gap-1 min-h-[40px]">
                                    <Tooltip updatePositionDeps={[scrollPosition]} key={generateKeyTooltipMessage(index, item.id_message)} content={<MessagePopupOthers isMobile={isMobile} setIsMobile={setIsMobile} setTooltipOthersOpen={setTooltipOthersOpen} timestamp={item.created_at} />} isOpen={isMobile === true ? tooltipOthersOpen.key === generateKeyTooltipMessage(index, item.id_message) ? tooltipOthersOpen.open : false : undefined} placement='right'>
                                        <div onClick={() => isMobile && handleToggleTooltipOthers()}
                                            className={`max-w-[65%] sm:max-w-[70%] relative flex items-center w-fit h-full px-3 py-2 bg-darkSecondary rounded-lg ${prevMessage.id_user === item.id_user ? "rounded-tl-none" : ""} ${nextMessage.id_user === item.id_user ? "rounded-bl-none" : ""}`}>
                                            <p className='select-text text-textLight working-break-words italic text-xs sm:text-sm'>{item.contenu}</p>
                                        </div>
                                    </Tooltip>
                                </div>
                            )
                        }
                    </>
                )

            }


        </div >
    );
};

export default MessageCard;


const MessagePopup = ({ id_message, setTooltipDeleteOpen, setIsMobile, handleToggleTooltipDelete, isMobile, timestamp }: {
    id_message: string,
    setTooltipDeleteOpen: React.Dispatch<React.SetStateAction<{
        open: boolean;
        key: string;
    }>>,
    setIsMobile: React.Dispatch<React.SetStateAction<boolean>>,
    handleToggleTooltipDelete: () => void,
    isMobile: boolean,
    timestamp: string
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
        supabase.from('messages').update({ contenu: "Message supprimé", isDeleted: true }).eq('id_message', id_message).then(({ data, error }) => {
            if (error) {
                console.error(error);
                return;
            }
            setTooltipDeleteOpen({ open: false, key: '' })
        })
    }
    return (
        <Popconfirm
            className='relative'
            title="Supprimer ce message ?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Oui"
            cancelText="Non"
            okButtonProps={{ className: 'bg-red-500 hover:bg-red-600' }}
        >
            <TrashIcon onClick={() => { isMobile === false && handleToggleTooltipDelete(); setIsMobile(true) }} className='w-[1.1rem] h-[1.1rem] text-white cursor-pointer' />
            <div className="absolute bottom-0 -left-12" onClick={(e) => e.stopPropagation()}>
                <p className='text-xs text-white'>{moment(timestamp).format('HH:mm')}</p>
            </div>
        </Popconfirm>
    )
}

const MessagePopupOthers = ({ isMobile, setIsMobile, timestamp, setTooltipOthersOpen }: {
    setIsMobile: React.Dispatch<React.SetStateAction<boolean>>,
    setTooltipOthersOpen: React.Dispatch<React.SetStateAction<{
        open: boolean;
        key: string;
    }>>,
    isMobile: boolean,
    timestamp: string
}) => {
    return (
        <div className="flex">
            <p className='text-xs text-white'>{moment(timestamp).format('HH:mm')}</p>
        </div>
    )
}