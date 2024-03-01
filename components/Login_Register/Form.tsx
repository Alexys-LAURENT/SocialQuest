'use client'
import { useContext, useState } from 'react';
import { Tabs, Tab, Input, Button } from "@nextui-org/react";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { createClient } from '@/utils/supabase/client';
import Google_logo from '@/public/assets/Google_logo.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Spinner } from '@nextui-org/react';
import { getUsernameWhereName } from '@/utils/getUsernameWhereName';
import { ToasterContext } from '@/app/context/ToasterContext';
import { ModalForgotPassword } from '@/components/Login_Register/ModalForgotPassword';

const Form = ({ signIn, signUp, searchParams }: { signIn: (arg1: FormData) => void, signUp: (arg1: FormData) => void, searchParams: { message: string } }) => {
    const { error } = useContext(ToasterContext);

    const [isModalForgotPasswordOpen, setIsModalForgotPasswordOpen] = useState(false);

    const [emailInputLogin, setEmailInputLogin] = useState<string>('');
    const [passwordInputLogin, setPasswordInputLogin] = useState<string>('');

    const [isPasswordVisibleLogin, setIsVisibleLogin] = useState(false);
    const [isPasswordVisibleRegister1, setIsVisibleRegister1] = useState(false);
    const [isPasswordVisibleRegister2, setIsVisibleRegister2] = useState(false);
    const [isEmailInvalidLogin, setIsEmailInvalidLogin] = useState(false);


    const [firstNameInput, setFirstNameInput] = useState<string>('');
    const [lastNameInput, setLastNameInput] = useState<string>('');
    const [emailInputRegister, setEmailInputRegister] = useState<string>('');
    const [usernameInput, setUsernameInput] = useState<string>('');
    const [passwordInputRegister1, setPasswordInputRegister1] = useState<string>('');
    const [passwordInputRegister2, setPasswordInputRegister2] = useState<string>('');

    const [isEmailInvalidRegister, setIsEmailInvalidRegister] = useState(false);
    const [isUsernameInvalidRegister, setIsUsernameInvalidRegister] = useState({ value: false, reason: '' });
    const [isPasswordInvalidRegister1, setIsPasswordInvalidRegister1] = useState({ value: false, reason: '' });
    const [isPasswordInvalidRegister2, setIsPasswordInvalidRegister2] = useState({ value: false, reason: '' });


    const [isTyping, setIsTyping] = useState<boolean>(false);


    const toggleVisibilityLogin = () => setIsVisibleLogin(!isPasswordVisibleLogin);
    const toggleVisibilityRegister1 = () => setIsVisibleRegister1(!isPasswordVisibleRegister1);
    const toggleVisibilityRegister2 = () => setIsVisibleRegister2(!isPasswordVisibleRegister2);

    const isLoginFormValid = () => {
        return !isEmailInvalidLogin;
    }

    const isLoginFormFilled = () => {
        return emailInputLogin.length > 0 && passwordInputLogin.length > 0;
    }

    const isRegisterFormValid = () => {
        return !isEmailInvalidRegister && !isUsernameInvalidRegister.value && !isPasswordInvalidRegister1.value && !isPasswordInvalidRegister2.value;
    }

    const isRegisterFormFilled = () => {
        return usernameInput.length > 0 && passwordInputRegister1.length > 0 && passwordInputRegister2.length > 0 && emailInputRegister.length > 0 && firstNameInput.length > 0 && lastNameInput.length > 0;
    }

    const checkEmailValidityLogin = (e: any) => {
        const email = e.target as HTMLInputElement;
        setIsEmailInvalidLogin(!email.validity.valid);
    }

    const checkEmailValidityRegister = (e: any) => {
        const email = e.target as HTMLInputElement;
        setIsEmailInvalidRegister(!email.validity.valid);
    }

    const handleChangeInputNom = async (inputValue: string) => {
        setUsernameInput(inputValue);
        setIsTyping(true);

        if (inputValue.includes(' ')) {
            setUsernameInput(inputValue.replace(/\s/g, ''));
            error('Le username ne doit pas contenir d\'espaces');
            setIsTyping(false);
            return;
        }

        if ((await getUsernameWhereName(inputValue.replace(/\s/g, ''))) === false) {
            setIsUsernameInvalidRegister({ value: true, reason: 'Ce username est déjà utilisé' });
            setIsTyping(false);
            return;
        }

        setIsUsernameInvalidRegister({ value: false, reason: '' });
        setIsTyping(false);
    }

    const handlePasswordChange = () => {
        const password1 = document.getElementById('passwordReg1') as HTMLInputElement;
        const password2 = document.getElementById('passwordReg2') as HTMLInputElement;

        if (password1.value !== password2.value && password1.value.length > 0 && password2.value.length > 0) {
            setIsPasswordInvalidRegister2({ value: true, reason: 'Les mots de passe ne correspondent pas' });
        } else {
            setIsPasswordInvalidRegister2({ value: false, reason: '' });
        }

        // Check if the password is strong enough (8 characters, capital and lowercase letters, numbers, special characters
        if ((password1.value.length < 8 || password1.value.includes(' ') || !password1.value.match(/[A-Z]/) || !password1.value.match(/[a-z]/) || !password1.value.match(/[0-9]/) || !password1.value.match(/[^A-Za-z0-9]/)) && password1.value.length > 0) {
            setIsPasswordInvalidRegister1({ value: true, reason: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre, un caractère spécial et ne doit pas contenir d\'espace' });
        } else {
            setIsPasswordInvalidRegister1({ value: false, reason: '' });
        }
    }

    const handleRegister = () => {
        if (!isRegisterFormValid()) {
            return error('Veuillez remplir tous les champs correctement');
        }

        if (!isRegisterFormFilled()) {
            return error('Veuillez remplir tous les champs');
        }

        const formData = new FormData();

        formData.append('nom', firstNameInput);
        formData.append('prenom', lastNameInput);
        formData.append('email', emailInputRegister);
        formData.append('username', usernameInput);
        formData.append('password', passwordInputRegister1);
        formData.append('password2', passwordInputRegister2);

        signUp(formData);
    }

    const handleLogin = () => {
        if (!isLoginFormValid()) {
            return error('Veuillez remplir tous les champs correctement');
        }

        if (!isLoginFormFilled()) {
            return error('Veuillez remplir tous les champs');
        }

        const formData = new FormData();

        formData.append('email', emailInputLogin);
        formData.append('password', passwordInputLogin);

        signIn(formData);
    }

    const router = useRouter()

    const loginWithGoogle2 = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const supabase = createClient()
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
            }
        })
    }

    const handleSelectionChange = () => {
        router.push('/login');
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

                <Tabs aria-label="Options" defaultSelectedKey="Se Connecter" onSelectionChange={handleSelectionChange}>
                    <Tab key="Se Connecter" title="Se Connecter" className="text-textLight w-full max-w-lg correctOutlineNone">
                        <form
                            className="animate-in flex flex-col w-full justify-center gap-6 text-foreground items-center"
                            action={() => handleLogin()}
                        >
                            <Input id='emailLogin' type="email" placeholder='Email' name='email' label='Email' labelPlacement='outside' required
                                value={emailInputLogin}
                                isInvalid={isEmailInvalidLogin}
                                onBlur={(e) => checkEmailValidityLogin(e)}
                                errorMessage={isEmailInvalidLogin ? "Veuillez entrer une adresse email valide" : ""}
                                onChange={(e) => setEmailInputLogin(e.target.value)}
                            />
                            <div className="w-full flex flex-col gap-1">
                                <Input
                                    placeholder="Mot de passe"
                                    id='password'
                                    label='Mot de passe'
                                    labelPlacement='outside'
                                    name="password"
                                    required
                                    value={passwordInputLogin}
                                    endContent={
                                        <button className="focus:outline-none h-5 w-5" type="button" onClick={toggleVisibilityLogin}>
                                            {isPasswordVisibleLogin ? (
                                                <EyeSlashIcon className="text-2xl text-default-400 pointer-events-none" />
                                            ) : (
                                                <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                                            )}
                                        </button>
                                    }
                                    type={isPasswordVisibleLogin ? "text" : "password"}
                                    onChange={(e) => { setPasswordInputLogin(e.target.value) }}
                                />
                                <div className="w-full text-end">
                                    <div
                                        className="text-xs text-neutral-400 hover:underline hover:text-neutral-300 transition-all !duration-500 cursor-pointer"
                                        onClick={() => setIsModalForgotPasswordOpen(true)}
                                    >
                                        Mot de passe oublié ?
                                    </div>
                                    <ModalForgotPassword isOpen={isModalForgotPasswordOpen} setIsOpen={setIsModalForgotPasswordOpen} />
                                </div>
                            </div>
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

                    <Tab key="S'inscrire" title="S'inscrire" className="text-textLight w-full max-w-2xl">
                        <form
                            className="animate-in flex flex-col w-full justify-center gap-6 text-foreground items-center"
                            action={() => handleRegister()}
                        >
                            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Input placeholder='Nom' name='nom' label='Nom' labelPlacement='outside' required
                                    value={firstNameInput}
                                    onChange={(e) => setFirstNameInput(e.target.value)}
                                />
                                <Input placeholder='Prénom' name='prenom' label='Prénom' labelPlacement='outside' required
                                    value={lastNameInput}
                                    onChange={(e) => setLastNameInput(e.target.value)}
                                />
                                <Input type="email" placeholder='Email' name='email' label='Email' labelPlacement='outside' required
                                    value={emailInputRegister}
                                    isInvalid={isEmailInvalidRegister}
                                    onBlur={(e) => checkEmailValidityRegister(e)}
                                    errorMessage={isEmailInvalidRegister ? "Veuillez entrer une adresse email valide" : ""}
                                    onChange={(e) => setEmailInputRegister(e.target.value)}
                                />
                                <Input placeholder='Username' name='username' label='Username' labelPlacement='outside' required
                                    isInvalid={isUsernameInvalidRegister.value}
                                    value={usernameInput}
                                    onChange={(e) => handleChangeInputNom(e.target.value)}
                                    endContent={
                                        <Spinner size="sm" className={`scale-75 ${!isTyping ? 'hidden' : ''} `} color="white" />
                                    }
                                    errorMessage={isUsernameInvalidRegister.reason}
                                />
                            </div>
                            <Input
                                placeholder="Mot de passe"
                                id='passwordReg1'
                                name="password"
                                label='Mot de passe'
                                labelPlacement='outside'
                                value={passwordInputRegister1}
                                endContent={
                                    <button className="focus:outline-none h-5 w-5" type="button" onClick={toggleVisibilityRegister1}>
                                        {isPasswordVisibleRegister1 ? (
                                            <EyeSlashIcon className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                }
                                type={isPasswordVisibleRegister1 ? "text" : "password"}
                                isInvalid={isPasswordInvalidRegister1.value}
                                errorMessage={isPasswordInvalidRegister1.reason}
                                onChange={(e) => { setPasswordInputRegister1(e.target.value) }}
                                onBlur={handlePasswordChange}
                            />
                            <Input
                                placeholder="Confirmer le mot de passe"
                                id='passwordReg2'
                                name="password2"
                                label='Confirmer le mot de passe'
                                labelPlacement='outside'
                                value={passwordInputRegister2}
                                endContent={
                                    <button className="focus:outline-none h-5 w-5" type="button" onClick={toggleVisibilityRegister2}>
                                        {isPasswordVisibleRegister2 ? (
                                            <EyeSlashIcon className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                }
                                type={isPasswordVisibleRegister2 ? "text" : "password"}
                                isInvalid={isPasswordInvalidRegister2.value}
                                errorMessage={isPasswordInvalidRegister2.reason}
                                onChange={(e) => { setPasswordInputRegister2(e.target.value) }}
                                onBlur={handlePasswordChange}
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