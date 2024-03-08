import GuildWarsSuspenserSkeleton from '@/components/Skeletons/GuildWarsSuspenserSkeleton';
import GuildWarsSuspenser from '@/components/guildes/GuildWarsSuspenser';
import ModalGuildsWars from '@/components/guildes/ModalGuildsWars';
import { getGuildInfos } from '@/utils/getGuildInfos';
import { getUserConnected } from '@/utils/getUserConnected';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

const GuildWars = async ({ params }: { params: { guildName: string } }) => {
  const decodedGuildName = decodeURIComponent(params.guildName[0]);
  const user = await getUserConnected();
  const guilde = await getGuildInfos(decodedGuildName, user?.id);
  if (guilde === null) {
    notFound();
  }

  return (
    <>
      <div className="w-full flex flex-col gap-6">
        <Suspense fallback={<GuildWarsSuspenserSkeleton />}>
          <GuildWarsSuspenser guilde={guilde!} user={user} />
        </Suspense>
      </div>
      <ModalGuildsWars guilde={guilde!} user={user!} />
    </>
  );
};

export default GuildWars;
