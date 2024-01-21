import React, { useState } from 'react';
import { MoonIcon } from '@heroicons/react/24/outline';
import { Switch } from '@nextui-org/react';

const SwitchTheme = () => {
    const [checked, setChecked] = useState(false);

    return (
        <div className="px-1 py-1 flex justify-between hover:bg-[#767676] hover:bg-opacity-75 transition-all ease-in-out rounded-md cursor-pointer" onClick={() => setChecked(!checked)}>
            <div className="flex gap-2 items-center">
                <MoonIcon className="w-6 h-6" />
                <div className="">Mode sombre</div>
            </div>
            <div className="flex items-center">
                <Switch id="SwitchTheme" aria-label="Mode sombre" classNames={{ wrapper: "mr-1 bg-[#d9d9d9]" }} isSelected={checked} onClick={() => setChecked(!checked)} />
            </div>
        </div>
    );
};

export default SwitchTheme;