import './globals.css'
import NavBar from '@/components/NavBar/NavBar'
import { cookies } from 'next/headers'
import { GeistSans } from 'geist/font/sans'
import { Providers } from "./providers";
import { createClient } from '@/utils/supabase/server'
import { ConfigProvider } from 'antd';
import DrawerProvider from './context/DrawerContext';
import ToasterProvider from './context/ToasterContext';
import DiscussionProvider from './context/DiscussionContext';
import { getProfileConnected } from '@/utils/getProfileConnected';
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
  const profile = await getProfileConnected()



  return (
    <html lang="en" className={`${GeistSans.className} dark overflow-hidden`} >
      <body className='bg-bgDark dark:bg-bgDark overflow-x-hidden h-screen' >
        <Providers>
          <ConfigProvider theme={{ token: { colorBgMask: 'rgba(0, 0, 0, 0.8)', }, }}>
            <ToasterProvider>
              <DrawerProvider user={profile}>
                <DiscussionProvider>
                  <NavBar user={profile} />
                  <main className={`h-full w-full flex flex-col items-center overflow-y-auto`}>
                    {children}
                  </main>
                </DiscussionProvider>
              </DrawerProvider>
            </ToasterProvider>
          </ConfigProvider >
        </Providers>
      </body>
    </html >
  )
}
