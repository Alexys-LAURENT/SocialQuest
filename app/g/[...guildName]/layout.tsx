import { ReactNode } from 'react';
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getGuildInfos } from '@/utils/getGuildInfos';
import JoinQuitButton from '@/components/guildes/JoinQuitButton';
import { getProfileConnected } from '@/utils/getProfileConnected';
import EditGuildButton from '@/components/guildes/EditGuildButton';
import dynamic from 'next/dynamic'
import Image from 'next/image';


const DynamicPostInput = dynamic(() => import('@/components/PostInput'))



const layout = async ({
    children,
    params, guildactivities, guildwars
}: {
    children: ReactNode,
    params: { guildName: string },
    guildactivities: ReactNode,
    guildwars: ReactNode
}) => {
    if (params.guildName[1] && params.guildName[1] !== "activities" && params.guildName[1] !== "guildwars") redirect(`/g/${params.guildName[0]}`)
    const guilde = await getGuildInfos(params.guildName[0])
    const user = await getProfileConnected()

    return (


        <div className="h-full w-full flex flex-col overflow-y-auto overflow-x-hidden items-center">
            <div className="relative w-full min-h-[10rem] md:min-h-[18rem] bg-white bg-cover bg-center transition-all" style={{ backgroundImage: "url('/assets/Jane.png')" }}>

            </div>

            <div className="relative w-full min-h-[7rem] max-w-[1280px]">
                <div className="flex relative -top-14 md:-top-20 left-10 md:left-20 lg:left-40 gap-2 md:gap-4 transition-all duration-500">

                    <Image src={guilde.avatar_url} className={`h-28 w-28 md:h-40 md:w-40 rounded-full text-large transition-all`} alt={guilde.avatar_url} width={400} height={400} priority quality={100} />
                    <div className="relative flex flex-col">
                        <p className="absolute w-max text-xl md:text-2xl font-semibold bottom-2 md:bottom-7">
                            {guilde!.nom}
                        </p>
                    </div>
                </div>
                <div className="flex absolute bottom-2 md:top-5 left-10 md:right-20 lg:right-40 md:left-auto gap-4 md:transition-all">
                    {
                        guilde.created_by === user?.id_user ?
                            <EditGuildButton />
                            :
                            <JoinQuitButton guilde={guilde} user={user} />
                    }
                </div>
            </div>





            {/*  */}
            <div className="flex max-w-[1280px] w-full p-4 gap-6 mt-6">

                <div className="hidden lg:flex min-w-[17rem]">
                    <div className="w-full flex flex-col bg-bgLightCard dark:bg-bgDarkCard rounded-md text-xl font-semibold h-fit">
                        <Link href={`/g/${params.guildName[0]}`} className='hover:bg-[#767676] hover:bg-opacity-75 py-1 px-2 rounded-md transition-all ease-in-out'>
                            Feed
                        </Link>
                        <Link href={`/g/${params.guildName[0]}/activities`} className='hover:bg-[#767676] hover:bg-opacity-75 py-1 px-2 rounded-md transition-all ease-in-out'>
                            Activités
                        </Link>
                        <Link href={`/g/${params.guildName[0]}/guildwars`} className='hover:bg-[#767676] hover:bg-opacity-75 py-1 px-2 rounded-md transition-all ease-in-out'>
                            Combats de Guildes
                        </Link>
                    </div>
                </div>


                <div className="flex flex-col w-full gap-10">

                    {!params.guildName[1] && user && <DynamicPostInput id_guilde={guilde!.id_guilde} />}
                    {params.guildName[1] === "activities" && guildactivities}
                    {params.guildName[1] === "guildwars" && guildwars}
                    {!params.guildName[1] && children}

                </div>

                <div className="hidden md:flex flex-col min-w-[17rem] gap-4 h-fit">
                    <div className="p-2 w-full flex flex-col bg-bgLightCard dark:bg-bgDarkCard rounded-md">
                        <div className="text-xl font-semibold min-h-[25rem]">
                            <h4>A propos</h4>
                            <span className='text-sm font-normal'>
                                {guilde!.description}
                            </span>
                        </div>
                    </div>
                    <div className="p-2 w-full flex flex-col bg-bgLightCard dark:bg-bgDarkCard rounded-md">
                        <div className="text-xl font-semibold min-h-[25rem]">
                            <h4>Membres ({guilde!.usersCount})</h4>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default layout;