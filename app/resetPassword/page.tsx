"use client";
import { useContext, useLayoutEffect, useState } from "react";
import { Button, Input, Spinner } from "@nextui-org/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { createClient } from "@/utils/supabase/client";
import { getProfileConnected } from "@/utils/getProfileConnected";
import { ToasterContext } from "../context/ToasterContext";
import { useRouter } from "next/navigation";


const page = () => {
    const [user, setUser] = useState<any>(null);
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isPasswordConfirmationVisible, setIsPasswordConfirmationVisible] = useState<boolean>(false);

    const [isPasswordInvalid, setIsPasswordInvalid] = useState<{ value: boolean, reason: string }>({ value: false, reason: '' });
    const [isPasswordConfirmationInvalid, setIsPasswordConfirmationInvalid] = useState<{ value: boolean, reason: string }>({ value: false, reason: '' });

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const isValid = () => {
        return !isPasswordInvalid.value && !isPasswordConfirmationInvalid.value && password.length > 0 && passwordConfirmation.length > 0;
    }

    const router = useRouter();
    const { success, error } = useContext(ToasterContext)

    const toggleVisibilityPassword = () => setIsPasswordVisible(!isPasswordVisible);
    const toggleVisibilityPasswordConfirmation = () => setIsPasswordConfirmationVisible(!isPasswordConfirmationVisible);


    const supabase = createClient();

    useLayoutEffect(() => {
        const checkUser = async () => {
            const userCheck = await getProfileConnected();
            if (!userCheck) {
                return router.push('/login');
            } else {
                setUser(userCheck);
            }
        }

        checkUser();

    }, []);


    const handleResetPassword = async () => {

        if (!isValid()) return;

        if (!user) {
            return router.push('/login');
        }

        setIsLoading(true);

        const { error: errorReset } = await supabase.auth.updateUser({
            email: user.email,
            password: password
        });

        if (errorReset) {
            return error("Erreur lors de la modification du mot de passe");
        }

        const { error: errorLogout } = await supabase.auth.signOut()

        if (errorLogout) {
            return error("Erreur lors de la déconnexion");
        }

        setIsLoading(false);

        // Redirect to login page after 5 seconds and display a toast message to inform the user
        success("Mot de passe modifié avec succès, Vous allez être redirigé automatiquement vers la page de connexion dans 3 secondes");
        setTimeout(() => {
            router.push('/login');
        }, 3000);
    };

    const handlePasswordChange = () => {
        const password1 = document.getElementById('password') as HTMLInputElement;
        const password2 = document.getElementById('passwordConfirmation') as HTMLInputElement;

        if (password1.value !== password2.value && password1.value.length > 0 && password2.value.length > 0) {
            setIsPasswordConfirmationInvalid({ value: true, reason: 'Les mots de passe ne correspondent pas' });
        } else {
            setIsPasswordConfirmationInvalid({ value: false, reason: '' });
        }

        // Check if the password is strong enough (8 characters, capital and lowercase letters, numbers, special characters
        if ((password1.value.length < 8 || password1.value.includes(' ') || !password1.value.match(/[A-Z]/) || !password1.value.match(/[a-z]/) || !password1.value.match(/[0-9]/) || !password1.value.match(/[^A-Za-z0-9]/)) && password1.value.length > 0) {
            setIsPasswordInvalid({ value: true, reason: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre, un caractère spécial et ne doit pas contenir d\'espace' });
        } else {
            setIsPasswordInvalid({ value: false, reason: '' });
        }
    }

    return user ? (
        <div className={`flex flex-col max-w-2xl w-full px-2 md:px-4 py-4 gap-6`}>

            <h1 className="text-center text-3xl font-bold text-default-900">Réinitialisation du mot de passe</h1>

            <Input
                placeholder="Mot de passe"
                id='password'
                label='Mot de passe'
                labelPlacement='outside'
                name="password"
                required
                value={password}
                isInvalid={isPasswordInvalid.value}
                errorMessage={isPasswordInvalid.reason}
                endContent={
                    <button className="focus:outline-none h-5 w-5" type="button" onClick={toggleVisibilityPassword}>
                        {isPasswordVisible ? (
                            <EyeSlashIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                            <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                    </button>
                }
                type={isPasswordVisible ? "text" : "password"}
                onChange={(e) => { setPassword(e.target.value) }}
                onBlur={() => { handlePasswordChange() }}
            />

            <Input
                placeholder="Confirmation du mot de passe"
                id='passwordConfirmation'
                label='Confirmation du mot de passe'
                labelPlacement='outside'
                name="passwordConfirmation"
                required
                value={passwordConfirmation}
                isInvalid={isPasswordConfirmationInvalid.value}
                errorMessage={isPasswordConfirmationInvalid.reason}
                endContent={
                    <button className="focus:outline-none h-5 w-5" type="button" onClick={toggleVisibilityPasswordConfirmation}>
                        {isPasswordConfirmationVisible ? (
                            <EyeSlashIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                            <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                    </button>
                }
                type={isPasswordConfirmationVisible ? "text" : "password"}
                onChange={(e) => { setPasswordConfirmation(e.target.value) }}
                onBlur={() => { handlePasswordChange() }}
            />

            <Button variant="flat" onClick={() => { handleResetPassword() }} disabled={!isValid() || isLoading} className={`customButton text-lg !w-full bg-secondary/70 border-secondary text-textLight ${!isValid() || isLoading ? 'bg-secondary/30 border-secondary/60 text-opacity-30' : ''}`}>
                {!isLoading ? "Confirmer" : <Spinner color="white" />}
            </Button>
        </div>
    ) : (
        <div className={`flex flex-col max-w-2xl w-full h-full px-2 md:px-4 py-4 gap-6 items-center justify-center`}>
            <Spinner size="lg" color="white" />
        </div>
    )
};

export default page;