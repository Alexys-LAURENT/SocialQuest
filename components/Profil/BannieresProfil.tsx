import React from 'react';
import { Button, Link } from '@nextui-org/react';
import { getBannieresUser } from '@/utils/getItemsProfil';
import { Item, Profile } from '@/app/types/entities';
import Image from 'next/image';

const BannieresProfil = async ({ isUserProfil, user }: { isUserProfil: boolean, user: Profile | null }) => {

    const bannieres = await getBannieresUser(user?.id_user!) as unknown as Item[];

    return (
        <>
            {
                bannieres.map((banniere, index) => {
                    return (
                        <div key={`CardBannieresProfilePage${index}`} className="relative h-full aspect-square bg-[#2e2e2e] rounded-md">
                            <Image className="rounded-md object-cover" src={banniere.items.image_url} alt="Banniere" fill />
                        </div>
                    )
                }
                )
            }
        </>
    );
};

export default BannieresProfil;