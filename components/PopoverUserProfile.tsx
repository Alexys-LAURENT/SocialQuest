import React from 'react';
import { Avatar, Button, Link, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { ExtendedPost } from '@/app/types/entities';

const PopoverUserProfile = ({ post }: { post: ExtendedPost }) => {
    return (
        <Popover placement="top" offset={10} shouldBlockScroll={true} className='mr-3 md:w-[90vw] !max-w-[17.5rem] md:!max-w-sm'>
            <PopoverTrigger>
                <div className="cursor-pointer text-textLight">
                    @{post.profiles.username}
                </div>
            </PopoverTrigger>
            <PopoverContent className='p-0 bg-darkSecondary'>
                <div className="flex flex-col w-full h-full">
                    <div className="w-full min-h-[4rem] md:min-h-[5rem] bg-white bg-cover bg-center transition-all rounded-t-md" style={{ backgroundImage: "url('/assets/Jane.png')" }}></div>
                    <div className="relative w-full min-h-[1.5rem] md:min-h-[3rem]">
                        <div className="flex absolute -top-7 md:-top-10 left-5 gap-2 transition-all duration-500">
                            <Avatar src={post.profiles.avatar_url} className="flex h-14 w-14 md:h-20 md:w-20 rounded-full text-large transition-all" />
                        </div>
                        <div className="flex absolute -top-6 md:-top-8 right-5 gap-2 md:transition-all">
                            <div className="h-5 w-5 md:h-7 md:w-7 rounded-full bg-green-500"></div>
                            <div className="h-5 w-5 md:h-7 md:w-7 rounded-full bg-yellow-500"></div>
                            <div className="h-5 w-5 md:h-7 md:w-7 rounded-full bg-pink-500"></div>
                            <div className="h-5 w-5 md:h-7 md:w-7 rounded-full bg-blue-500"></div>
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