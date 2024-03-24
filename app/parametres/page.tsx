import ParametresForm from '@/components/parametres/ParametresForm';
import { getProfileConnected } from '@/utils/getProfileConnected';
import { updateUser } from '@/utils/updateUser';

const Page = async () => {
  const profileConnected = await getProfileConnected();

  const updateUserData = async (nom: string, prenom: string, email: string) => {
    'use server';
    return await updateUser(profileConnected, nom, prenom, email);
  };

  return <ParametresForm profileConnected={profileConnected} updateUserData={updateUserData} />;
};

export default Page;
