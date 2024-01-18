import { getUserInventory } from "@/utils/getUserInventory";
import TabsFiltre from "@/components/inventaire/TabsFiltre";
import SelectedItem from "@/components/inventaire/SelectedItem";
import { Item } from "../types/entities";

const page = async () => {
    const inventory = await getUserInventory();

    return (
        <div className="h-full w-full flex flex-col overflow-y-auto overflow-x-hidden items-center">

            {/* content */}
            <div className="flex w-full h-full gap-8 max-w-[1280px] p-8">
                <div className="w-full h-full gap-6 flex flex-col">
                    <TabsFiltre inventory={inventory as Item[]} />
                </div>
                <div className="min-w-[300px] hidden lg:flex flex-col bg-darkSecondary rounded-md">
                    <SelectedItem />
                </div>
            </div>
        </div>
    );
};

export default page;