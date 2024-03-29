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
        <div className="switchThemeWrapper px-1 py-1 flex justify-between dark:hover:bg-tempDarkHover hover:bg-tempLightHover hover:bg-opacity-75 text-textDark dark:text-textLight rounded-md cursor-pointer transition-all !duration-500" onClick={() => handleChange()}>
            <div className="flex gap-2 items-center">
                <MoonIcon className="w-5 h-5 text-textDark dark:text-textLight transition-all !duration-[100ms]" />
                <div className="text-sm font-semibold text-textDark dark:text-textLight transition-all !duration-[100ms]">Mode sombre</div>
            </div>
            <div className="flex items-center">
                <Switch size='sm' id="SwitchTheme" aria-label="Mode sombre" classNames={{ wrapper: "mr-0 bg-[#d9d9d9] h-5" }} isSelected={checked} onClick={() => handleChange()} />
            </div>
        </div>
    );
};

export default SwitchTheme;