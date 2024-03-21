import EternalMissionsWrapper from '@/components/Missions/EternalMissionsWrapper';
import HebdoCaroussel from '@/components/Missions/HebdoCaroussel';
import { getEternalMissions, getHebdoMissions } from '@/utils/getMissions';
const page = async () => {
  const hebdoMissions = await getHebdoMissions();
  const eternalMissions = await getEternalMissions();
  return (
    <div className="h-full w-full flex flex-col gap-10 overflow-y-auto overflow-x-hidden items-center">
      <div className="relative w-full  bg-cover bg-center transition-all max-w-[1280px]">
        <HebdoCaroussel missions={hebdoMissions} />
      </div>

      <EternalMissionsWrapper eternalMissions={eternalMissions} />
    </div>
  );
};

export default page;
