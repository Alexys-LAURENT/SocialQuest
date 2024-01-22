'use client'
import React, { useState } from 'react';
import { Tabs, Tab, Input } from "@nextui-org/react";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';

const Form = ({ signIn, signUp, searchParams, }: { signIn: (arg1: FormData) => void, signUp: (arg1: FormData) => void, searchParams: { message: string } }) => {

    const [isVisibleLogin, setIsVisibleLogin] = useState(false);
    const [isVisibleRegister1, setIsVisibleRegister1] = useState(false);
    const [isVisibleRegister2, setIsVisibleRegister2] = useState(false);

    const toggleVisibilityLogin = () => setIsVisibleLogin(!isVisibleLogin);
    const toggleVisibilityRegister1 = () => setIsVisibleRegister1(!isVisibleRegister1);
    const toggleVisibilityRegister2 = () => setIsVisibleRegister2(!isVisibleRegister2);

    const loginWithGoogle2 = async (e: any) => {
        e.preventDefault()
        const supabase = createClient()
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
            }
        })
    }

    return (
        <div className="flex flex-col items-center w-full h-full gap-4">
            <h1 className='mb-8 text-3xl sm:text-5xl text-textLight font-bold'>SOCIAL QUEST</h1>

            <Tabs aria-label="Options" defaultSelectedKey="Se Connecter">
                <Tab key="Se Connecter" title="Se Connecter" className="text-textLight w-full max-w-lg correctOutlineNone">
                    <form
                        className="animate-in flex flex-col w-full justify-center gap-6 text-foreground items-center"
                        action={signIn}
                    >
                        <Input type="email" placeholder='Email' name='email' label='Email' labelPlacement='outside' required />
                        <Input
                            placeholder="Mot de passe"
                            id='password'
                            label='Mot de passe'
                            labelPlacement='outside'
                            name="password"
                            endContent={
                                <button className="focus:outline-none h-5 w-5" type="button" onClick={toggleVisibilityLogin}>
                                    {isVisibleLogin ? (
                                        <EyeSlashIcon className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                                </button>
                            }
                            type={isVisibleLogin ? "text" : "password"}
                        />
                        <button className="bg-[#0070f0] rounded-md px-4 py-3 mt-4 text-2xl font-bold text-foreground mb-2 w-[90%]">
                            Se connecter
                        </button>
                        {/* login with google button */}
                        <button onClick={loginWithGoogle2} className="bg-white flex justify-center items-center gap-4 rounded-md px-4 py-3 mt-4 text-2xl font-bold mb-2 w-[90%] text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                                <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                            </svg>
                            Se connecter avec Google
                        </button>
                        {searchParams?.message && (
                            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                                {searchParams.message}
                            </p>
                        )}
                    </form>
                </Tab>
                <Tab key="S'inscrire" title="S'inscrire" className="text-textLight w-full max-w-lg">
                    <form
                        className="animate-in flex flex-col w-full justify-center gap-6 text-foreground items-center"
                        action={signUp}
                    >
                        <Input placeholder='Nom' name='nom' label='Nom' labelPlacement='outside' required />
                        <Input placeholder='Prénom' name='prenom' label='Prénom' labelPlacement='outside' required />
                        <Input type="email" placeholder='Email' name='email' label='Email' labelPlacement='outside' required />
                        <Input placeholder='Username' name='username' label='Username' labelPlacement='outside' required />
                        <Input
                            placeholder="Mot de passe"
                            id='passwordReg1'
                            name="password"
                            label='Mot de passe'
                            labelPlacement='outside'
                            endContent={
                                <button className="focus:outline-none h-5 w-5" type="button" onClick={toggleVisibilityRegister1}>
                                    {isVisibleRegister1 ? (
                                        <EyeSlashIcon className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                                </button>
                            }
                            type={isVisibleRegister1 ? "text" : "password"}
                        />
                        <Input
                            placeholder="Confirmer le mot de passe"
                            id='passwordReg2'
                            name="password2"
                            label='Confirmer le mot de passe'
                            labelPlacement='outside'
                            endContent={
                                <button className="focus:outline-none h-5 w-5" type="button" onClick={toggleVisibilityRegister2}>
                                    {isVisibleRegister2 ? (
                                        <EyeSlashIcon className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                                </button>
                            }
                            type={isVisibleRegister2 ? "text" : "password"}
                        />
                        <button className="bg-[#0070f0] rounded-md px-4 py-3 mt-4 text-2xl font-bold text-foreground mb-2 w-[90%]">
                            S'inscrire
                        </button>
                        {searchParams?.message && (
                            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                                {searchParams.message}
                            </p>
                        )}
                    </form>
                </Tab>
            </Tabs>

        </div>
    );
};

export default Form;