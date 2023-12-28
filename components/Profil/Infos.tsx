'use client';
import React from 'react';
import { Link, Button, Progress } from '@nextui-org/react'
import Image from '@/components/Image';
import { CheckIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { createBrowserClient } from '@supabase/ssr'

const Infos = ({ isUserProfil, data }: { isUserProfil: boolean, data: any }) => {
    const [isEditingAPropos, setIsEditingAPropos] = React.useState(false);

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const handleSaveEditAPropos = () => {
        supabase
            .from('profiles')
            .update({ a_propos: (document.getElementById('textAreaEditAPropos') as HTMLTextAreaElement).value })
            .eq('id_user', data?.id_user)
            .then(() => {

                supabase
                    .from('profiles')
                    .select('a_propos')
                    .eq('id_user', data?.id_user)
                    .single()
                    .then(({ data: newData }) => {
                        data.a_propos = newData?.a_propos;
                        setIsEditingAPropos(false);
                    })
            })
    }

    const handleCancelEditAPropos = () => {
        setIsEditingAPropos(false);
    }

    return (
        <div className="flex flex-col w-full h-[35rem] lg:w-4/6 gap-6 rounded-md transition-all">


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
                    <div className="font-light text-sm h-full">
                        {!isEditingAPropos ? (
                            (data?.a_propos !== null && data?.a_propos !== undefined && data?.a_propos !== ""
                                ? data?.a_propos
                                : isUserProfil ? "Vous n'avez pas encore rempli cette section" : "L'utilisateur n'a pas encore rempli cette section")
                        ) : (
                            <div className="h-full relative">
                                <textarea
                                    id="textAreaEditAPropos"
                                    className="p-1 resize-none w-full h-full bg-[#2e2e2e] rounded-md text-textLight focus:outline-none"
                                    defaultValue={data?.a_propos}
                                    maxLength={150}
                                    onChange={() => {
                                        const textArea = document.getElementById('textAreaEditAPropos') as HTMLTextAreaElement;
                                        const textAreaLength = document.getElementById('textAreaEditAProposLength');
                                        if (textArea && textAreaLength) {
                                            textAreaLength.innerHTML = textArea.value.length.toString();
                                        }
                                        if (textArea.value.length > 150) {
                                            textArea.style.color = 'red';
                                        } else {
                                            textArea.style.color = 'rgb(224 224 224)';
                                        }
                                    }}
                                />
                                <div className="absolute flex gap-1 bottom-1 right-1 text-[10px] text-gray-300">
                                    <span id='textAreaEditAProposLength'>
                                        {data?.a_propos?.length ?? 0}
                                    </span>
                                    / 150
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {!isEditingAPropos &&
                    <div className='flex flex-col gap-2 h-[50%] bg-[#1c1c1c] rounded-md py-2 px-3'>
                        <div>
                            <div className="flex justify-between items-center">
                                <div className="text-sm">Level 2</div>
                                <div className="text-sm">Level 3</div>
                            </div>
                            <Progress aria-label="Level" value={60} />
                        </div>
                        <div className="flex justify-end items-center gap-1 text-end h-full text-[#979797]">
                            <div className="text-sm">Suivant : Bannière Squelettes</div>
                            <div className="flex relative h-8 items-center justify-center">
                                <Image
                                    src="/assets/Squelettes.png"
                                    alt="Bannière Squelettes"
                                />
                            </div>
                        </div>
                    </div>
                }
            </div>


            <div className="flex flex-col gap-6 h-[60%]">

                <div className='flex flex-col gap-2 h-1/2'>
                    <Button as={Link} href={`#`} variant='flat' color='primary' className='w-max rounded-sm text-textLight'>
                        {isUserProfil ? ("Mes bannières") : ("Bannières")}
                    </Button>
                    <div className='relative flex h-full gap-6 bg-[#1c1c1c] rounded-md py-2 px-3 overflow-x-auto'>
                        <div id='BannersWrapper' className="overflow-x-auto flex w-full h-full gap-6 scroll-smooth">
                            <div className="h-full aspect-square bg-[#2e2e2e] rounded-md"></div>
                            <div className="h-full aspect-square bg-[#2e2e2e] rounded-md"></div>
                            <div className="h-full aspect-square bg-[#2e2e2e] rounded-md"></div>
                            <div className="h-full aspect-square bg-[#2e2e2e] rounded-md"></div>
                            <div className="h-full aspect-square bg-[#2e2e2e] rounded-md"></div>
                        </div>
                    </div>
                </div>


                <div className='flex flex-col gap-2 h-1/2'>
                    <Button as={Link} href={`#`} variant='flat' color='primary' className='w-max rounded-sm text-textLight'>
                        {isUserProfil ? ("Mes badges") : ("Badges")}
                    </Button>
                    <div className='relative flex h-full gap-6 bg-[#1c1c1c] rounded-md py-2 px-3'>
                        <div id='BadgesWrapper' className="overflow-x-auto flex w-full h-full gap-6 scroll-smooth">
                            <div className="h-full aspect-square bg-[#2e2e2e] rounded-md"></div>
                            <div className="h-full aspect-square bg-[#2e2e2e] rounded-md"></div>
                            <div className="h-full aspect-square bg-[#2e2e2e] rounded-md"></div>
                            <div className="h-full aspect-square bg-[#2e2e2e] rounded-md"></div>
                            <div className="h-full aspect-square bg-[#2e2e2e] rounded-md"></div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Infos;