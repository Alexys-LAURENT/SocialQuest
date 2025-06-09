import PostsWrapper from '@/components/PostsWrapper';
import CommpagnonsSuspenser from '@/components/Profil/CompagnonsSuspenser';
import Infos from '@/components/Profil/Infos';
import UserTopRow from '@/components/Profil/UserTopRow';
import CompagnonSkeleton from '@/components/Skeletons/Profil/CompagnonSkeleton';
import { getPageProfile } from '@/utils/getPageProfile';
import { getPostsProfil } from '@/utils/getPostsProfil';
import { getProfileConnected } from '@/utils/getProfileConnected';
import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const revalidate = 3600;

export async function generateStaticParams() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const results = (await supabase.from('profiles').select('username')) as unknown as { data: any[] };
  const usernames = results?.data;

  return usernames?.map(({ username }) => ({
    username,
  }));
}

const Page = async ({ params }: { params: { username: string } }) => {
  const decodedUsername = decodeURIComponent(params.username);
  const [profileConnected, pageProfile] = await Promise.all([getProfileConnected(), getPageProfile(decodedUsername)]);

  if (pageProfile === null) {
    notFound();
  }

  const postsInit = await getPostsProfil(pageProfile.id_user, 0, 10);

  const isUserProfil = pageProfile?.id_user === (profileConnected?.id_user ?? '');

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div
        className="relative w-full min-h-[10rem] md:min-h-[18rem] bg-secondary/10 bg-cover bg-center transition-all"
        style={{ backgroundImage: `url(${pageProfile.banner_url})` }}
      ></div>

      <UserTopRow isUserProfil={isUserProfil} profileConnected={profileConnected} pageProfile={pageProfile} />

      <div className="flex flex-col w-full px-2 sm:px-6 md:px-12 max-w-[1280px] pb-6 -top-[60px] md:-top-[80px] relative">
        <div className="flex flex-col-reverse gap-6 my-6 sm:gap-12 lg:flex-row md:my-12">
          <Suspense fallback={<CompagnonSkeleton isUserProfil={isUserProfil} />}>
            <CommpagnonsSuspenser isUserProfil={isUserProfil} pageProfile={pageProfile} />
          </Suspense>
          <Infos isUserProfil={isUserProfil} user={pageProfile} />
        </div>

        <div className="flex flex-col items-center w-full gap-6 transition-all rounded-md ">
          <div className="text-2xl w-full font-semibold text-start text-textDark dark:text-textLight transition-all !duration-[125ms]">
            {isUserProfil ? 'Mes Posts' : 'Posts'}
          </div>
          <div className="w-full max-w-[656px]">
            <PostsWrapper
              user={profileConnected}
              filtre={false}
              displayAnswerTo={true}
              page={'profil'}
              postsInit={postsInit}
              profilePageId={pageProfile.id_user}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
