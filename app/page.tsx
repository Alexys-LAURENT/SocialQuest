import dynamic from 'next/dynamic'
import Link from 'next/link'
import { getProfileConnected } from '@/utils/getProfileConnected'
import { Suspense } from 'react'
import { Button } from '@nextui-org/react';
import PostInputSuspenser from '@/components/Home/PostInputSuspenser'
// import TabsPostsWrapper from '@/components/Home/TabsPostsWrapper';
import PostsWrapper from '@/components/PostsWrapper';
import { getAllPosts } from '@/utils/getAllPosts';
import TopGuildes from '@/components/TopGuildes';
import TopMembres from '@/components/TopMembres';

export default async function Index() {

  const PostsWrapperSkeleton = dynamic(() => import('@/components/Skeletons/PostsWrapperSkeleton'));
  const PostInputSkeleton = dynamic(() => import('@/components/Skeletons/PostInputSkeleton'));

  const user = await getProfileConnected()


  return (
    <div className={`flex max-w-[1280px] w-full p-4 gap-6`}>


      <div className="hidden md:flex flex-col min-w-[17rem] gap-4 h-fit">
        <TopGuildes />
        <TopMembres />
      </div>



      <div className={`flex flex-col w-full gap-6 lg:gap-10 `}>

        {user &&
          <Suspense fallback={<PostInputSkeleton />}>
            <PostInputSuspenser />
          </Suspense>
        }

        <Suspense fallback={<PostsWrapperSkeleton />}>
          {/* <TabsPostsWrapper user={user} /> */}
          <PostsWrapper user={user} getPost={getAllPosts} />
        </Suspense>
      </div>

      <div className="hidden lg:flex min-w-[17rem] h-fit">
        {user ?
          (
            <div className="w-full flex flex-col bg-bgLightCard dark:bg-bgDarkCard text-textDark dark:text-textLight rounded-md text-xl font-semibold h-fit transition-all !duration-500">
              <Link href={`/${user ? user.username : 'login'}`} className='text-textDark dark:text-textLight dark:hover:bg-[#767676] hover:bg-[#cccccc] hover:bg-opacity-75 py-1 px-2 rounded-md transition-all ease-in-out'>
                Ma page
              </Link>
              <Link href={`#`} className='text-textDark dark:text-textLight dark:hover:bg-[#767676] hover:bg-[#cccccc] hover:bg-opacity-75 py-1 px-2 rounded-md transition-all ease-in-out'>
                Mes Compagnons
              </Link>
              <Link href={`#`} className='text-textDark dark:text-textLight dark:hover:bg-[#767676] hover:bg-[#cccccc] hover:bg-opacity-75 py-1 px-2 rounded-md transition-all ease-in-out'>
                Mes Guildes
              </Link>
            </div>
          ) : (
            <div className="w-full flex flex-col bg-bgLightCard dark:bg-bgDarkCard rounded-md text-xl font-semibold h-fit transition-all !duration-500">
              <div className="text-base text-center p-2 text-textDark dark:text-textLight">
                Connectez-vous pour profiter pleinement de votre expérience sur notre site !
              </div>

              <Button as={Link} href="/login" variant="flat" className='!w-[85%] customButton bg-secondary/70 border-secondary mx-auto mb-3 text-textLight'>
                Connexion
              </Button>
            </div>
          )}
      </div>

    </div>
  )
}
