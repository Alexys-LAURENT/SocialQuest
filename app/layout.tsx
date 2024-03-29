import '@/app/styles/globals.css';
import dynamic from 'next/dynamic';
import { GeistSans } from 'geist/font/sans';
import { Providers } from '@/app/providers';
import DrawerProvider from '@/app/context/DrawerContext';
import ToasterProvider from '@/app/context/ToasterContext';
import DiscussionProvider from '@/app/context/DiscussionContext';
import InventaireProvider from '@/app/context/InventaireContext';
import { getProfileConnected } from '@/utils/getProfileConnected';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import NavBar from '@/components/NavBar/NavBar';
import ModalItemInfoProvider from './context/ModalItemInfosContext';
import ModalGuildsWarsProvider from './context/ModalGuildsWarsContext';

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'SocialQuest',
  description: 'SocialQuest',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const profile = await getProfileConnected();

  const TopLoader = dynamic(() => import('@/components/TopLoader'));

  return (
    <html lang="en" className={`${GeistSans.className} h-full ${profile?.theme || 'dark'}`}>
      <body className="bg-bgLight dark:bg-tempBgDark overflow-x-hidden h-full transition-colors !duration-500">
        <Providers>
          <ToasterProvider>
            <DrawerProvider user={profile}>
              <ModalItemInfoProvider>
                <ModalGuildsWarsProvider>
                  <DiscussionProvider>
                    <InventaireProvider>
                      <NavBar user={profile} />
                      <TopLoader />
                      <main className={`h-full w-full flex flex-col items-center overflow-y-auto`}>{children}</main>
                    </InventaireProvider>
                  </DiscussionProvider>
                </ModalGuildsWarsProvider>
              </ModalItemInfoProvider>
            </DrawerProvider>
          </ToasterProvider>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
