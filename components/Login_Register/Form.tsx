'use client'
import React, { useState } from 'react';
import { Tabs, Tab, Input } from "@nextui-org/react";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const Form = ({ signIn, signUp, searchParams }: { signIn: (arg1: FormData) => void, signUp: (arg1: FormData) => void, searchParams: { message: string } }) => {

    const [isVisibleLogin, setIsVisibleLogin] = useState(false);
    const [isVisibleRegister1, setIsVisibleRegister1] = useState(false);
    const [isVisibleRegister2, setIsVisibleRegister2] = useState(false);

    const toggleVisibilityLogin = () => setIsVisibleLogin(!isVisibleLogin);
    const toggleVisibilityRegister1 = () => setIsVisibleRegister1(!isVisibleRegister1);
    const toggleVisibilityRegister2 = () => setIsVisibleRegister2(!isVisibleRegister2);

    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
            <h1 className='mb-8 text-3xl md:text-5xl text-textLight font-bold'>SOCIAL QUEST</h1>

            <Tabs aria-label="Options" defaultSelectedKey="Se Connecter" disableAnimation>
                <Tab key="Se Connecter" title="Se Connecter" className="text-textLight w-full max-w-lg">
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