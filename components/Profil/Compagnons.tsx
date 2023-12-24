import React from 'react';
import SearchBarCompagnons from '@/components/Profil/SearchBarCompagnons'
import { Avatar, Button, Link } from '@nextui-org/react'
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline'

const Compagnons = () => {
    return (
        <div className="flex flex-col gap-3 w-full h-[35rem] rounded-md lg:w-2/6 bg-[#1c1c1c] py-2 px-4 transition-all">
            <div>
                <p className="text-xl font-semibold">Mes Compagnons</p>
            </div>
            <div>
                <SearchBarCompagnons />
            </div>
            <div className="flex flex-col gap-4 overflow-y-auto">
                <div className="relative flex h-[4.5rem] items-center gap-2 py-2 bg-[#2e2e2e] rounded-md">
                    <div className="flex items-center px-2">
                        <div className="flex items-center justify-center bg-[#3b3b3b] rounded-full w-10 h-10">
                            <Avatar as={Link} src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="rounded-full text-large transition-all" href={`#`} />
                        </div>
                        <div className="flex flex-col ml-2 text-white">
                            <Link className="text-sm text-white"
                                href={`#`}
                            >
                                Damien Leroix
                            </Link>
                            <div className="text-sm"> O O O O </div>
                        </div>
                    </div>
                    <Button variant='flat' color='primary' className="min-w-0 absolute flex h-full items-center right-0 px-2 bg-[#293441] rounded-l-sm rounded-r"                    >
                        <ChatBubbleOvalLeftEllipsisIcon className="w-4 h-4 text-white" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Compagnons;