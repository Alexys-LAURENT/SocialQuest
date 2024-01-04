import Link from 'next/link'
import TopTabs from '@/components/Home/TopTabs'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { ExtendedPost, Profile } from '@/app/types/entities'
import PostsWrapper from '@/components/Home/PostsWrapper';


export default async function Index() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { user: userAuth },
  } = await supabase.auth.getUser()

  const { data: user } = await supabase
    .from('profiles')
    .select()
    .eq('id_user', userAuth?.id)
    .single() as { data: Profile };


  const { data: postsWithLikes, error: postsError } = await supabase
    .from('posts')
    .select(`*, profiles(username, avatar_url, a_propos),guildes(nom, avatar_url), likes(id_like, id_user)`)
    .is('parent', null)
    .order('created_at', { ascending: false });

  // Récupérer le nombre total de likes par post
  const posts = postsWithLikes?.map(post => {
    const likesCount = post.likes.length;
    const userLikedPost = post.likes.some((like: any) => like.id_user === userAuth?.id); // Remplacez currentUserID par l'ID de l'utilisateur actuel

    return { ...post, likesCount, userLikedPost };
  }) as ExtendedPost[];


  return (
    <div className="flex max-w-[1280px] w-full p-4 gap-6">

      <div className="hidden lg:flex min-w-[17rem]">
        <div className="w-full flex flex-col bg-[#11100e] rounded-md text-xl font-semibold h-fit">
          <Link href={`/${user?.username}`} className='hover:bg-[#767676] hover:bg-opacity-75 py-1 px-2 rounded-md transition-all ease-in-out'>
            Ma page
          </Link>
          <Link href={`#`} className='hover:bg-[#767676] hover:bg-opacity-75 py-1 px-2 rounded-md transition-all ease-in-out'>
            Mes Compagnons
          </Link>
          <Link href={`#`} className='hover:bg-[#767676] hover:bg-opacity-75 py-1 px-2 rounded-md transition-all ease-in-out'>
            Mes Guildes
          </Link>
        </div>
      </div>


      <div className="flex flex-col w-full gap-6 lg:gap-10">

        <TopTabs user={user} />

        <PostsWrapper posts={posts} user={user} />
      </div>

      <div className="hidden md:flex flex-col min-w-[17rem] gap-4 h-fit">
        <div className="p-2 w-full flex flex-col bg-[#11100e] rounded-md">
          <div className="text-xl font-semibold min-h-[25rem]">
            Top Guildes
          </div>
        </div>
        <div className="p-2 w-full flex flex-col bg-[#11100e] rounded-md">
          <div className="text-xl font-semibold min-h-[25rem]">
            Top Membres
          </div>
        </div>
      </div>

    </div>
  )
}
