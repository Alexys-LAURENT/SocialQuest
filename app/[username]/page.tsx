import Posts from '@/components/Profil/Posts'
import Infos from '@/components/Profil/Infos'
import Compagnons from '@/components/Profil/Compagnons'
import { Avatar, Tooltip } from '@nextui-org/react'
import { notFound } from 'next/navigation'
import { ExtendedPost } from '@/app/types/entities'
import dynamic from 'next/dynamic'
import { getProfileConnected } from '@/utils/getProfileConnected'
import { getAllPostsFromUser } from '@/utils/getAllPosts'
import { getPageProfile } from '@/utils/getPageProfile'
import Image from 'next/image'

const DynamicProfilPicture = dynamic(() => import('@/components/Profil/ProfilPicture'))


export default async function Profil({ params }: { params: { username: string } }) {

  const userProfile = await getProfileConnected()
  const pageProfile = await getPageProfile(params.username)
  const posts = await getAllPostsFromUser(pageProfile?.id_user ?? '')


  if (pageProfile === null) {
    notFound()
  }


  const isUserProfil = pageProfile?.id_user === (userProfile?.id_user ?? '');

  return (
    <div className="h-full w-full flex flex-col overflow-y-auto overflow-x-hidden items-center">
      <div className="relative w-full min-h-[10rem] md:min-h-[18rem] bg-secondary/10 bg-cover bg-center transition-all" style={{ backgroundImage: `url(${pageProfile.banner_url})` }}>

      </div>

      <div className="relative w-full min-h-[7rem] max-w-[1280px]">
        <div className="flex relative -top-14 md:-top-20 left-10 md:left-20 lg:left-40 gap-2 md:gap-4 transition-all duration-500">
          {isUserProfil && <DynamicProfilPicture isUserProfil={isUserProfil} />}
          <Avatar src={pageProfile?.avatar_url} className={`${isUserProfil ? 'absolute' : 'flex'} h-28 w-28 md:h-40 md:w-40 rounded-full text-large transition-all`} />
          <div className="relative flex flex-col">
            <p className="absolute w-max text-xl md:text-2xl font-semibold bottom-2 md:bottom-7">
              {pageProfile?.username}
            </p>
          </div>
        </div>
        <div className="flex absolute bottom-2 md:-top-7 left-10 md:right-20 lg:right-10 md:left-auto gap-4 md:transition-all">
          {
            pageProfile.users_badges && pageProfile.users_badges.length > 0 && pageProfile.users_badges.map((badge, index) => {
              return (
                <Tooltip content={badge.items.nom} key={index}>
                  <div key={index} className="relative overflow-hidden h-14 w-14 rounded-full "><Image src={badge.items.image_url} alt="Userbadge" fill></Image></div>
                </Tooltip>
              )
            })
          }
          {/* {pageProfile.badge1 && <div className="relative overflow-hidden h-14 w-14 rounded-full "><Image src={pageProfile.badge1} alt="Userbadge" fill></Image></div>}
          {pageProfile.badge2 && <div className="relative overflow-hidden h-14 w-14 rounded-full "><Image src={pageProfile.badge2} alt="Userbadge" fill></Image></div>}
          {pageProfile.badge3 && <div className="relative overflow-hidden h-14 w-14 rounded-full "><Image src={pageProfile.badge3} alt="Userbadge" fill></Image></div>}
          {pageProfile.badge4 && <div className="relative overflow-hidden h-14 w-14 rounded-full "><Image src={pageProfile.badge4} alt="Userbadge" fill></Image></div>}
          {pageProfile.badge5 && <div className="relative overflow-hidden h-14 w-14 rounded-full "><Image src={pageProfile.badge5} alt="Userbadge" fill></Image></div>} */}
        </div>
      </div>




      <div className="flex flex-col w-full px-6 md:px-12 max-w-[1280px] mb-24 md:mb-12">
        <div className="flex flex-col-reverse gap-6 sm:gap-12 lg:flex-row my-6 md:my-12">
          <Compagnons isUserProfil={isUserProfil} />
          <Infos isUserProfil={isUserProfil} user={pageProfile} />
        </div>


        <div className="flex flex-col w-full gap-6 rounded-md transition-all items-center">
          <div className="text-2xl w-full font-semibold text-start">
            {isUserProfil ? "Mes Posts" : "Posts"}
          </div>
          <Posts userProfile={pageProfile} isUserProfil={isUserProfil} posts={posts as ExtendedPost[]} />
        </div>
      </div>
    </div >
  )
}
