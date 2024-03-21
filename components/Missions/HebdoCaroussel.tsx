import { clsx } from '@nextui-org/shared-utils';
import { HebdoMission } from '@/app/types/entities';
import CarousselCard from './CarousselCard';

const HebdoCaroussel = ({ missions }: { missions: HebdoMission[] }) => {
  return (
    <>
      <div
        id="carousselMissions"
        className={clsx(
          'transition-all no-scrollbar h-[200px] relative w-full flex items-center gap-5 overflow-x-scroll flex-nowrap px-5 xl:rounded-lg bg-gradient-to-br  from-[#60efff] to-[#183182]',
        )}
      >
        {missions &&
          missions.length > 0 &&
          missions.map((mission) => {
            return <CarousselCard key={`mission-hebdo-${mission.id_mission_de_la_semaine}`} missionHebdo={mission} />;
          })}
      </div>
    </>
  );
};

export default HebdoCaroussel;
