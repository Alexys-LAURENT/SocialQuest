"use client"
import { useContext } from 'react';
import { Avatar, Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
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
export default function Post({ user, post }: { user: Profile | null, post: ExtendedPost }) {

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
        <div className="flex flex-col border border-gray-500 rounded-md p-2 gap-1">

            <div className="flex gap-2">
                <Image src={post.guildes ? post.guildes.avatar_url! : post.profiles.avatar_url! || defaultUser.src} alt={post.guildes ? post.guildes.avatar_url! : post.profiles.avatar_url! || defaultUser.src} width={32} height={32} className='min-h-[32px] min-w-[32px] rounded-full' />
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-1">
                        {post.guildes && (
                            <>
                                <Link href={`/g/${post.guildes.nom}`} className="text-sm text-textDark dark:text-textLight transition-all !duration-[125ms] font-semibold">
                                    {post.guildes.nom}
                                </Link>
                                <div className='text-textDark dark:text-textLight transition-all !duration-[125ms]'>
                                    •
                                </div>
                            </>
                        )}
                        <PopoverUserProfile post={post} />
                    </div>
                    <Popover placement="top" offset={10} shouldBlockScroll={true}>
                        <PopoverTrigger>
                            <EllipsisVerticalIcon className="w-5 h-5 text-textDark dark:text-textLight cursor-pointer transition-all !duration-[125ms]" />
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


            <div className="flex flex-col px-10 gap-2">
                <div>
                    <div className={`text-textDark dark:text-textLight text-md font-bold working-break-words transition-all !duration-[125ms] ${post.titre ? 'mb-1' : ''}`}>
                        {post.titre}
                    </div>
                    <div className="text-textDark dark:text-textLight working-break-words transition-all !duration-[125ms]">
                        {post.contenu}
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
    );
};
