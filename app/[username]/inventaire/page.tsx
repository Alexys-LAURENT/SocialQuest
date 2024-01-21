import { getUserInventory } from "@/utils/getUserInventory";
import TabsFiltre from "@/components/inventaire/TabsFiltre";
import SelectedItem from "@/components/inventaire/SelectedItem";
import { Item } from "@/app/types/entities";
import { getProfileConnected } from "@/utils/getProfileConnected";
import { getPageProfile } from "@/utils/getPageProfile";
import { notFound } from 'next/navigation'

const page = async ({ params, searchParams }: { params: { username: string }, searchParams: { q: string } }) => {

    const inventory = await getUserInventory(params.username);
    const pageProfile = await getPageProfile(params.username)
    const profileConnected = await getProfileConnected();
    const isUserInventory = pageProfile?.id_user === (profileConnected?.id_user ?? '');

    if (pageProfile === null) {
        notFound()
    }


    return (
        <div className="h-full w-full flex flex-col overflow-y-auto overflow-x-hidden items-center">

            {/* content */}
            <div className="flex w-full h-full gap-4 lg:gap-8 max-w-[1280px] p-1 md:ps-8 md:pe-2 md:pb-2">

                <TabsFiltre inventory={inventory as Item[]} profileConnected={profileConnected!} filterParam={searchParams.q} isUserInventory={isUserInventory} pageProfile={pageProfile} />

                <SelectedItem profileConnected={profileConnected!} pageProfile={pageProfile} isUserInventory={isUserInventory} />
            </div>
        </div>
    );
};

export default page;