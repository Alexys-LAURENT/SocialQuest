import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { ReactNode, Suspense } from 'react';
import { getGuildInfos } from '@/utils/getGuildInfos';
import JoinQuitButton from '@/components/guildes/JoinQuitButton';
import { getProfileConnected } from '@/utils/getProfileConnected';
import EditGuildButton from '@/components/guildes/EditGuildButton';
import dynamic from 'next/dynamic';
import GuildUpdateProfilePicture from '@/components/guildes/GuildUpdateProfilePicture';
import GuildeDescription from '@/components/guildes/GuildeDescription';
import GuildeModerators from '@/components/guildes/GuildeModerators';
import { createClient } from '@supabase/supabase-js';

const DynamicPostInput = dynamic(() => import('@/components/PostInput'));

export const revalidate = 3600;

export async function generateStaticParams() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const results = await supabase.from('guildes').select('nom');
  const guildNames = results.data;

  if (guildNames?.length === 0) {
    return {
      notFound: true,
    };
  }

  const params = guildNames?.map(({ nom }) => ({
    guildName: [nom],
  }));

  const paramsWithActivities = guildNames?.map(({ nom }) => ({
    guildName: [nom, 'activities'],
  }));

  const paramsWithGuildWars = guildNames?.map(({ nom }) => ({
    guildName: [nom, 'guildwars'],
  }));

  const returnData = params?.concat(paramsWithActivities!, paramsWithGuildWars!);

  return returnData;
}

const layout = async ({
  children,
  params,
  guildwars,
}: {
  children: ReactNode;
  params: { guildName: string };
  guildwars: ReactNode;
}) => {
  if (params.guildName[1] && params.guildName[1] !== 'activities' && params.guildName[1] !== 'guildwars')
    redirect(`/g/${params.guildName[0]}`);
  const decodedGuildName = decodeURIComponent(params.guildName[0]);
  const user = await getProfileConnected();
  const guilde = await getGuildInfos(decodedGuildName, user?.id_user);

  if (guilde === null) {
    notFound();
  }

  const isGuildCreator = guilde?.created_by === user?.id_user;

  return (
    <div className="h-full w-full flex flex-col items-center">
      <div
        className="relative w-full min-h-[10rem] md:min-h-[18rem] bg-white bg-cover bg-center transition-all"
        style={{ backgroundImage: `url('${guilde.banner_url ? guilde.banner_url : '/assets/Jane.png'}')` }}
      ></div>

      <>
        <div className="relative -top-[40px] sm:-top-[60px] md:-top-[80px] w-full max-w-[1280px] flex items-end px-6 md:px-12">
          <GuildUpdateProfilePicture isGuildCreator={isGuildCreator} guilde={guilde} />
          <div className="flex justify-between items-center h-unit-10 mb-1 sm:mb-0 ms-2 sm:ms-4  md:mb-7 w-full">
            <div className="sm:max-w-[80%]">
              <p className=" w-full overflow-hidden text-ellipsis line-clamp-1 text-lg md:text-2xl font-semibold text-textDark dark:text-textLight transition-all !duration-[125ms]">
                {guilde!.nom}
              </p>
            </div>
            <span className="sm:flex items-center hidden gap-4">
              {guilde.created_by === user?.id_user ? (
                <EditGuildButton guilde={guilde} />
              ) : (
                <JoinQuitButton guilde={guilde} user={user} />
              )}
            </span>
          </div>
        </div>

        <div className=" w-full max-w-[1280px] px-6 md:px-12 flex flex-row justify-end my-4 sm:my-2 gap-2 sm:gap-4 sm:hidden -top-[40px] sm:-top-[60px] md:-top-[80px] relative">
          {guilde.created_by === user?.id_user ? (
            <EditGuildButton guilde={guilde} />
          ) : (
            <JoinQuitButton guilde={guilde} user={user} />
          )}
        </div>
      </>

      {/*  */}
      <div className="flex max-w-[1280px] w-full p-4 gap-6 mt-6">
        <div className="hidden lg:flex min-w-[17rem]">
          <div className="w-full flex flex-col bg-bgLightCard dark:bg-bgDarkCard rounded-md text-xl font-semibold h-fit">
            <Link
              href={`/g/${params.guildName[0]}`}
              className="hover:bg-[#767676] hover:bg-opacity-75 py-1 px-2 rounded-md transition-all ease-in-out"
            >
              Feed
            </Link>
            <Link
              href={`/g/${params.guildName[0]}/guildwars`}
              className="hover:bg-[#767676] hover:bg-opacity-75 py-1 px-2 rounded-md transition-all ease-in-out"
            >
              Combats de Guildes
            </Link>
          </div>
        </div>

        <div className="flex flex-col w-full gap-10">
          {!params.guildName[1] && user && <DynamicPostInput id_guilde={guilde!.id_guilde} />}
          {params.guildName[1] === 'guildwars' && guildwars}
          {!params.guildName[1] && children}
        </div>

        <div className="hidden md:flex flex-col min-w-[17rem] gap-4 h-fit">
          <Suspense
            fallback={
              <div className="w-full h-[150px] bg-tempLightBorder dark:bg-tempDarkBorder rounded-md animate-pulse"></div>
            }
          >
            <GuildeDescription guilde_description={guilde!.description} id_guilde={guilde!.id_guilde} />
          </Suspense>

          <Suspense
            fallback={
              <div className="w-full h-[150px] bg-tempLightBorder dark:bg-tempDarkBorder rounded-md animate-pulse"></div>
            }
          >
            <GuildeModerators id_guilde={guilde!.id_guilde} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default layout;
