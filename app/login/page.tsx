import Form from '@/components/Login_Register/Form'
import { redirect } from 'next/navigation'
import { checkSignUp } from '@/utils/checkSignUp'
import { checkSignIn } from '@/utils/checkSignIn'

export default function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const signIn = async (formData: FormData) => {
    'use server'

    const check = await checkSignIn(formData)

    return redirect(`/login?message=${check}`)
  }

  const signUp = async (formData: FormData) => {
    'use server'

    const check = await checkSignUp(formData)

    return redirect(`/login?message=${check}`)
  }



  return (
    <div className="flex-1 flex flex-col w-full px-8 justify-center gap-2">

      <Form signIn={signIn} signUp={signUp} searchParams={searchParams} />
    </div>
  )
}
