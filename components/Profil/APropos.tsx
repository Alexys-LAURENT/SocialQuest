"use client";
import React from 'react';
import { Button, Progress } from '@nextui-org/react'
import { Image } from 'antd';
import { CheckIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { createBrowserClient } from '@supabase/ssr'
import { NextReward, Profile } from '@/app/types/entities';


const APropos = ({ isUserProfil, user, nextRewards }: { isUserProfil: boolean, user: Profile | null, nextRewards: NextReward[] | null }) => {
    const [isEditingAPropos, setIsEditingAPropos] = React.useState(false);
    const progressValue = (user?.xp! - user?.niveaux.xp_debut!) * 100 / (user?.niveaux.xp_fin! + 1);

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const handleSaveEditAPropos = () => {
        supabase
            .from('profiles')
            .update({ a_propos: (document.getElementById('textAreaEditAPropos') as HTMLTextAreaElement).value })
            .eq('id_user', user?.id_user)
            .then(() => {

                supabase
                    .from('profiles')
                    .select('a_propos')
                    .eq('id_user', user?.id_user)
                    .single()
                    .then(({ data: newData }) => {
                        user!.a_propos = newData?.a_propos;
                        setIsEditingAPropos(false);
                    })
            })
    }

    const handleCancelEditAPropos = () => {
        setIsEditingAPropos(false);
    }

    return (
        <div className="flex flex-col gap-6 h-[40%]">
            <div className={`flex flex-col gap-1 ${!isEditingAPropos ? 'h-[50%]' : 'h-full'} bg-[#1c1c1c] rounded-md py-2 px-3`}>
                <div className="flex font-semibold items-center justify-between">
                    <h1>
                        A propos
                    </h1>
                    {isUserProfil && (
                        !isEditingAPropos ? (
                            <PencilIcon className="w-4 h-4 ml-2 cursor-pointer" onClick={() => setIsEditingAPropos(!isEditingAPropos)} />
                        ) : (
                            <div className="flex">
                                <CheckIcon className="stroke-green-500 w-5 h-5 ml-2 cursor-pointer" onClick={() => handleSaveEditAPropos()} />
                                <XMarkIcon className="stroke-red-500 w-5 h-5 ml-2 cursor-pointer" onClick={() => handleCancelEditAPropos()} />
                            </div>
                        )
                    )}
                </div>
                <div className="font-light text-sm h-full overflow-y-auto">
                    {!isEditingAPropos ? (
                        (user?.a_propos !== ""
                            ? user?.a_propos
                            : isUserProfil ? "Vous n'avez pas encore rempli cette section" : "L'utilisateur n'a pas encore rempli cette section")
                    ) : (
                        <div className="h-full relative">
                            <textarea
                                id="textAreaEditAPropos"
                                className="p-1 resize-none w-full h-full bg-[#2e2e2e] rounded-md text-textLight focus:outline-none"
                                defaultValue={user?.a_propos}
                                maxLength={150}
                                onChange={() => {
                                    (document.getElementById('textAreaEditAProposLength') as HTMLSpanElement).innerText = (document.getElementById('textAreaEditAPropos') as HTMLTextAreaElement).value.length.toString();
                                }}
                            />
                            <div className="absolute flex gap-1 bottom-1 right-1 text-[10px] text-gray-300">
                                <span id='textAreaEditAProposLength'>
                                    {user?.a_propos?.length ?? 0}
                                </span>
                                / 150
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {!isEditingAPropos &&
                <div className='flex flex-col justify-center gap-2 h-[50%] bg-[#1c1c1c] rounded-md py-2 px-3'>
                    <div>
                        <div className="flex justify-between items-center">
                            <div className="text-sm">Level {user?.niveaux.libelle!}</div>
                            <div className="text-sm">Level {user?.niveaux.libelle! + 1}</div>
                        </div>
                        <Progress aria-label="Level" title={`${(user?.xp! - user?.niveaux.xp_debut!)} / ${user?.niveaux.xp_fin! + 1} xp`} value={progressValue} />
                    </div>
                    <div className="flex justify-end items-center gap-1 text-end text-[#979797]">
                        {
                            isUserProfil && nextRewards && nextRewards.length > 0 && (
                                <>
                                    <div className="text-sm">Suivant : {nextRewards.length > 1 ? `${nextRewards.length} items` : nextRewards[0].items.nom}</div>
                                    <div className="flex relative items-center justify-center rounded-md">
                                        <Image.PreviewGroup preview={{ toolbarRender: () => (<></>), }}
                                            items={nextRewards.reduce((acc: any, item: any) => { acc.push(item.items.image_url); return acc; }, [])}>

                                            <Image className="h-7 w-auto aspect-auto rounded-md" src={nextRewards[0].items.image_url}
                                                alt={nextRewards[0].items.nom}></Image>

                                        </Image.PreviewGroup>
                                    </div>
                                </>
                            )
                        }

                    </div>
                </div>
            }
        </div>
    );
};

export default APropos;