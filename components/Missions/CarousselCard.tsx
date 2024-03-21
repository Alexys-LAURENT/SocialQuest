'use client';
import { ToasterContext } from '@/app/context/ToasterContext';
import { HebdoMission, MissionItemInfos } from '@/app/types/entities';
import { createClient } from '@/utils/supabase/client';
import { Button, Progress, Tooltip } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import Image from 'next/image';
const CarousselCard = ({ missionHebdo }: { missionHebdo: HebdoMission }) => {
  const { success, error } = useContext(ToasterContext);
  const router = useRouter();

  const handleSubmitMission = async () => {
    if (missionHebdo.current === undefined) return;
    if (missionHebdo.current < missionHebdo.goal) return;
    if (missionHebdo.done) return;
    const supabase = createClient();
    const { error: errorCompleteMission } = await supabase.rpc('complete_mission', {
      the_id_mission_de_la_semaine: missionHebdo.id_mission_de_la_semaine,
    });
    if (errorCompleteMission) {
      console.log(error);
      return error('Erreur lors de la récupération de la mission');
    }
    success('Mission récupérée');
    router.refresh();
  };

  return (
    <div
      key={`mission-hebdo-${missionHebdo.id_mission_de_la_semaine}`}
      className="transition-all flex flex-col items-center h-[80%] min-w-[400px] max-w-[400px] rounded-large backdrop-blur-md backdrop-saturate-150 border-none bg-background/50 "
    >
      <div className=" w-[85%] h-[80%] flex flex-col justify-end gap-2">
        <div className="flex flex-col w-10/12">
          <h2 className="font-semibold text-lg">{missionHebdo.libelle}</h2>
        </div>
        <div className="flex justify-between">
          <span>
            {missionHebdo.current}/{missionHebdo.goal}
          </span>
          <Button
            className={`customButton ${missionHebdo.done || missionHebdo.current < missionHebdo.goal ? '' : 'bg-secondary/70 border-secondary'}`}
            disabled={missionHebdo.done || missionHebdo.current < missionHebdo.goal}
            onClick={() => handleSubmitMission()}
          >
            {missionHebdo.done ? 'Récupéré' : 'Récupérer'}
          </Button>
        </div>
        <div className="w-[85%] flex items-center gap-2">
          {missionHebdo.items_info.map((item: MissionItemInfos) => {
            return (
              <Tooltip content={item.nom} placement="bottom" showArrow key={`mission-hebdo-${item.nom}`}>
                <div className="h-[40px] w-[40px] border aspect-square rounded-md relative">
                  <Image src={item.image_url} alt={item.nom} layout="fill" objectFit="cover" />
                </div>
              </Tooltip>
            );
          })}
        </div>
      </div>
      <div className="w-[85%] h-[20%] flex justify-center items-center">
        <Progress
          value={missionHebdo.current}
          aria-label="progress bar"
          maxValue={missionHebdo.goal}
          classNames={{ indicator: 'bg-secondary' }}
        />
      </div>
    </div>
  );
};

export default CarousselCard;
