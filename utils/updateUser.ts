'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function updateUser(profileConnected: any, nom: string, prenom: string, email: string) {
  'use server';
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.updateUser({
    email: email,
    data: { nom: nom, prenom: prenom },
  });

  if (error) {
    console.error('1.Erreur lors de la mise à jour des données utilisateur:', error);
    return false;
  }

  const { data: profile, error: profileError } = await supabase

    .from('profiles')
    .update({ nom: nom, prenom: prenom, email: email })
    .eq('id_user', profileConnected?.id_user);

  if (profileError) {
    console.error('2.Erreur lors de la mise à jour des données utilisateur:', profileError);
    return false;
  }

  console.log(profile);

  console.log('Données utilisateur mises à jour avec succès:', data);
  return true;
}
