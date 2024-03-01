import { useContext, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Button, Spinner } from '@nextui-org/react';
import { createClient } from '@/utils/supabase/client';
import { ToasterContext } from '@/app/context/ToasterContext';

export const ModalForgotPassword = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (value: boolean) => void }) => {

    const [email, setEmail] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isEmailInvalid, setIsEmailInvalid] = useState<boolean>(false);
    const { success, error } = useContext(ToasterContext);

    const supabase = createClient();

    const handleSendEmail = async () => {
        setIsLoading(true);
        const { error: errorEmail } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/resetPassword`
        })

        if (errorEmail) {
            error('Une erreur est survenue');
            setIsLoading(false);
            return;
        }

        setEmail('');
        setIsOpen(false);
        setIsLoading(false);
        success('Un email de récupération de mot de passe a été envoyé');
    }

    const checkEmailValidity = (e: any) => {
        const email = e.target as HTMLInputElement;
        setIsEmailInvalid(!email.validity.valid);
    }

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <ModalContent>
                <ModalHeader>
                    <h2>Email de récupération de mot de passe</h2>
                </ModalHeader>
                <ModalBody className="flex flex-col gap-4 py-4 justify-end">
                    <div>
                        <Input
                            type='email'
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={(e) => checkEmailValidity(e)}
                            placeholder="Email"
                            isInvalid={isEmailInvalid}
                            errorMessage={isEmailInvalid ? 'Merci de renseigner un email valide' : ''}
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button
                            className={`customButton bg-secondary/70 border-secondary ${!email || isEmailInvalid ? 'bg-secondary/30 border-secondary/60 text-opacity-30' : ''}`}
                            onClick={() => handleSendEmail()}
                            disabled={!email || isEmailInvalid}
                        >
                            {!isLoading ? 'Envoyer' : <Spinner size="sm" color="white" />}
                        </Button>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};