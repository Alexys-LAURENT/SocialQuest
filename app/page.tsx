import Link from 'next/link'
import TopTabs from '@/components/Home/TopTabs'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { ExtendedPost, Profile } from '@/app/types/entities'
import PostsWrapper from '@/components/Home/PostsWrapper';
import { getUserConnected } from '@/utils/getUserConnected'
import { getProfileConnected } from '@/utils/getProfileConnected'
import { getAllPosts } from '@/utils/getAllPosts'
import { getGuildesUser } from '@/utils/getGuildesUser'


export default async function Index() {


  const user = await getProfileConnected()
  const posts = await getAllPosts()
  const guildesUser = await getGuildesUser()


  return (
    <div className="flex max-w-[1280px] w-full p-4 gap-6">

      <div className="hidden lg:flex min-w-[17rem]">
        <div className="w-full flex flex-col bg-[#11100e] rounded-md text-xl font-semibold h-fit">
          <Link href={`/${user ? user.username : 'login'}`} className='hover:bg-[#767676] hover:bg-opacity-75 py-1 px-2 rounded-md transition-all ease-in-out'>
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

        <TopTabs user={user} guildesUser={guildesUser} />

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
