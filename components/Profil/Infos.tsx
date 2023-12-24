import React from 'react';
import { Link, Image, Button, Progress } from '@nextui-org/react'

const Infos = () => {
    return (
        <div className="flex flex-col w-full h-[35rem] lg:w-4/6 gap-6 rounded-md transition-all">


            <div className="flex flex-col gap-6 h-[40%]">
                <div className='flex flex-col gap-1 h-[50%] bg-[#1c1c1c] rounded-md py-2 px-3'>
                    <div className="font-semibold">
                        A propos
                    </div>
                    <div className="font-light text-sm">
                        Je suis une personne determinée et je compte défendre fièrement les guildes auquels j'appartiens !
                    </div>
                </div>

                <div className='flex flex-col gap-2 h-[50%] bg-[#1c1c1c] rounded-md py-2 px-3'>
                    <div>
                        <div className="flex justify-between items-center">
                            <div className="text-sm">Level 2</div>
                            <div className="text-sm">Level 3</div>
                        </div>
                        <Progress aria-label="Level" value={60} />
                    </div>
                    <div className="flex justify-end items-center gap-1 text-end h-full text-[#979797]">
                        <div className="text-sm">Suivant : Bannière Squelettes</div>
                        <div className="flex relative h-8 items-center justify-center">
                            <Image
                                id="NextRewardImageProfil"
                                className="sticky rounded-md h-full transition-all ease-in-out transform"
                                classNames={{ wrapper: "h-full" }}
                                src="/assets/Squelettes.png"
                                alt="Bannière Squelettes"
                            />
                        </div>
                    </div>

                </div>
            </div>


            <div className="flex flex-col gap-6 h-[60%]">

                <div className='flex flex-col gap-2 h-1/2'>
                    <Button as={Link} href={`#`} variant='flat' color='primary' className='w-max rounded-sm text-white'>
                        Mes bannières
                    </Button>
                    <div className='relative flex h-full gap-6 bg-[#1c1c1c] rounded-md py-2 px-3 overflow-x-auto'>
                        <div id='BannersWrapper' className="overflow-x-auto flex w-full h-full gap-6 scroll-smooth">
                            <div className="h-full aspect-square bg-[#2e2e2e] rounded-md"></div>
                            <div className="h-full aspect-square bg-[#2e2e2e] rounded-md"></div>
                            <div className="h-full aspect-square bg-[#2e2e2e] rounded-md"></div>
                            <div className="h-full aspect-square bg-[#2e2e2e] rounded-md"></div>
                            <div className="h-full aspect-square bg-[#2e2e2e] rounded-md"></div>
                            <div className="h-full aspect-square bg-[#2e2e2e] rounded-md">+</div>
                        </div>
                    </div>
                </div>


                <div className='flex flex-col gap-2 h-1/2'>
                    <Button as={Link} href={`#`} variant='flat' color='primary' className='w-max rounded-sm text-white'>
                        Mes badges
                    </Button>
                    <div className='relative flex h-full gap-6 bg-[#1c1c1c] rounded-md py-2 px-3'>
                        <div id='BadgesWrapper' className="overflow-x-auto flex w-full h-full gap-6 scroll-smooth">
                            <div className="h-full aspect-square bg-[#2e2e2e] rounded-md"></div>
                            <div className="h-full aspect-square bg-[#2e2e2e] rounded-md"></div>
                            <div className="h-full aspect-square bg-[#2e2e2e] rounded-md"></div>
                            <div className="h-full aspect-square bg-[#2e2e2e] rounded-md"></div>
                            <div className="h-full aspect-square bg-[#2e2e2e] rounded-md"></div>
                            <div className="h-full aspect-square bg-[#2e2e2e] rounded-md">+</div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Infos;