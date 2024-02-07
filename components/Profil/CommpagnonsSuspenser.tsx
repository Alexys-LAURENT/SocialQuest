import React from 'react';
import Compagnons from './Compagnons';
import { Profile } from '@/app/types/entities';
import { getUserFriends } from '@/utils/getUserFriends';

const CommpagnonsSuspenser = async ({ isUserProfil, pageProfile }: { isUserProfil: boolean, pageProfile: Profile }) => {
    const userFriends = await getUserFriends(pageProfile.id_user);
    return (
        <Compagnons isUserProfil={isUserProfil} userFriends={userFriends as unknown as Profile[]} pageProfile={pageProfile} />
    );
};

export default CommpagnonsSuspenser;