import Posts from '@/components/Profil/Posts'
import Infos from '@/components/Profil/Infos'
import Compagnons from '@/components/Profil/Compagnons'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { Avatar } from '@nextui-org/react'
import { notFound } from 'next/navigation'
import { ExtendedPost } from '@/app/types/entities'
import { getUserConnected } from '@/utils/getUserConnected'
import dynamic from 'next/dynamic'

const DynamicProfilPicture = dynamic(() => import('@/components/Profil/ProfilPicture'))


export default async function Profil({ params }: { params: { username: string } }) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const user = await getUserConnected()

  const { data: userProfile, error: erroruserProfile } = await supabase
    .from('profiles')
    .select("*")
    .eq('username', params.username)
    .single()


  if (userProfile === null) {
    notFound()
  }


  const { data: postsWithLikes, error: errorPosts } = await supabase
    .from('posts')
    .select(`*, profiles(username, avatar_url, a_propos),guildes(nom, avatar_url), likes(id_like, id_user),
    children:posts(id_post)`)
    .eq('id_user', userProfile?.id_user)
    .order('created_at', { ascending: false });

  // Récupérer le nombre total de likes par post
  const posts = postsWithLikes?.map(post => {
    const likesCount = post.likes.length;
    const answersCount = post.children.length;
    const userLikedPost = post.likes.some((like: any) => like.id_user === user?.id); // Remplacez currentUserID par l'ID de l'utilisateur actuel

    return { ...post, likesCount, answersCount, userLikedPost };
  }) as ExtendedPost[];


  const isUserProfil = userProfile?.id_user === (user?.id ?? '');

  return (
    <div className="h-full w-full flex flex-col overflow-y-auto overflow-x-hidden items-center">
      <div className="relative w-full min-h-[10rem] md:min-h-[18rem] bg-white bg-cover bg-center transition-all" style={{ backgroundImage: "url('/assets/Jane.png')" }}>

      </div>

      <div className="relative w-full min-h-[7rem] max-w-[1280px]">
        <div className="flex relative -top-14 md:-top-20 left-10 md:left-20 lg:left-40 gap-2 md:gap-4 transition-all duration-500">
          {isUserProfil && <DynamicProfilPicture isUserProfil={isUserProfil} />}
          <Avatar src={userProfile?.avatar_url} className={`${isUserProfil ? 'absolute' : 'flex'} h-28 w-28 md:h-40 md:w-40 rounded-full text-large transition-all`} />
          <div className="relative flex flex-col">
            <p className="absolute w-max text-xl md:text-2xl font-semibold bottom-2 md:bottom-7">
              {userProfile?.username}
            </p>
          </div>
        </div>
        <div className="flex absolute bottom-2 md:-top-5 left-10 md:right-20 lg:right-40 md:left-auto gap-4 md:transition-all">
          <div className="h-10 w-10 rounded-full bg-green-500"></div>
          <div className="h-10 w-10 rounded-full bg-yellow-500"></div>
          <div className="h-10 w-10 rounded-full bg-pink-500"></div>
          <div className="h-10 w-10 rounded-full bg-blue-500"></div>
        </div>
      </div>




      <div className="flex flex-col w-full px-6 md:px-12 max-w-[1280px] mb-24 md:mb-12">
        <div className="flex flex-col-reverse gap-6 sm:gap-12 lg:flex-row my-6 md:my-12">
          <Compagnons isUserProfil={isUserProfil} />
          <Infos isUserProfil={isUserProfil} data={userProfile} />
        </div>


        <div className="flex flex-col w-full gap-6 rounded-md transition-all items-center">
          <div className="text-2xl w-full font-semibold text-start">
            {isUserProfil ? "Mes Posts" : "Posts"}
          </div>
          <Posts userProfile={userProfile} isUserProfil={isUserProfil} posts={posts as ExtendedPost[]} />
        </div>
      </div>
    </div >
  )
}
