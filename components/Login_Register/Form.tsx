'use client'
import { useState } from 'react';
import { Tabs, Tab, Input, Button } from "@nextui-org/react";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { createClient } from '@/utils/supabase/client';
import Google_logo from '@/public/assets/Google_logo.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Form = ({ signIn, signUp, searchParams, }: { signIn: (arg1: FormData) => void, signUp: (arg1: FormData) => void, searchParams: { message: string } }) => {

    const [isVisibleLogin, setIsVisibleLogin] = useState(false);
    const [isVisibleRegister1, setIsVisibleRegister1] = useState(false);
    const [isVisibleRegister2, setIsVisibleRegister2] = useState(false);

    const toggleVisibilityLogin = () => setIsVisibleLogin(!isVisibleLogin);
    const toggleVisibilityRegister1 = () => setIsVisibleRegister1(!isVisibleRegister1);
    const toggleVisibilityRegister2 = () => setIsVisibleRegister2(!isVisibleRegister2);

    const router = useRouter()

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
        <>
            <div className="py-8 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover text-sm">
                <div
                    onClick={() => router.back()}
                    className="cursor-pointer flex items-center w-max"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
                    >
                        <polyline points="15 18 9 12 15 6" />
                    </svg>{' '}
                    Retour
                </div>
            </div>
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
                            <Button className=" customButton bg-secondary/70 text-2xl font-semibold !w-[90%]" type='submit'>
                                Se connecter
                            </Button>
                            {/* separator */}
                            <div className="relative w-full flex items-center">
                                <div className="flex-grow border-t border-gray-400"></div>
                                <span className="flex-shrink mx-4 text-sm text-gray-400">OU</span>
                                <div className="flex-grow border-t border-gray-400"></div>
                            </div>
                            {/* login with google button */}
                            <Button variant='flat' onClick={loginWithGoogle2} className="bg-white flex items-center gap-2 rounded-full p-2 font-bold text-black justify-start">
                                <Image src={Google_logo} alt="Google logo" width={35} height={35} />
                                <span>Se connecter avec Google</span>
                            </Button>
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
                            <Button className="customButton bg-secondary/70 border-secondary text-2xl font-semibold !w-[90%]" type='submit'>
                                S'inscrire
                            </Button>
                            {searchParams?.message && (
                                <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                                    {searchParams.message}
                                </p>
                            )}
                        </form>
                    </Tab>
                </Tabs>

            </div>
        </>
    );
};

export default Form;