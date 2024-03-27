'use client';
import { Button, Input, Spinner } from '@nextui-org/react';
import { Card, CardHeader, CardBody, CardFooter, Divider } from '@nextui-org/react';
import { useContext, useEffect, useState } from 'react';
import { Profile } from '../../app/types/entities';
import { deleteUser } from '@/utils/deleteUser';
import { NextResponse } from 'next/server';
import { ToasterContext } from '@/app/context/ToasterContext';
import { getUsernameWhereName } from '@/utils/getUsernameWhereName';
import { getEmailWhereEmail } from '@/utils/getEmailWhereEmail';

const ParametresForm = ({
  profileConnected,
  updateUserData,
}: {
  profileConnected: Profile | null;
  updateUserData: Function;
}) => {
  const initEmail = profileConnected?.email || '';
  const [nom, setNom] = useState(profileConnected?.nom || '');
  const [prenom, setPrenom] = useState(profileConnected?.prenom || '');
  const [email, setEmail] = useState(profileConnected?.email || '');
  const [isTypingEmail, setIsTypingEmail] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState({ value: false, reason: '' });
  const [username, setUsername] = useState(profileConnected?.username || '');
  const [isTypingUsername, setIsTypingUsername] = useState(false);
  const [isUsernameInvalid, setIsUsernameInvalid] = useState({ value: false, reason: '' });
  const { success, error } = useContext(ToasterContext);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!nom || !prenom || !email || !username) {
      return error('Veuillez remplir tous les champs du formulaire');
    }

    if (isEmailInvalid.value || isUsernameInvalid.value) {
      return error('Veuillez corriger les erreurs dans le formulaire');
    }

    const isUpdated = await updateUserData(nom, prenom, email);
    if (isUpdated) {
      return success(`Données mises à jour avec succès${initEmail !== email ? '. Votre email a été modifié, veuillez vérifier les boites de réception de votre ancien et nouveau email pour confirmer le changement.' : ''}`);

    } else {
      return error('Erreur lors de la mise à jour des données');
    }
  };

  const handleUsernameChange = async (username: string) => {
    setIsTypingUsername(true);

    if (username.includes(' ')) {
      setUsername(username.replace(/\s/g, ''));
      error('Le username ne doit pas contenir d\'espaces');
      setIsTypingUsername(false);
      return;
    }

    setUsername(username);

    if ((await getUsernameWhereName(username.replace(/\s/g, ''))) === false) {
      setIsUsernameInvalid({ value: true, reason: 'Ce username est déjà utilisé' });
      setIsTypingUsername(false);
      return;
    }

    setIsUsernameInvalid({ value: false, reason: '' });
    setIsTypingUsername(false);
  }

  const handleEmailChange = async (email: string) => {

    if (email.includes(' ')) {
      setEmail(email.replace(/\s/g, ''));
      error('L\'email ne doit pas contenir d\'espaces');
      setIsTypingEmail(false);
      return;
    }

    setIsTypingEmail(true);
    setEmail(email);

    if ((await getEmailWhereEmail(email.replace(/\s/g, ''))) === false) {
      setIsEmailInvalid({ value: true, reason: 'Cet email est déjà utilisé' });
      setIsTypingEmail(false);
      return;
    }

    setIsEmailInvalid({ value: false, reason: '' });
    setIsTypingEmail(false);
  };

  const checkInvalidEmail = async (email: string) => {
    if (!isValidEmail(email)) {
      setIsEmailInvalid({ value: true, reason: 'Cette adresse email est invalide' });
      return;
    }

    setIsEmailInvalid({ value: false, reason: '' });
  };


  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  const handleDeleteProfile = async () => {
    if (!profileConnected) return;

    const confirmed = confirm('Voulez-vous vraiment supprimer votre profil ?');
    if (!confirmed) return;

    const isDeleted = await deleteUser(profileConnected.id_user);

    if (isDeleted) {
      success('Profil supprimé avec succès, vous allez être redirigé vers la page de connexion dans quelques secondes');

      // wait for 3 seconds before redirecting to login page
      setTimeout(() => {
        return NextResponse.redirect(new URL('/login'));
      }, 5000);
    } else {
      error('Erreur lors de la suppression du profil');
    }
  };

  return (
    <div>
      <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4">
        <Card className="max-w-[800px]">
          <CardHeader className="flex gap-3 justify-center">
            <div className="flex flex-col">
              <p className="text-md text-center">Parametres</p>
              <p className="text-small text-default-500 text-center">Mon profil</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="flex flex-col gap-2">
            <Input
              type="text"
              label="Nom"
              value={nom}
              labelPlacement="outside"
              placeholder='Nom'
              onChange={(e) => setNom(e.target.value)}
            />
            <Input
              type="text"
              label="Prénom"
              value={prenom}
              labelPlacement="outside"
              placeholder='Prénom'
              onChange={(e) => setPrenom(e.target.value)}
            />
            <Input
              isInvalid={isEmailInvalid.value}
              errorMessage={isEmailInvalid.reason}
              label="Email"
              value={email}
              labelPlacement="outside"
              placeholder="Email"
              onChange={(e) => handleEmailChange(e.target.value)}
              onBlur={() => checkInvalidEmail(email)}
              endContent={
                <Spinner size="sm" className={`scale-75 ${!isTypingEmail ? 'hidden' : ''} `} color="white" />
              }
            />
            <Input
              isInvalid={isUsernameInvalid.value}
              errorMessage={isUsernameInvalid.reason}
              label="Username"
              value={username}
              labelPlacement="outside"
              placeholder="Username"
              onChange={(e) => handleUsernameChange(e.target.value)}
              endContent={
                <Spinner size="sm" className={`scale-75 ${!isTypingUsername ? 'hidden' : ''} `} color="white" />
              }
            />
          </CardBody>
          <Divider />
          <CardFooter>
            <CardBody className="flex flex-col justify-between items-center bg-red-700/50 gap-4 rounded-sm">
              <div className="flex justify-between items-center gap-4">
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl">Supprimer votre profil</h3>
                  <h1 className="text-base">Voulez-vous vraiment supprimer votre profil</h1>
                  <h1 className="text-base">Attention, cette action est irréversible !</h1>
                </div>
                <Button onClick={handleDeleteProfile} className="customButton bg-danger/70 border-danger !text-textLight">
                  Supprimer Mon Profil
                </Button>
              </div>
            </CardBody>
          </CardFooter>
        </Card>
      </div>
      <div className='mt-4'>
        <form>
          <div className="flex justify-end">
            <Button
              onClick={(e) => handleSubmit(e)}
              type="submit"
              className="!w-fit items-center customButton bg-secondary/70 border-secondary !text-textLight"
              isDisabled={isEmailInvalid.value || isUsernameInvalid.value || !nom || !prenom || !email || !username}
            >
              Enregistrer
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ParametresForm;
