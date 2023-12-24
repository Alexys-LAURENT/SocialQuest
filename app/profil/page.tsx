import Posts from '@/components/Profil/Posts'
import Infos from '@/components/Profil/Infos'
import Compagnons from '@/components/Profil/Compagnons'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { Avatar, Link, Image, Button, Progress } from '@nextui-org/react'
import { ChatBubbleLeftIcon, ChatBubbleOvalLeftEllipsisIcon, EllipsisVerticalIcon, HeartIcon } from '@heroicons/react/24/outline'

export default async function Index() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser()
  // console.log(user)
  // const canInitSupabaseClient = () => {
  //   // This function is just for the interactive tutorial.
  //   // Feel free to remove it once you have Supabase connected.
  //   try {
  //     createClient(cookieStore)
  //     return true
  //   } catch (e) {
  //     return false
  //   }
  // }

  // const isSupabaseConnected = canInitSupabaseClient()

  return (
    <div className="h-full w-full flex flex-col overflow-y-auto items-center">
      <div className="relative w-full min-h-[10rem] md:min-h-[18rem] bg-white bg-cover bg-center transition-all" style={{ backgroundImage: "url('/assets/Jane.png')" }}>

      </div>

      <div className="relative w-full min-h-[7rem] max-w-[1280px]">
        <div className="flex absolute -top-14 md:-top-20 left-10 md:left-20 lg:left-40 gap-2 md:gap-4 transition-all duration-500">
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="h-28 w-28 md:h-40 md:w-40 rounded-full text-large transition-all" />
          <div className="relative flex flex-col">
            <p className="absolute w-max text-xl md:text-2xl font-semibold bottom-2 md:bottom-7">John Doe</p>
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
        <div className="flex flex-col-reverse gap-12 lg:flex-row my-6 md:my-12">
          <Compagnons />
          <Infos />
        </div>


        <div className="flex flex-col w-full gap-6 rounded-md transition-all items-center">
          <div className="text-2xl w-full font-semibold text-start">
            Mes Posts
          </div>
          <Posts />
        </div>
      </div>
    </div >
  )
}
