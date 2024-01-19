import React from 'react';
import { Avatar, Button, Link, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { ExtendedPost } from '@/app/types/entities';
import Image from 'next/image';

const PopoverUserProfile = ({ post }: { post: ExtendedPost }) => {
    console.log(post);
    return (
        <Popover classNames={{ content: "z-10" }} placement="top" offset={10} shouldBlockScroll={true} className='mr-3 md:w-[90vw] !max-w-[17.5rem] md:!max-w-sm'>
            <PopoverTrigger>
                <div className="cursor-pointer text-textLight">
                    @{post.profiles.username}
                </div>
            </PopoverTrigger>
            <PopoverContent className='p-0 bg-darkSecondary'>
                <div className="flex flex-col w-full h-full">
                    <div className="w-full min-h-[4rem] md:min-h-[5rem] bg-white bg-cover bg-center transition-all rounded-t-md" style={{ backgroundImage: `url(${post.profiles.banner_url})` }}></div>
                    <div className="relative w-full min-h-[1.5rem] md:min-h-[3rem]">
                        <div className="flex absolute -top-7 md:-top-10 left-5 gap-2 transition-all duration-500">
                            <Avatar src={post.profiles.avatar_url} className="flex h-14 w-14 md:h-20 md:w-20 rounded-full text-large transition-all" />
                        </div>
                        <div className="flex absolute -top-5 md:-top-7 right-5 gap-2 md:transition-all">
                            {
                                post.profiles.users_badges && post.profiles.users_badges.length > 0 && post.profiles.users_badges.map((badge, index) => {
                                    return (
                                        <div key={index} className="relative overflow-hidden w-9 h-9 md:h-12 md:w-12 rounded-full "><Image src={badge.items.image_url} alt="Userbadge" fill></Image></div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="flex flex-col p-4 gap-4">
                        <div className="text-xl md:text-3xl text-textLight font-bold">
                            {post.profiles.username}
                        </div>
                        <div className="flex flex-col bg-[#2e2e2e] text-textLight gap-2 py-2 px-4 min-h-[7rem] max-h-[7rem] md:min-h-[10rem] md:max-h-[11rem] rounded-md">
                            <div className="text-base md:text-lg font-semibold">
                                A propos
                            </div>
                            <div className="text-sm md:text-base overflow-y-auto">
                                {post.profiles.a_propos === ""
                                    ? "L'utilisateur n'a pas encore rempli cette section"
                                    : post.profiles.a_propos}
                            </div>
                        </div>
                        <Button as={Link} variant='flat' color='primary' className='text-textLight text-base md:text-lg font-semibold rounded-sm'
                            href={`/${post.profiles.username}`}
                        >
                            Voir le profil
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default PopoverUserProfile;