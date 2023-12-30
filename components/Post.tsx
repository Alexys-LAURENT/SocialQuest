import React from 'react';
import { Avatar, Button, Link, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { ChatBubbleLeftIcon, EllipsisVerticalIcon, FlagIcon, HeartIcon, ShareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ExtendedPost } from '@/app/types/entities';
import PopoverUserProfile from '@/components/PopoverUserProfile';


const Post = ({ user, post }: { user: any, post: ExtendedPost }) => {
    return (
        <div className="flex flex-col border border-gray-500 rounded-md p-2 gap-2">

            <div className="flex gap-2">
                <Avatar as={Link} src={post.profiles.avatar_url} size='sm' href={`/${post.profiles.username}`} />
                <div className="flex items-center justify-between w-full">
                    <div className="flex gap-1">
                        <Link href={`#`} className="text-sm text-textLight font-semibold">
                            Japan •
                        </Link>
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
                                {user.id_user === post.id_user ? (
                                    <Button className="flex gap-2 min-w-0 h-7 min-h-0 px-3 rounded-t" variant='light' color='danger'>
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
                    <div className="text-md font-semibold">
                        {post.titre}
                    </div>
                    <div className="text-font-light">
                        {post.contenu}
                    </div>
                </div>

                <div className="flex md:flex-row gap-2 flex-col-reverse justify-between">
                    <div className='flex gap-4'>
                        <Button variant='flat' color='primary' className='min-w-0 h-7 w-max rounded-sm text-textLight px-2'>
                            <HeartIcon className="w-5 h-5" /> 12
                        </Button>
                        <Button variant='flat' color='primary' className='min-w-0 h-7 w-max rounded-sm text-textLight px-2'>
                            <ChatBubbleLeftIcon className="w-5 h-5" /> 12
                        </Button>
                    </div>
                    <div className="text-slate-400 text-xs flex items-end">
                        {new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(post.created_at ?? ''))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Post;