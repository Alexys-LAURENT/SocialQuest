import React from 'react';
import SearchBarCompagnons from '@/components/Profil/SearchBarCompagnons'
import { Avatar, Button, Link } from '@nextui-org/react'
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline'

const Compagnons = ({ isUserProfil }: { isUserProfil: boolean }) => {
    return (
        <div className="flex flex-col gap-3 w-full h-[25rem] lg:h-[35rem] rounded-md lg:w-2/6 bg-bgLightCard dark:bg-bgDarkSecondary py-2 px-4 transition-all !duration-500">
            <div>
                <div className="text-xl font-semibold text-textDark dark:text-textLight transition-all !duration-[125ms]">
                    {isUserProfil ? "Mes Compagnons" : "Compagnons"}
                </div>
            </div>
            <div>
                <SearchBarCompagnons />
            </div>
            <div className="flex flex-col gap-4 overflow-y-auto">
                <div className="relative flex min-h-[4.5rem] items-center gap-2 py-2 rounded-md bg-bgLightPopover dark:bg-bgDarkPopover transition-all !duration-500">
                    <div className="flex items-center px-2">
                        <div className="flex items-center justify-center bg-bgLightPopover dark:bg-bgDarkPopover rounded-full w-10 h-10">
                            <Avatar as={Link} src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="rounded-full text-large transition-all" href={`#`} />
                        </div>
                        <div className="flex flex-col ml-2 text-textLight">
                            <Link className="text-sm text-textDark dark:text-textLight transition-all !duration-[125ms]"
                                href={`#`}
                            >
                                Damien Leroix
                            </Link>
                            <div className="text-sm"> O O O O </div>
                        </div>
                    </div>
                    <Button variant='flat' color='primary' className="min-w-0 absolute flex h-full items-center right-0 px-2 rounded-l-sm rounded-r">
                        <ChatBubbleOvalLeftEllipsisIcon className="w-4 h-4 text-textDark dark:text-textLight transition-all !duration-[125ms]" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Compagnons;