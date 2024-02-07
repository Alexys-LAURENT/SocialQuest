"use client";
import { Item } from '@/app/types/entities';
import Image from 'next/image';
import { toggleItemSelected } from '@/utils/toggleItemSelected';
import { useRouter } from 'next/navigation';

const BannieresProfil = ({ isUserProfil, bannieres }: { isUserProfil: boolean, bannieres: Item[] }) => {
    console.log(bannieres)

    const router = useRouter();

    return (
        <>
            {
                bannieres.map((banniere, index) => {
                    return (
                        <div key={`CardBannieresProfilePage${banniere.id_item_user}`} className="relative cursor-pointer h-full aspect-square bg-[#2e2e2e] rounded-md hover:opacity-70 transition-all" onClick={() => { isUserProfil && toggleItemSelected(banniere.id_item_user, banniere.is_equiped ? "desequip" : "equip"); router.refresh() }}>
                            <Image className="rounded-md object-cover" src={banniere.items.image_url} alt="Banniere" fill sizes='100%' />
                        </div>
                    )
                }
                )
            }
        </>
    );
};

export default BannieresProfil;