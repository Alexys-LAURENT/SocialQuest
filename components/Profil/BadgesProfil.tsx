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
                        <div key={`CardBadgeProfilePage${badge.id_item_user}`} className="relative h-full aspect-square bg-[#dadada] dark:bg-[#2e2e2e] rounded-md transition-all !duration-500">
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