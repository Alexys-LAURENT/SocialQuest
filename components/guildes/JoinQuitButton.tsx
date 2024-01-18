"use client"
import { Button } from '@nextui-org/react';
import { useContext } from 'react';
import { ToasterContext } from '../../app/context/ToasterContext';
import { joinGuild, leaveGuild } from '@/utils/joinGuild';
import { Profile } from '@/app/types/entities';
import { useRouter } from 'next/navigation';
const JoinQuitButton = ({ guilde, user }: { guilde: any, user: Profile | null }) => {
    const { success, error } = useContext(ToasterContext)
    const router = useRouter()

    const handleJoinGuild = async () => {
        if (!user) { router.push("/login"); return }
        const res = await joinGuild(user.id_user, guilde!.id_guilde)
        if (res) {
            success("Vous avez rejoint la guilde")
        } else {
            error("Une erreur est survenue")
        }
        router.refresh()
    }

    const handleLeaveGuild = async () => {
        if (!user) { router.push("/login"); return }
        const res = await leaveGuild(user.id_user, guilde!.id_guilde)
        if (res) {
            success("Vous avez quitté la guilde")
        } else {
            error("Une erreur est survenue")
        }
        router.refresh()
    }

    return (
        <>
            {
                guilde!.isUserInGuilde ?
                    <Button onClick={() => handleLeaveGuild()} color="danger" >Quitter</Button>
                    :
                    <Button onClick={() => handleJoinGuild()}  >Rejoindre</Button>
            }
        </>
    );
};

export default JoinQuitButton;