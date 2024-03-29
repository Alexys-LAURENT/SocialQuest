'use client'
import { Input } from "@nextui-org/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Profile } from "@/app/types/entities";
import { Dispatch, SetStateAction, useState } from "react";
import { getUserFriends } from "@/utils/getUserFriends";
const SearchBar = ({ setListFriends, id_userPageProfile }: { setListFriends: Dispatch<SetStateAction<Profile[]>>, id_userPageProfile: string }) => {
    const [inputValue, setInputValue] = useState('');
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if (e.target.value.length > 0) {
            const newList = await getUserFriends(id_userPageProfile, e.target.value);
            setListFriends(newList as unknown as Profile[]);
        } else {
            const newList = await getUserFriends(id_userPageProfile);
            setListFriends(newList as unknown as Profile[]);
        }
    }

    return (
        <Input classNames={{ inputWrapper: "bg-tempBgLightTertiary dark:bg-tempBgDarkTertiary group-data-[focus=true]:bg-tempBgLightTertiary dark:group-data-[focus=true]:bg-tempBgDarkTertiary dark:hover:bg-tempDarkHover transition-all !duration-500" }} onChange={(e) => handleChange(e)} value={inputValue} startContent={<MagnifyingGlassIcon className="w-5 h-5 text-textDark dark:text-textLight !duration-[125ms]" />}></Input>
    );
}

export default SearchBar;