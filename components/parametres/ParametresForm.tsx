'use client';
import { Button, Input } from '@nextui-org/react';
import { Card, CardHeader, CardBody, CardFooter, Divider } from '@nextui-org/react';
import { useState } from 'react';
import { Profile } from '../../app/types/entities';
import { deleteUser } from '@/utils/deleteUser';
import { NextResponse } from 'next/server';

const ParametresForm = ({
  profileConnected,
  updateUserData,
}: {
  profileConnected: Profile | null;
  updateUserData: Function;
}) => {
  const [nom, setNom] = useState(profileConnected?.nom || '');
  const [prenom, setPrenom] = useState(profileConnected?.prenom || '');
  const [email, setEmail] = useState(profileConnected?.email || '');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!nom || !prenom || !email || !isValidEmail(email)) {
      return;
    }
    const isUpdated = await updateUserData(nom, prenom, email);
    if (isUpdated) {
      console.log('Données utilisateur mises à jour avec succès');
      return;
    } else {
      console.error('3.Erreur lors de la mise à jour des données utilisateur');
      return;
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleDeleteProfile = async () => {
    if (!profileConnected) return;

    const confirmed = confirm('Voulez-vous vraiment supprimer votre profil ?');
    if (!confirmed) return;

    const isDeleted = await deleteUser(profileConnected.id_user);

    if (isDeleted) {
      alert('Votre profil a été supprimé avec succès');

      return NextResponse.redirect(new URL('/login', request.url));
    } else {
      alert('Erreur lors de la suppression du profil');
    }
  };

  return (
    <div>
      <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4">
        <Card className="max-w-[800px]">
          <CardHeader className="flex gap-3 justify-center">
            <div className="flex flex-col">
              <p className="text-md">Parametres</p>
              <p className="text-small text-default-500">Mon profil</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <Input
              type="text"
              label="Nom"
              defaultValue={nom}
              labelPlacement="outside"
              onChange={(e) => setNom(e.target.value)}
            />
            <Input
              type="text"
              label="Prenom"
              defaultValue={prenom}
              labelPlacement="outside"
              onChange={(e) => setPrenom(e.target.value)}
            />
            <Input
              type="email"
              label="Email"
              defaultValue={email}
              labelPlacement="outside"
              onChange={(e) => setEmail(e.target.value)}
            />
          </CardBody>
          <Divider />
          <CardFooter>
            <CardBody className="flex flex-col justify-between items-center bg-red-400/30 gap-4">
              <div className="flex justify-between items-center gap-4">
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl">Supprimer votre profil</h3>
                  <h1 className="text-base">Voulez-vous vraiment supprimer votre profil</h1>
                  <h1 className="text-base">Les autres utilisateurs ne pourront plus vous voir </h1>
                </div>
                <Button onClick={handleDeleteProfile} className="customButton bg-danger border-danger !text-textLight">
                  Supprimer Mon Profil
                </Button>
              </div>
            </CardBody>
          </CardFooter>
        </Card>
      </div>
      <div>
        <form>
          <div className="flex justify-end mt-8">
            <Button
              onClick={(e) => handleSubmit(e)}
              type="submit"
              className="!w-fit items-center customButton bg-secondary border-secondary !text-textLight"
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
