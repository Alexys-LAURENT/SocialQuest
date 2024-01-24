import dynamic from 'next/dynamic'
import Link from 'next/link'
import { getProfileConnected } from '@/utils/getProfileConnected'
import { getAllPosts } from '@/utils/getAllPosts'
import { getGuildesUser } from '@/utils/getGuildesUser'
import { Suspense } from 'react'
import { Button } from '@nextui-org/react';

export default async function Index() {

  const TopTabs = dynamic(() => import('@/components/Home/TopTabs'));
  const PostsWrapper = dynamic(() => import('@/components/PostsWrapper'));
  const PostsWrapperSkeleton = dynamic(() => import('@/components/Skeletons/PostsWrapperSkeleton'));

  const user = await getProfileConnected()
  const guildesUser = await getGuildesUser()


  return (
    <div className={`flex max-w-[1280px] w-full p-4 gap-6`}>

      <div className="hidden lg:flex min-w-[17rem] h-fit">
        {user ?
          (
            <div className="w-full flex flex-col bg-bgLightCard dark:bg-bgDarkCard text-textDark dark:text-textLight rounded-md text-xl font-semibold h-fit transition-all !duration-500">
              <Link href={`/${user ? user.username : 'login'}`} className='text-textDark dark:text-textLight hover:bg-[#767676] hover:bg-opacity-75 py-1 px-2 rounded-md transition-all ease-in-out'>
                Ma page
              </Link>
              <Link href={`#`} className='text-textDark dark:text-textLight hover:bg-[#767676] hover:bg-opacity-75 py-1 px-2 rounded-md transition-all ease-in-out'>
                Mes Compagnons
              </Link>
              <Link href={`#`} className='text-textDark dark:text-textLight hover:bg-[#767676] hover:bg-opacity-75 py-1 px-2 rounded-md transition-all ease-in-out'>
                Mes Guildes
              </Link>
            </div>
          ) : (
            <div className="w-full flex flex-col bg-bgLightCard dark:bg-bgDarkCard rounded-md text-xl font-semibold h-fit transition-all !duration-500">
              <div className="text-base text-center p-2 text-textDark dark:text-textLight">
                Connectez-vous pour profiter pleinement de votre expérience sur notre site !
              </div>

              <Button as={Link} color="primary" href="/login" variant="flat" className='text-lg w-[85%] mx-auto mb-3'>
                Connexion
              </Button>
            </div>
          )}
      </div>


      <div className={`flex flex-col w-full gap-6 lg:gap-10 `}>

        <TopTabs user={user} guildesUser={guildesUser} />

        <Suspense fallback={<PostsWrapperSkeleton />}>
          <PostsWrapper user={user} getPost={getAllPosts} />
        </Suspense>
      </div>

      <div className="hidden md:flex flex-col min-w-[17rem] gap-4 h-fit">
        <div className="p-2 w-full flex flex-col bg-bgLightCard dark:bg-bgDarkCard rounded-md transition-all !duration-500">
          <div className="text-xl font-semibold min-h-[25rem] text-textDark dark:text-textLight transition-all !duration-[125ms]">
            Top Guildes
          </div>
        </div>
        <div className="p-2 w-full flex flex-col bg-bgLightCard dark:bg-bgDarkCard rounded-md transition-all !duration-500">
          <div className="text-xl font-semibold min-h-[25rem] text-textDark dark:text-textLight transition-all !duration-[125ms]">
            Top Membres
          </div>
        </div>
      </div>

    </div>
  )
}
