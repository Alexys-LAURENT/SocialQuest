import './globals.css'
import { GeistSans } from 'geist/font/sans'
import { Providers } from "./providers";
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import NavBar from '@/components/NavBar/NavBar'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'SocialQuest',
  description: 'SocialQuest',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return (
    <html lang="en" className={`${GeistSans.className} dark`} >
      <body className='bg-[#0a0a0a] dark:bg-[#0a0a0a] overflow-hidden' >
        <NavBar user={user} />
        <Providers>
          <main className="h-[calc(100vh-5rem)] flex flex-col items-center overflow-y-auto">
            {children}
          </main>
        </Providers>
      </body>
    </html >
  )
}
