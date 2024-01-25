
import { getCurrentUserAllDiscussions } from '@/utils/getCurrentUserAllDiscussions';
import { DiscussionTab } from '@/app/types/entities';
import dynamic from 'next/dynamic';

const ListDiscussions = dynamic(() => import('@/components/Discussions/ListDiscussions'));

const ListDiscussionsSuspenser = async () => {

    const discussions = await getCurrentUserAllDiscussions()


    const refetchDiscussions = async () => {
        "use server"
        return await getCurrentUserAllDiscussions()
    }
    return (
        <ListDiscussions refetchDiscussions={refetchDiscussions} initDiscussions={discussions as unknown as DiscussionTab[]} />
    );
};

export default ListDiscussionsSuspenser;