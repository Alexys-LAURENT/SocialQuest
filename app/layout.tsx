import './globals.css'
import NavBar from '@/components/NavBar/NavBar'
import { cookies } from 'next/headers'
import { GeistSans } from 'geist/font/sans'
import { Providers } from "./providers";
import { createClient } from '@/utils/supabase/server'
import { ConfigProvider } from 'antd';
import DrawerProvider from './context/DrawerContext';
import ToasterProvider from './context/ToasterContext';

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

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('avatar_url')
      .eq('id_user', user.id)
      .single()

    user.user_metadata = { ...user.user_metadata, ...profile }
  }


  return (
    <html lang="en" className={`${GeistSans.className} dark`} >
      <body className='bg-bgDark dark:bg-bgDark overflow-x-hidden' >
        <Providers>
          <ConfigProvider theme={{ token: { colorBgMask: 'rgba(0, 0, 0, 0.8)', }, }}>
            <ToasterProvider>
              <DrawerProvider user={user}>
                <NavBar user={user} />
                <main className={`h-screen w-full flex flex-col items-center overflow-y-auto`}>
                  {children}
                </main>

              </DrawerProvider>
            </ToasterProvider>
          </ConfigProvider >
        </Providers>
      </body>
    </html >
  )
}
