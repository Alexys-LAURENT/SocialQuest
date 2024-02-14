import { Avatar, Badge, Button } from "@nextui-org/react";
import Link from "next/link";
import { getTopMembres } from '@/utils/getTopMembres';


const TopMembresItems = async () => {
    const topMembres = await getTopMembres();

    return (
        <div className="flex flex-col gap-2">
            {topMembres.map((membre: any, index: any) => (
                <Button key={`member-topItem-${index}-${Math.random}`} as={Link} className="p-0 text-sm text-textDark dark:text-textLight transition-all !duration-[125ms] h-auto"
                    href={membre.username}
                >
                    <div className="px-2 py-1 relative flex items-center justify-between gap-2 h-full w-full rounded-md bg-bgLightPopover dark:bg-bgDarkPopover transition-all !duration-500">
                        <div className="flex items-center">
                            <div className="flex items-center justify-center bg-bgLightPopover dark:bg-bgDarkPopover rounded-full">
                                <Avatar src={membre.avatar_url || ''} className="rounded-full text-large transition-all w-[40px] h-[40px]" />
                            </div>
                            <div className="flex flex-col ml-2 text-textDark dark:text-textLight transition-all">
                                {membre.username}
                            </div>
                        </div>
                        <div className="flex items-center w-3 h-full text-textDark dark:text-textLight transition-all">
                            <Badge className="rounded-full bg-secondary" content={membre.level}> </Badge>
                        </div>
                    </div>
                </Button>
            ))}
        </div>
    );
};

export default TopMembresItems;