"use client"
import { Profile } from '@/app/types/entities';
import Image from 'next/image'
import defaultUser from '@/public/assets/defaultUser.svg'
import { Button } from '@nextui-org/react'
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline'
import { useContext } from 'react'
import { ToasterContext } from '@/app/context/ToasterContext'
import { useRouter } from 'next/navigation'
import { toggleFollow } from '@/utils/toggleFollow';
import dynamic from 'next/dynamic'

const DynamicProfilPicture = dynamic(() => import('@/components/Profil/ProfilPicture'))


const UserTopRow = ({ isUserProfil, pageProfile, profileConnected }: { isUserProfil: boolean, pageProfile: Profile, profileConnected: Profile | null }) => {
    const { success, error } = useContext(ToasterContext)
    const router = useRouter()

    const handleFollow = async () => {
        if (!profileConnected?.id_user) return router.push('/login')
        const isDone = await toggleFollow(pageProfile?.id_user, pageProfile?.isFollowed!, profileConnected?.id_user)
        if (isDone) {
            pageProfile.isFollowed === true ? success('Vous ne suivez plus cet utilisateur') : success('Vous suivez désormais cet utilisateur')
            router.refresh()
        } else {
            error('Une erreur est survenue')
        }
    }

    return (
        <>
            <div className='relative -top-[40px] sm:-top-[60px] md:-top-[80px] w-full max-w-[1280px] flex items-end px-6 md:px-12'>
                {isUserProfil && <DynamicProfilPicture isUserProfil={isUserProfil} />}
                <Image src={pageProfile?.avatar_url || defaultUser.src} alt={pageProfile?.avatar_url! || defaultUser.src} width={160} height={160} className={`${isUserProfil ? 'absolute' : 'flex'}  h-20 w-20 sm:h-28 sm:w-28 md:h-40 md:w-40 rounded-full text-large transition-all `} />
                <div className='flex justify-between items-center h-unit-10 mb-1 sm:mb-0 ms-2 sm:ms-4  md:mb-7 w-full'>
                    <div className='sm:max-w-[80%]'>
                        <p className=" w-full overflow-hidden text-ellipsis line-clamp-1 text-lg md:text-2xl font-semibold text-textDark dark:text-textLight transition-all !duration-[125ms]">
                            {pageProfile?.username}
                        </p>
                    </div>
                    {
                        pageProfile.isFollowed !== undefined && (
                            <span className='sm:flex items-center hidden gap-4'>
                                <Button className='bg-bgLight customButton'><ChatBubbleOvalLeftEllipsisIcon className='text-bgDarkPopover h-[20px]' /></Button>

                                <Button onClick={() => handleFollow()} className='bg-secondary customButton text-textLight'>{pageProfile.isFollowed ? 'Abonné' : 'Suivre'}</Button>

                            </span>
                        )
                    }
                </div>
            </div>
            {
                pageProfile.isFollowed !== undefined && (
                    <div className=' w-full max-w-[1280px] px-6 md:px-12 flex flex-row justify-end my-4 sm:my-2 gap-2 sm:gap-4 sm:hidden -top-[40px] sm:-top-[60px] md:-top-[80px] relative'>

                        <Button onClick={() => handleFollow()} className='bg-secondary rounded-md w-full h-[30px]'>{pageProfile.isFollowed ? 'Abonné' : 'Suivre'}</Button>

                        <Button className='bg-bgLight w-[30px] rounded-md min-w-[40px] h-[30px] px-2'><ChatBubbleOvalLeftEllipsisIcon className='text-bgDarkPopover' /></Button>
                    </div>
                )
            }
        </>
    );
};

export default UserTopRow;