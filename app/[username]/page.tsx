import Infos from '@/components/Profil/Infos';
import { notFound } from 'next/navigation';
import { getProfileConnected } from '@/utils/getProfileConnected';
import { getPageProfile } from '@/utils/getPageProfile';
import UserTopRow from '@/components/Profil/UserTopRow';
import CommpagnonsSuspenser from '@/components/Profil/CompagnonsSuspenser';
import { Suspense } from 'react';
import CompagnonSkeleton from '@/components/Skeletons/Profil/CompagnonSkeleton';
import { createClient } from '@supabase/supabase-js';
import PostsWrapper from '@/components/PostsWrapper';
import { getPostsProfil } from '@/utils/getPostsProfil';

export const revalidate = 3600;

export async function generateStaticParams() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const results = (await supabase.from('profiles').select('username')) as unknown as { data: any[] };
  const usernames = results?.data;

  return usernames?.map(({ username }) => ({
    username,
  }));
}

type ProfilParams = {
  params?: {
    username: string;
  };
};


const Profil: React.FC = async (props) => {


  const { params } = props as ProfilParams;
  const decodedUsername = decodeURIComponent(params!.username);
  const [profileConnected, pageProfile] = await Promise.all([getProfileConnected(), getPageProfile(decodedUsername)]);


  if (pageProfile === null) {
    notFound();
  }

  const postsInit = await getPostsProfil(pageProfile.id_user, 0, 10);

  const isUserProfil = pageProfile?.id_user === (profileConnected?.id_user ?? '');

  return (
    <div className="h-full w-full flex flex-col items-center">
      <div
        className="relative w-full min-h-[10rem] md:min-h-[18rem] bg-secondary/10 bg-cover bg-center transition-all"
        style={{ backgroundImage: `url(${pageProfile.banner_url})` }}
      ></div>

      <UserTopRow isUserProfil={isUserProfil} profileConnected={profileConnected} pageProfile={pageProfile} />

      <div className="flex flex-col w-full px-2 sm:px-6 md:px-12 max-w-[1280px] pb-6 -top-[60px] md:-top-[80px] relative">
        <div className="flex flex-col-reverse gap-6 sm:gap-12 lg:flex-row my-6 md:my-12">
          <Suspense fallback={<CompagnonSkeleton isUserProfil={isUserProfil} />}>
            <CommpagnonsSuspenser isUserProfil={isUserProfil} pageProfile={pageProfile} />
          </Suspense>
          <Infos isUserProfil={isUserProfil} user={pageProfile} />
        </div>

        <div className="flex flex-col w-full gap-6 rounded-md transition-all items-center ">
          <div className="text-2xl w-full font-semibold text-start text-textDark dark:text-textLight transition-all !duration-[125ms]">
            {isUserProfil ? 'Mes Posts' : 'Posts'}
          </div>
          <div className="w-full max-w-[656px]">
            <PostsWrapper user={profileConnected} filtre={false} displayAnswerTo={true} page={"profil"} postsInit={postsInit} profilePageId={pageProfile.id_user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
