'use server';
import { headers, cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function checkSignUp(formData: FormData) {
  const origin = headers().get('origin');
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const password2 = formData.get('password2') as string;

  const nom = formData.get('nom') as string;
  const prenom = formData.get('prenom') as string;
  const username = formData.get('username') as string;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  if (!email || !password || !password2 || !nom || !prenom || !username) {
    return redirect('/login?message=Veuillez remplir tous les champs');
  }

  const { data: checkEmail } = await supabase.from('profiles').select('email').ilike('email', email);

  if (checkEmail && checkEmail.length > 0) {
    return redirect('/login?message=Un compte existe déjà avec cet email');
  }

  const { data: checkUsername } = await supabase.from('profiles').select('username').ilike('username', username);

  if (checkUsername && checkUsername.length > 0) {
    return redirect('/login?message=Un compte existe déjà avec ce username');
  }

  // Check if the password is strong enough (8 characters, capital and lowercase letters, numbers, special characters
  if (
    password.length < 8 ||
    password.includes(' ') ||
    !password.match(/[A-Z]/) ||
    !password.match(/[a-z]/) ||
    !password.match(/[0-9]/) ||
    !password.match(/[^A-Za-z0-9]/)
  ) {
    return redirect(
      "/login?message=Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre, un caractère spécial et ne doit pas contenir d'espace",
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nom,
        prenom,
        username,
        email,
      },
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error('Error signing up', error);
    return redirect("/login?message=Une erreur est survenue lors de l'inscription");
  }

  return redirect('/login?message=Merci de vérifier votre boîte mail pour confirmer votre inscription');
}
