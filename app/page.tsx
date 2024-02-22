import dynamic from 'next/dynamic';
import Link from 'next/link';
import { getProfileConnected } from '@/utils/getProfileConnected';
import { Suspense } from 'react';
import { Button } from '@nextui-org/react';
import PostInputSuspenser from '@/components/Home/PostInputSuspenser';
import PostsWrapper from '@/components/PostsWrapper';
import { getAllPosts } from '@/utils/getAllPosts';
import TopGuildes from '@/components/TopGuildes';
import TopMembres from '@/components/TopMembres';
import UserGuildes from '@/components/Home/UserGuildes';

export default async function Index() {
  const PostInputSkeleton = dynamic(() => import('@/components/Skeletons/PostInputSkeleton'));

  const user = await getProfileConnected();
  const Posts = await getAllPosts();

  return (
    <div className={`flex max-w-[1280px] w-full px-2 md:px-4 py-4 gap-6`}>
      <div className="hidden md:flex flex-col min-w-[17rem] gap-4 h-fit">
        <TopGuildes />
        <TopMembres />
      </div>

      <div className={`flex flex-col w-full gap-6 lg:gap-10 `}>
        {user && (
          <Suspense fallback={<PostInputSkeleton />}>
            <PostInputSuspenser />
          </Suspense>
        )}

        <PostsWrapper user={user} initPosts={Posts} getPost={getAllPosts} filtre={user && user.id_user ? true : false} />
      </div>

      <div className="sticky top-0  hidden lg:flex min-w-[17rem] h-fit">
        {user ? (
          <UserGuildes />
        ) : (
          <div className="w-full flex flex-col bg-bgLightCard dark:bg-bgDarkCard rounded-md text-xl font-semibold h-fit transition-all !duration-500">
            <div className="text-base text-center p-2 text-textDark dark:text-textLight">
              Connectez-vous pour profiter pleinement de votre expérience sur notre site !
            </div>

            <Button
              as={Link}
              href="/login"
              variant="flat"
              className="!w-[85%] customButton bg-secondary/70 border-secondary mx-auto mb-3 text-textLight"
            >
              Connexion
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
