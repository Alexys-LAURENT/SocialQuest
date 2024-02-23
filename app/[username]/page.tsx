import Posts from '@/components/Profil/Posts';
import Infos from '@/components/Profil/Infos';
import { notFound } from 'next/navigation';
import { ExtendedPost } from '@/app/types/entities';
import { getProfileConnected } from '@/utils/getProfileConnected';
import { getAllPostsFromUser } from '@/utils/getAllPosts';
import { getPageProfile } from '@/utils/getPageProfile';
import UserTopRow from '@/components/Profil/UserTopRow';
import CommpagnonsSuspenser from '@/components/Profil/CompagnonsSuspenser';
import { FC, Suspense } from 'react';
import CompagnonSkeleton from '@/components/Skeletons/Profil/CompagnonSkeleton';
import { createClient } from '@supabase/supabase-js';

export const revalidate = 3600;

export async function generateStaticParams() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const { data: usernames } = await supabase.from('profiles').select('username');

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

  console.log(decodedUsername);

  if (pageProfile === null) {
    notFound();
  }

  const posts = await getAllPostsFromUser(pageProfile?.id_user ?? '');
  const isUserProfil = pageProfile?.id_user === (profileConnected?.id_user ?? '');

  return (
    <div className="h-full w-full flex flex-col overflow-y-auto overflow-x-hidden items-center">
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
          <Posts userProfile={profileConnected} isUserProfil={isUserProfil} posts={posts as ExtendedPost[]} />
        </div>
      </div>
    </div>
  );
};

export default Profil;
