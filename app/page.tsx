import PostInputSuspenser from '@/components/Home/PostInputSuspenser';
import UserGuildes from '@/components/Home/UserGuildes';
import PostsWrapper from '@/components/PostsWrapper';
import TopGuildes from '@/components/TopGuildes';
import TopMembres from '@/components/TopMembres';
import { getGuildesUser } from '@/utils/getGuildesUser';
import { getPostsHome } from '@/utils/getPostsHome';
import { getProfileConnected } from '@/utils/getProfileConnected';
import { getTopGuildes } from '@/utils/getTopGuildes';
import { getTopMembres } from '@/utils/getTopMembres';
import { Button } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function Index() {
  const postsInit = await getPostsHome(0, 0, 0, 10);
  const PostInputSkeleton = dynamic(() => import('@/components/Skeletons/PostInputSkeleton'));

  const user = await getProfileConnected();
  let guildesUser = null;

  const [topGuildes, topMembres] = await Promise.all([getTopGuildes(), getTopMembres()]);

  if (user) {
    guildesUser = await getGuildesUser(0);
  }

  return (
    <div className={`flex max-w-[1280px] w-full px-2 md:px-4 py-4 gap-6`}>
      <div className="hidden md:flex flex-col min-w-[17rem] gap-4 h-fit">
        <TopGuildes initGuildes={topGuildes} />
        <TopMembres initMembres={topMembres} />
      </div>

      <div className={`flex flex-col w-full gap-6 lg:gap-10 `}>
        {user && (
          <Suspense fallback={<PostInputSkeleton />}>
            <PostInputSuspenser />
          </Suspense>
        )}

        <PostsWrapper
          user={user}
          filtre={user && user.id_user ? true : false}
          displayAnswerTo={true}
          postsInit={postsInit}
          page={'home'}
        />
      </div>

      <div className="sticky top-0 hidden lg:flex min-w-[17rem] max-w-[17rem] h-fit">
        {user ? (
          <UserGuildes initGuildes={guildesUser} maxHeight={true} />
        ) : (
          <div className="w-full flex flex-col bg-tempBgLightSecondary dark:bg-tempBgDark border dark:border-tempDarkBorder border-tempLightBorder rounded-md transition-all !duration-500 font-semibold h-fit">
            <div className="p-2 text-base text-center text-textDark dark:text-textLight">
              Connectez-vous pour profiter pleinement de votre expérience sur notre site !
            </div>

            <Button
              as={Link}
              href="/login"
              variant="flat"
              className="!w-[85%] customButton bg-secondary/70 border-secondary mx-auto mb-3 text-textLight text-base"
            >
              Connexion
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
