"use client"
import { useContext } from 'react';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
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
export default function MainPost({ user, post }: { user: Profile | null, post: ExtendedPost }) {

    const router = useRouter()
    const { success } = useContext(ToasterContext)

    const supabase = createClient()

    const handleDelete = (id: string) => {
        supabase.from('posts').delete().eq('id_post', id).then(({ data, error }) => {
            if (error) {
                console.error(error);
                return;
            }
            router.refresh()
            success('Post supprimé')
        })
    }

    return (
        <div className="">
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

                <div className="flex gap-2">
                    <Image src={post.guildes ? post.guildes.avatar_url! : post.profiles.avatar_url! || defaultUser.src} alt={post.guildes ? post.guildes.avatar_url! : post.profiles.avatar_url! || defaultUser.src} width={32} height={32} className='min-h-[32px] min-w-[32px] rounded-full' />
                    <div className="flex items-center justify-between w-full">
                        <div className="flex gap-1 items-center">
                            {post.guildes && (
                                <>
                                    <Link href={`/g/${post.guildes.nom}`} className="text-sm text-textLight font-semibold">
                                        {post.guildes.nom}
                                    </Link>
                                    <div>
                                        •
                                    </div>
                                </>
                            )}
                            <PopoverUserProfile post={post} />
                        </div>
                        <Popover placement="top" offset={10} shouldBlockScroll={true}>
                            <PopoverTrigger>
                                <EllipsisVerticalIcon className="w-5 h-5 text-textLight cursor-pointer" />
                            </PopoverTrigger>
                            <PopoverContent className="p-0">
                                <div className="flex flex-col">
                                    <Button className="flex gap-2 min-w-0 h-7 min-h-0 px-3 rounded-b" variant='light' color='primary'>
                                        <ShareIcon className="w-5 h-5" />
                                        <div className="">
                                            Partager
                                        </div>
                                    </Button>
                                    {user?.id_user === post.id_user ? (
                                        <Button onClick={() => handleDelete(post.id_post)} className="flex gap-2 min-w-0 h-7 min-h-0 px-3 rounded-t" variant='light' color='danger'>
                                            <TrashIcon className="w-5 h-5" />
                                            <div className="">
                                                Supprimer
                                            </div>
                                        </Button>
                                    ) : (
                                        <Button className="flex gap-2 min-w-0 h-7 min-h-0 px-3 rounded-t" variant='light' color='danger'>
                                            <FlagIcon className="w-5 h-5" />
                                            <div className="">
                                                Signaler
                                            </div>
                                        </Button>
                                    )}
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>


                <div className="flex flex-col p-2 gap-2">
                    <div>
                        <div className={`text-md font-bold working-break-words ${post.titre ? 'mb-1' : ''}`}>
                            {post.titre}
                        </div>
                        <div className="text-textLight working-break-words">
                            {post.contenu}
                        </div>
                    </div>

                    <div className="flex md:flex-row gap-2 flex-col-reverse justify-between">
                        <WrapperLikeAnswer post={post} user={user} />
                        <div className="text-slate-400 text-xs flex items-end">
                            {new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(post.created_at ?? ''))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
