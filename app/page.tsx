import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { ExtendedPost, Profile } from '@/app/types/entities'
import Link from 'next/link'
import Post from '@/components/Post'

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


  const { data: posts, error: postsError } = await supabase
    .from('posts')
    .select('*, profiles(username, avatar_url, a_propos)') as { data: ExtendedPost[], error: any };

  console.log(posts);

  return (
    <div className="flex max-w-[1280px] w-full p-4 gap-6">
      <div className="hidden lg:flex min-w-[17rem]">

        <div className="w-full flex flex-col bg-[#11100e] rounded-md text-xl font-semibold h-fit">
          <Link href={`/${user?.username}`} className='hover:bg-[#767676] hover:bg-opacity-75 py-1 px-2 rounded-md transition-all ease-in-out'>Ma page</Link>
          <Link href={`#`} className='hover:bg-[#767676] hover:bg-opacity-75 py-1 px-2 rounded-md transition-all ease-in-out'>Mes Compagnons</Link>
          <Link href={`#`} className='hover:bg-[#767676] hover:bg-opacity-75 py-1 px-2 rounded-md transition-all ease-in-out'>Mes Guildes</Link>
        </div>
      </div>


      <div className="flex flex-col w-full gap-10">
        <div className="w-full flex flex-col min-h-[10rem]">
          <div className="h-[80%] w-full bg-[#11100e] rounded-t-md">

          </div>
          <div className="h-[20%] w-full bg-[#1f1e1b] rounded-b-md">

          </div>
        </div>

        <div className="w-full flex flex-col gap-4 mb-4">
          {posts?.length !== 0 ? (
            posts?.map((post: ExtendedPost) => (
              <Post key={post.id_post} post={post} user={user} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="text-2xl font-semibold">
                Aucun post 😢
              </div>
            </div>
          )}
        </div>
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
