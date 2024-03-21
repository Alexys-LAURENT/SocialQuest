import EternalMissionsWrapper from '@/components/Missions/EternalMissionsWrapper';
import HebdoCaroussel from '@/components/Missions/HebdoCaroussel';
import { getEternalMissions, getHebdoMissions } from '@/utils/getMissions';
const page = async () => {
  const hebdoMissions = await getHebdoMissions();
  const eternalMissions = await getEternalMissions();
  return (
    <div className="h-full w-full flex flex-col gap-10 overflow-y-auto overflow-x-hidden items-center">
      <div className="flex flex-col w-full max-w-[1280px] gap-4">
        <h2 className="text-xl font-semibold">Missions de la semaine</h2>
        <HebdoCaroussel missions={hebdoMissions} />
      </div>
      <div className="flex flex-col w-full max-w-[1280px] gap-4">
        <h2 className="text-xl font-semibold">Toutes les missions</h2>
        <EternalMissionsWrapper eternalMissions={eternalMissions} />
      </div>
    </div>
  );
};

export default page;
