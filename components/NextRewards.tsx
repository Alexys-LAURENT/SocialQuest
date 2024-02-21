import { Profile } from "@/app/types/entities";
import { getNextRewards } from "@/utils/getNextRewards";

import { Image } from 'antd';
const { PreviewGroup } = Image;

const NextRewards = async ({ user }: { user: Profile }) => {
    const nextRewards = await getNextRewards(user.niveaux.libelle);

    return nextRewards && nextRewards.length > 0 && (
        <>
            <div className="text-tiny text-[#777777] dark:text-[#919191]">Suivant : {nextRewards.length > 1 ? `${nextRewards.length} items` : nextRewards[0].items.nom}</div>
            <div className="flex relative items-center justify-center">
                <PreviewGroup preview={{ toolbarRender: () => (<></>), }}
                    items={nextRewards.reduce((acc: string[], item: { items: { nom: string; type: string; damage?: number; id_item: string; image_url: string; }; }) => { acc.push(item.items.image_url); return acc; }, [])}>
                    <div className={`!h-6 relative rounded-sm overflow-hidden ${nextRewards[0].items.type === 'Bannière' ? 'aspect-video' : 'aspect-square'} aspect-square`}>
                        <Image rootClassName='!h-full !w-full' className="absolute top-0 left-0 right-0 bottom-0 w-full !h-full object-cover" src={nextRewards[0].items.image_url}
                            alt={nextRewards[0].items.nom}></Image>
                    </div>

                </PreviewGroup>
            </div>
        </>
    );
};

export default NextRewards;