import React from 'react';
import { Button, Link } from '@nextui-org/react';
import { Item, Profile } from '@/app/types/entities';
import { getBadgesUser } from '@/utils/getItemsProfil';
import Image from 'next/image';

const BadgesProfil = async ({ isUserProfil, user }: { isUserProfil: boolean, user: Profile | null }) => {

    const badges = await getBadgesUser(user?.id_user!) as unknown as Item[];

    return (
        <>
            {
                badges.map((badge, index) => {
                    return (
                        <div key={`CardBadgeProfilePage${badge.id_item_user}`} className="relative h-full aspect-square bg-[#2e2e2e] rounded-md">
                            <Image className="rounded-md object-cover" src={badge.items.image_url} alt="Badge" fill />
                        </div>
                    )
                }
                )
            }
        </>
    );
};

export default BadgesProfil;