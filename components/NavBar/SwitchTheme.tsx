import { useState } from 'react';
import { MoonIcon } from '@heroicons/react/24/outline';
import { Switch } from '@nextui-org/react';
import { Profile } from '@/app/types/entities';
import { switchUserTheme } from '@/utils/switchUserTheme';

const SwitchTheme = ({ user }: { user: Profile | null }) => {
    const [checked, setChecked] = useState(document.getElementsByTagName('html')[0].classList.contains('dark') ? true : false);

    function handleChange() {
        setChecked(!checked);
        switchUserTheme(document.getElementsByTagName('html')[0].classList.contains('dark') ? 'light' : 'dark');
        document.getElementsByTagName('html')[0].classList.toggle('dark');
        document.getElementsByTagName('html')[0].classList.toggle('light');
    }

    return (
        <div className="switchThemeWrapper px-1 py-1 flex justify-between dark:hover:bg-[#767676] hover:bg-[#e5e5e5] hover:bg-opacity-75 text-textDark dark:text-textLight transition-all !duration-[100ms] rounded-md cursor-pointer" onClick={() => handleChange()}>
            <div className="flex gap-2 items-center">
                <MoonIcon className="w-6 h-6 text-textDark dark:text-textLight transition-all !duration-[125ms]" />
                <div className="">Mode sombre</div>
            </div>
            <div className="flex items-center">
                <Switch id="SwitchTheme" aria-label="Mode sombre" classNames={{ wrapper: "mr-1 bg-[#d9d9d9]" }} isSelected={checked} onClick={() => handleChange()} />
            </div>
        </div>
    );
};

export default SwitchTheme;