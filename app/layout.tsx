import './globals.css'
import NavBar from '@/components/NavBar/NavBar'
import { cookies } from 'next/headers'
import { GeistSans } from 'geist/font/sans'
import { Providers } from "./providers";
import { createClient } from '@/utils/supabase/server'
import { ConfigProvider } from 'antd';

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
      <body className='bg-bgDark dark:bg-bgDark overflow-hidden' >
        <Providers>
          <ConfigProvider
            theme={{
              token: {
                // Seed Token
                colorBgMask: 'rgba(0, 0, 0, 0.8)',
              },
            }
            }
          >
            <NavBar user={user} />
            <main className={`h-screen flex flex-col items-center overflow-y-auto`}>
              {children}
            </main>
          </ConfigProvider >
        </Providers>
      </body>
    </html >
  )
}
