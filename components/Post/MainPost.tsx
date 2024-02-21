"use client"
import { useContext, useEffect, useState } from 'react';
import { Button, Popover, PopoverContent, PopoverTrigger, Spinner } from '@nextui-org/react';
import Link from 'next/link';
import { EllipsisVerticalIcon, FlagIcon, ShareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ExtendedPost, Profile } from '@/app/types/entities';
import PopoverUserProfile from '@/components/PopoverUserProfile';
import WrapperLikeAnswer from '@/components/WrapperLikeAnswer';
import { createClient } from '@/utils/supabase/client';
import { ToasterContext } from '@/app/context/ToasterContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import defaultUser from '@/public/assets/defaultUser.svg'
import { toggleFollow } from '@/utils/toggleFollow';
import { doesFollow } from '@/utils/doesFollow';
import { Image as ImageAntd } from 'antd';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import { onDownload } from '@/utils/downloadImage';
export default function MainPost({ user, post }: { user: Profile | null, post: ExtendedPost }) {
    const router = useRouter()
    const { success, error: errorToaster } = useContext(ToasterContext)
    const [follow, setFollow] = useState<boolean | undefined>(undefined)
    const [isOpen, setIsOpen] = useState(false)
    const supabase = createClient()

    useEffect(() => {
        const getData = async () => setFollow(await doesFollow(post.id_user, user?.id_user))
        getData()
    }, [])

    const handleDelete = (id: string) => {
        supabase.from('posts').delete().eq('id_post', id).then(({ data, error }) => {
            if (error) {
                console.error(error);
                errorToaster('Erreur lors de la suppression du post')
                return;
            }
            router.refresh()
            success('Post supprimé')
        })
    }

    const handleFollow = async () => {
        const isDone = await toggleFollow(post.id_user, follow!, user?.id_user)
        if (isDone) {
            follow === true ? success('Vous ne suivez plus cet utilisateur') : success('Vous suivez désormais cet utilisateur')
            router.refresh()
            setFollow(await doesFollow(post.id_user, user?.id_user))
        } else {
            errorToaster('Une erreur est survenue')
        }
    }


    return (
        <div>
            <div className="p-2 cursor-pointer rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover text-sm">
                <div
                    onClick={() => router.back()}
                    className="flex items-center w-max"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
                    >
                        <polyline points="15 18 9 12 15 6" />
                    </svg>{' '}
                    Retour
                </div>
            </div>

            <div className="flex flex-col border border-gray-500 rounded-md p-2 gap-1">

                <div className="flex gap-2 justify-between">
                    <Image src={post.id_guilde && post.guilde_nom ? post.guilde_avatar_url : post.creator_avatar_url || defaultUser.src} alt={post.id_guilde && post.guilde_nom ? post.guilde_avatar_url : post.creator_avatar_url || defaultUser.src} width={32} height={32} className='min-h-[42px] max-h-[42px] min-w-[42px] max-w-[42px] rounded-full' />
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col">

                            <div className="flex gap-1 items-center">
                                {post.id_guilde && post.guilde_nom && (
                                    <>
                                        <Link href={`/g/${post.guilde_nom}`} className="text-sm text-textDark dark:text-textLight font-semibold">
                                            {post.guilde_nom}
                                        </Link>
                                        <div>
                                            •
                                        </div>
                                    </>
                                )}
                                <PopoverUserProfile post={post} />
                            </div>
                            <span className='text-tiny dark:text-white/50 text-black/50'>Niveau {post.creator_niveau_libelle}</span>
                        </div>
                        <div className='flex gap-2 items-center'>
                            {
                                post.id_user !== user?.id_user && (
                                    <Button as={!user ? Link : Button} href='/login' onClick={() => user && handleFollow()} className='customButton bg-secondary/70 border-secondary text-textLight'>
                                        {(follow !== undefined) ? follow ? 'Abonné' : 'Suivre' : <Spinner size='sm' color='white' />}
                                    </Button>
                                )
                            }
                            <Popover placement="top" offset={10} shouldBlockScroll={true} isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
                                <PopoverTrigger>
                                    <EllipsisVerticalIcon className="w-7 h-7 px-1 text-textDark dark:text-textLight cursor-pointer" />
                                </PopoverTrigger>
                                <PopoverContent className="p-0">
                                    <div className="flex flex-col">
                                        <Button className="flex gap-2 min-w-0 h-7 min-h-0 px-3 rounded-b text-secondary" variant="light"
                                            // copy post link to clipboard
                                            onClick={() => {
                                                navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_APP_URL}/p/${post.id_post}`)
                                                    .then(() => {
                                                        success('Lien du post copié dans le presse papier !');
                                                        setIsOpen(false);
                                                    })
                                                    .catch(() => {
                                                        errorToaster('Erreur lors de la copie du lien dans le presse papier');
                                                        setIsOpen(false);
                                                    });
                                            }}
                                        >
                                            <ShareIcon className="w-5 h-5" />
                                            <div>
                                                Partager
                                            </div>
                                        </Button>
                                        {user?.id_user === post.id_user ? (
                                            <Button onClick={() => handleDelete(post.id_post)} className="flex gap-2 min-w-0 h-7 min-h-0 px-3 rounded-t" variant='light' color='danger'>
                                                <TrashIcon className="w-5 h-5" />
                                                <div>
                                                    Supprimer
                                                </div>
                                            </Button>
                                        ) : (
                                            <Button className="flex gap-2 min-w-0 h-7 min-h-0 px-3 rounded-t" variant='light' color='danger'>
                                                <FlagIcon className="w-5 h-5" />
                                                <div>
                                                    Signaler
                                                </div>
                                            </Button>
                                        )}
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>


                <div className="flex flex-col p-2 gap-2">
                    <div>
                        <div className={`text-textDark dark:text-textLight text-lg font-semibold working-break-words ${post.titre ? 'mb-1' : ''}`}>
                            {post.titre}
                        </div>
                        <div className="text-textDark dark:text-textLight text-base font-light working-break-words mb-4">
                            {post.contenu}
                        </div>
                        <div className={`flex flex-wrap gap-1 aspect-square rounded-lg overflow-hidden cursor-default ${post.images && post.images.length >= 1 ? 'w-full' : 'w-0'}`}>
                            {
                                post.images && post.images.length > 0 && post.images.map((img) => (
                                    <div className={`relative flex-1-1 overflow-hidden`} key={`post-${post.id_post}-image-${img}`}>
                                        <ImageAntd
                                            src={img}
                                            alt={img}
                                            width={100}
                                            className='absolute top-0 left-0 right-0 bottom-0 w-full !h-full object-cover'
                                            rootClassName='!h-full !w-full'
                                            preview={{
                                                toolbarRender: (
                                                    _,
                                                    {
                                                    },
                                                ) => (
                                                    <ArrowDownTrayIcon onClick={() => onDownload(img)} className="w-10 h-10 rounded-lg text-white cursor-pointer bg-white/30 p-3" />
                                                )
                                            }}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="flex md:flex-row gap-2 flex-col-reverse justify-between">
                        <WrapperLikeAnswer post={post} user={user} />
                        <div className="text-slate-400 text-xs flex items-end">
                            {post.createdAtFormated}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
