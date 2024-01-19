import { getUserInventory } from "@/utils/getUserInventory";
import TabsFiltre from "@/components/inventaire/TabsFiltre";
import SelectedItem from "@/components/inventaire/SelectedItem";
import { Item } from "../types/entities";
import { getProfileConnected } from "@/utils/getProfileConnected";

const page = async () => {
    const inventory = await getUserInventory();
    const profileConnected = await getProfileConnected();
    return (
        <div className="h-full w-full flex flex-col overflow-y-auto overflow-x-hidden items-center">

            {/* content */}
            <div className="flex w-full h-full gap-8 max-w-[1280px] p-1 md:p-8 md:pe-0 md:pb-1">

                <TabsFiltre inventory={inventory as Item[]} profileConnected={profileConnected!} />

                <SelectedItem profileConnected={profileConnected!} />
            </div>
        </div>
    );
};

export default page;