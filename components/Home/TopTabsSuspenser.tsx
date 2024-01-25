import { getGuildesUser } from '@/utils/getGuildesUser';
import { getProfileConnected } from '@/utils/getProfileConnected';
import React from 'react';
import TopTabs from './TopTabs';

const TopTabsSuspenser = async () => {
    const user = await getProfileConnected()
    const guildesUser = await getGuildesUser()

    return (
        <TopTabs user={user} guildesUser={guildesUser} />
    );
};

export default TopTabsSuspenser;