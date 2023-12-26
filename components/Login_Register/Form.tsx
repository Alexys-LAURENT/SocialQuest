'use client'
import React from 'react';
import { Tabs, Tab } from "@nextui-org/react";

const Form = ({ signIn, signUp, searchParams }: { signIn: (arg1: FormData) => void, signUp: (arg1: FormData) => void, searchParams: { message: string } }) => {


    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
            <h1 className='mb-8 text-5xl text-textLight font-bold'>SOCIAL QUEST</h1>

            <Tabs aria-label="Options" defaultSelectedKey="Se Connecter" disableAnimation>
                <Tab key="Se Connecter" title="Se Connecter" className="text-textLight w-full max-w-lg">
                    <form
                        className="animate-in flex flex-col w-full justify-center gap-6 text-foreground items-center"
                        action={signIn}
                    >
                        <input
                            className="py-3 w-full rounded-md px-4 bg-[#2e2e2e]  placeholder:text-textLight placeholder:font-semibold"
                            name="email"
                            placeholder="Email"
                            required
                        />
                        <input
                            className="w-full rounded-md px-4 py-3 bg-[#2e2e2e]  placeholder:text-textLight placeholder:font-semibold"
                            type="password"
                            name="password"
                            placeholder="Mot de passe"
                            required
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
                        <input
                            className="w-full rounded-md px-4 py-3 bg-[#2e2e2e]  placeholder:text-textLight placeholder:font-semibold"
                            name="nom"
                            placeholder="Nom"
                            required
                        />
                        <input
                            className="w-full rounded-md px-4 py-3 bg-[#2e2e2e]  placeholder:text-textLight placeholder:font-semibold"
                            name="prenom"
                            placeholder="Prénom"
                            required
                        />
                        <input
                            className="w-full rounded-md px-4 py-3 bg-[#2e2e2e]  placeholder:text-textLight placeholder:font-semibold"
                            name="email"
                            placeholder="Email"
                            required
                        />
                        <input
                            className="w-full rounded-md px-4 py-3 bg-[#2e2e2e]  placeholder:text-textLight placeholder:font-semibold"
                            type="password"
                            name="password"
                            placeholder="Mot de passe"
                            required
                        />
                        <input
                            className="w-full rounded-md px-4 py-3 bg-[#2e2e2e]  placeholder:text-textLight placeholder:font-semibold"
                            type="password"
                            name="password2"
                            placeholder="Confirmer le mot de passe"
                            required
                        />
                        <input
                            className="w-full rounded-md px-4 py-3 bg-[#2e2e2e]  placeholder:text-textLight placeholder:font-semibold"
                            name="username"
                            placeholder="Username"
                            required
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
        // <form
        //     className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        //     action={signIn}
        // >
        //     <label className="text-md" htmlFor="email">
        //         Email
        //     </label>
        //     <input
        //         className="rounded-md px-4 py-3 bg-[#2e2e2e]  placeholder:text-textLight placeholder:font-semibold  border mb-6"
        //         name="email"
        //         placeholder="you@example.com"
        //         required
        //     />
        //     <label className="text-md" htmlFor="password">
        //         Password
        //     </label>
        //     <input
        //         className="rounded-md px-4 py-3 bg-[#2e2e2e]  placeholder:text-textLight placeholder:font-semibold  border mb-6"
        //         type="password"
        //         name="password"
        //         placeholder="••••••••"
        //         required
        //     />
        //     <button className="bg-green-700 rounded-md px-4 py-3 text-foreground mb-2">
        //         Sign In
        //     </button>
        //     <button
        //         formAction={signUp}
        //         className="border border-foreground/20 rounded-md px-4 py-3 text-foreground mb-2"
        //     >
        //         Sign Up
        //     </button>
        //     {searchParams?.message && (
        //         <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
        //             {searchParams.message}
        //         </p>
        //     )}
        // </form>
    );
};

export default Form;