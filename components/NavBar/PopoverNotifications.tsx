import React from "react";
import Link from "next/link";
import { Image } from "@nextui-org/react";
import { Badge } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

const PopoverNotifications = () => {
    return (
        <Popover placement="bottom" offset={20} classNames={{ base: " w-[18.5rem]" }}>
            <PopoverTrigger>
                <div className="flex items-center cursor-pointer">
                    <Badge content="5" color="danger" className="text-xs">
                        <BellIcon className="w-6 h-6" />
                    </Badge>
                </div>
            </PopoverTrigger>
            <PopoverContent className="bg-[#3b3b3b]">
                <div className="w-full px-1 py-2 gap-2 flex flex-col">
                    <div className="flex justify-between items-center">
                        <div className="text-sm">Notifications</div>
                        <Button as={Link} color="danger" href="#" variant="flat" className="h-7">
                            Voir tout
                        </Button>
                    </div>
                    <div id="PopoverNotificationsWrapper" className="flex flex-col max-h-[17.5rem] overflow-y-auto">
                        <Link className="flex items-center gap-2 border-t border-[#979797] py-2 hover:bg-[#4d4d52]"
                            href="#"
                        >
                            <div className="flex items-center px-2">
                                <div className="flex items-center justify-center bg-[#3b3b3b] rounded-full w-10 h-10">
                                    <Image
                                        className="rounded-full"
                                        src="https://i.pravatar.cc/150?u=a0e42581f4e290260f24d"
                                        alt="Avatar"
                                        width={40}
                                        height={40}
                                    />
                                </div>
                                <div className="flex flex-col ml-2">
                                    <div className="text-xs">Francis</div>
                                    <div className="text-xs">a répondu à votre commentaire</div>
                                </div>
                            </div>
                        </Link>
                        <Link className="flex items-center gap-2 border-t border-[#979797] py-2 hover:bg-[#4d4d52]"
                            href="#"
                        >
                            <div className="flex items-center px-2">
                                <div className="flex items-center justify-center bg-[#3b3b3b] rounded-full w-10 h-10">
                                    <Image
                                        className="rounded-full"
                                        src="https://i.pravatar.cc/150?u=a04258z1f4e290z26704d"
                                        alt="Avatar"
                                        width={40}
                                        height={40}
                                    />
                                </div>
                                <div className="flex flex-col ml-2">
                                    <div className="text-xs">Camille</div>
                                    <div className="text-xs">a commenté votre publication</div>
                                </div>
                            </div>
                        </Link>
                        <Link className="flex items-center gap-2 border-t border-[#979797] py-2 hover:bg-[#4d4d52]"
                            href="#"
                        >
                            <div className="flex items-center px-2">
                                <div className="flex items-center justify-center bg-[#3b3b3b] rounded-full w-10 h-10">
                                    <Image
                                        className="rounded-full"
                                        src="https://i.pravatar.cc/150?u=a0425z8a2462d826z712d"
                                        alt="Avatar"
                                        width={40}
                                        height={40}
                                    />
                                </div>
                                <div className="flex flex-col ml-2">
                                    <div className="text-xs">Lee</div>
                                    <div className="text-xs">a aimé votre commentaire</div>
                                </div>
                            </div>
                        </Link>
                        <Link className="flex items-center gap-2 border-t border-[#979797] py-2 hover:bg-[#4d4d52]"
                            href="#"
                        >
                            <div className="flex items-center px-2">
                                <div className="flex items-center justify-center bg-[#3b3b3b] rounded-full w-10 h-10">
                                    <Image
                                        className="rounded-full"
                                        src="https://i.pravatar.cc/150?u=a0425z8114e2902z6302d"
                                        alt="Avatar"
                                        width={40}
                                        height={40}
                                    />
                                </div>
                                <div className="flex flex-col ml-2">
                                    <div className="text-xs">Tristan</div>
                                    <div className="text-xs">a aimé votre publication</div>
                                </div>
                            </div>
                        </Link>
                        <Link className="flex items-center gap-2 border-t border-[#979797] py-2 hover:bg-[#4d4d52]"
                            href="#"
                        >
                            <div className="flex items-center px-2">
                                <div className="flex items-center justify-center bg-[#3b3b3b] rounded-full w-10 h-10">
                                    <Image
                                        className="rounded-full"
                                        src="https://i.pravatar.cc/150?u=a042z5811z4e29026708c"
                                        alt="Avatar"
                                        width={40}
                                        height={40}
                                    />
                                </div>
                                <div className="flex flex-col ml-2">
                                    <div className="text-xs">Sasha</div>
                                    <div className="text-xs">a commenté votre publication</div>
                                </div>
                            </div>
                        </Link>
                        <Link className="flex items-center gap-2 border-t border-[#979797] py-2 hover:bg-[#4d4d52]"
                            href="#"
                        >
                            <div className="flex items-center px-2">
                                <div className="flex items-center justify-center bg-[#3b3b3b] rounded-full w-10 h-10">
                                    <Image
                                        className="rounded-full"
                                        src="https://i.pravatar.cc/150?u=a04258z1f4e290260zz24d"
                                        alt="Avatar"
                                        width={40}
                                        height={40}
                                    />
                                </div>
                                <div className="flex flex-col ml-2">
                                    <div className="text-xs">Mathéo</div>
                                    <div className="text-xs">a aimé votre publication</div>
                                </div>
                            </div>
                        </Link>
                        <Link className="flex items-center gap-2 border-t border-[#979797] py-2 hover:bg-[#4d4d52]"
                            href="#"
                        >
                            <div className="flex items-center px-2">
                                <div className="flex items-center justify-center bg-[#3b3b3b] rounded-full w-10 h-10">
                                    <Image
                                        className="rounded-full"
                                        src="https://i.pravatar.cc/150?u=a042e58z1f4e290e260f24d"
                                        alt="Avatar"
                                        width={40}
                                        height={40}
                                    />
                                </div>
                                <div className="flex flex-col ml-2">
                                    <div className="text-xs">Francis</div>
                                    <div className="text-xs">a répondu à votre commentaire</div>
                                </div>
                            </div>
                        </Link>
                        <Link className="flex items-center gap-2 border-t border-[#979797] py-2 hover:bg-[#4d4d52]"
                            href="#"
                        >
                            <div className="flex items-center px-2">
                                <div className="flex items-center justify-center bg-[#3b3b3b] rounded-full w-10 h-10">
                                    <Image
                                        className="rounded-full"
                                        src="https://i.pravatar.cc/150?u=a0z4258z1f4e2z90260f24d"
                                        alt="Avatar"
                                        width={40}
                                        height={40}
                                    />
                                </div>
                                <div className="flex flex-col ml-2">
                                    <div className="text-xs">Léa</div>
                                    <div className="text-xs">a répondu à votre commentaire</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </PopoverContent>
        </Popover >
    );
};

export default PopoverNotifications;