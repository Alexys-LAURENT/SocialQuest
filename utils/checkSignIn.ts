'use server';
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';


export async function checkSignIn(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data: checkEmail } = await supabase
        .from('profiles')
        .select('email')
        .ilike('email', email)

    if (checkEmail && checkEmail.length === 0) {
        return redirect('/login?message=Aucun compte n\'existe avec cet email')
    }

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        console.error('Error signing in', error)
        return redirect('/login?message=Mot de passe incorrect')
    }


    return redirect('/')

}