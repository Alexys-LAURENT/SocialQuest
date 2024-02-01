import Posts from '@/components/Profil/Posts'
import Infos from '@/components/Profil/Infos'
import Compagnons from '@/components/Profil/Compagnons'
import { notFound } from 'next/navigation'
import { ExtendedPost } from '@/app/types/entities'
import { getProfileConnected } from '@/utils/getProfileConnected'
import { getAllPostsFromUser } from '@/utils/getAllPosts'
import { getPageProfile } from '@/utils/getPageProfile'
import UserTopRow from '@/components/Profil/UserTopRow'

export default async function Profil({ params }: { params: { username: string } }) {
  const [profileConnected, pageProfile] = await Promise.all([
    getProfileConnected(),
    getPageProfile(params.username)
  ]);
  console.log(pageProfile)

  if (pageProfile === null) {
    notFound()
  }



  const posts = await getAllPostsFromUser(pageProfile?.id_user ?? '')
  const isUserProfil = pageProfile?.id_user === (profileConnected?.id_user ?? '');

  return (
    <div className="h-full w-full flex flex-col overflow-y-auto overflow-x-hidden items-center">
      <div className="relative w-full min-h-[10rem] md:min-h-[18rem] bg-secondary/10 bg-cover bg-center transition-all" style={{ backgroundImage: `url(${pageProfile.banner_url})` }}>

      </div>

      <UserTopRow isUserProfil={isUserProfil} profileConnected={profileConnected} pageProfile={pageProfile} />




      <div className="flex flex-col w-full px-6 md:px-12 max-w-[1280px] pb-6 -top-[60px] md:-top-[80px] relative">
        <div className="flex flex-col-reverse gap-6 sm:gap-12 lg:flex-row my-6 md:my-12">
          <Compagnons isUserProfil={isUserProfil} />
          <Infos isUserProfil={isUserProfil} user={pageProfile} />
        </div>


        <div className="flex flex-col w-full gap-6 rounded-md transition-all items-center ">
          <div className="text-2xl w-full font-semibold text-start text-textDark dark:text-textLight transition-all !duration-[125ms]">
            {isUserProfil ? "Mes Posts" : "Posts"}
          </div>
          <Posts userProfile={profileConnected} isUserProfil={isUserProfil} posts={posts as ExtendedPost[]} />
        </div>
      </div>
    </div >
  )
}
