import React from 'react';
import { Link, Button } from '@nextui-org/react'
import { Profile } from '@/app/types/entities';
import APropos from './APropos';
import { getNextRewards } from "@/utils/getNextRewards";
import BannieresProfil from './BannieresProfil';
import BadgesProfil from './BadgesProfil';
import { Suspense } from 'react';
import ProfileItemSkeleton from '../Skeletons/ProfileItemSkeleton';

const Infos = async ({ isUserProfil, user }: { isUserProfil: boolean, user: Profile | null }) => {

    const nextRewards = await getNextRewards(user?.niveaux?.libelle!);

    return (
        <div className="flex flex-col w-full h-[35rem] lg:w-4/6 gap-0 sm:gap-6 rounded-md transition-all">


            <APropos isUserProfil={isUserProfil} user={user} nextRewards={nextRewards} />

            <div className="flex flex-col gap-6 h-[60%] justify-center">

                <div className='flex flex-col gap-2 h-[40%] sm:h-1/2'>
                    <Button as={Link} href={`/inventaire?q=Bannières`} variant='flat' color='primary' className='w-max rounded-sm text-textLight'>
                        {isUserProfil ? ("Mes bannières") : ("Bannières")}
                    </Button>
                    <div className='relative flex h-full gap-6 bg-[#1c1c1c] rounded-md py-2 px-3 overflow-x-auto'>
                        <div id='BannersWrapper' className="overflow-x-auto flex w-full h-full gap-6 scroll-smooth">
                            <Suspense fallback={<ProfileItemSkeleton />}>
                                <BannieresProfil isUserProfil={isUserProfil} user={user} />
                            </Suspense>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-2 h-[40%] sm:h-1/2'>
                    <Button as={Link} href={`/inventaire?q=Badges`} variant='flat' color='primary' className='w-max rounded-sm text-textLight'>
                        {isUserProfil ? ("Mes badges") : ("Badges")}
                    </Button>
                    <div className='relative flex h-full gap-6 bg-[#1c1c1c] rounded-md py-2 px-3'>
                        <div id='BadgesWrapper' className="overflow-x-auto flex w-full h-full gap-6 scroll-smooth">
                            <Suspense fallback={<ProfileItemSkeleton />}>
                                <BadgesProfil isUserProfil={isUserProfil} user={user} />
                            </Suspense>
                        </div >
                    </div >
                </div >

            </div>
        </div>

    );
};

export default Infos;