import '@/app/styles/globals.css'
import dynamic from 'next/dynamic';
import { GeistSans } from 'geist/font/sans'
import { Providers } from "@/app/providers"
import { ConfigProvider } from 'antd';
import DrawerProvider from '@/app/context/DrawerContext';
import ToasterProvider from '@/app/context/ToasterContext';
import DiscussionProvider from '@/app/context/DiscussionContext';
import InventaireProvider from '@/app/context/InventaireContext';
import { getProfileConnected } from '@/utils/getProfileConnected';
import { getNextRewards } from '@/utils/getNextRewards';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
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


  const NavBar = dynamic(() => import('@/components/NavBar/NavBar'));
  const TopLoader = dynamic(() => import('@/components/TopLoader'));



  return (
    <html lang="en" className={`${GeistSans.className} h-full ${profile?.theme || 'dark'}`}>
      <body className='bg-bgLight dark:bg-bgDark overflow-x-hidden h-full transition-colors !duration-500' >
        <Providers>
          <ConfigProvider theme={{ token: { colorBgMask: 'rgba(0, 0, 0, 0.8)', }, }}>
            <ToasterProvider>
              <DrawerProvider user={profile}>
                <DiscussionProvider>
                  <InventaireProvider>
                    <NavBar user={profile} nextRewards={await getNextRewards(profile?.niveaux.libelle!)} />
                    <TopLoader />
                    <main className={`h-full w-full flex flex-col items-center overflow-y-auto`}>
                      {children}
                    </main>
                    <Analytics />
                    <SpeedInsights />
                  </InventaireProvider>
                </DiscussionProvider>
              </DrawerProvider>
            </ToasterProvider>
          </ConfigProvider >
        </Providers>
      </body>
    </html >
  )
}
