'use client';
import { ToasterContext } from '@/app/context/ToasterContext';
import { EternalMission, MissionItemInfos } from '@/app/types/entities';
import { createClient } from '@/utils/supabase/client';
import { Button, Card, CardBody, Progress, Tooltip } from '@nextui-org/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
const EternalMissionCard = ({ mission }: { mission: EternalMission }) => {
  const { success, error } = useContext(ToasterContext);
  const router = useRouter();
  const handleSubmitMission = async () => {
    if (mission.current === undefined) return;
    if (mission.current < mission.goal) return;
    if (mission.done) return;
    const supabase = createClient();
    const { error: errorCompleteMission } = await supabase.rpc('complete_eternal_mission', {
      the_id_mission: mission.id_missions,
    });
    if (errorCompleteMission) {
      console.log(errorCompleteMission);
      return error('Erreur lors de la récupération de la mission');
    }
    success('Mission récupérée');
    router.refresh();
  };
  return (
    <Card className="w-full flex">
      <CardBody className=" w-full rounded-large h-[70%] flex border items-center ">
        <div className=" w-[90%] h-[70%] flex flex-col gap-2 ">
          <div className="flex flex-col w-full h-full justify-end">
            <h2 className="font-semibold text-xl">{mission.libelle}</h2>
          </div>
          <div className="flex justify-between">
            <span>
              {mission.current}/{mission.goal}
            </span>
            <Button
              onClick={() => handleSubmitMission()}
              className={`customButton ${mission.done || mission.current < mission.goal ? '' : 'bg-secondary/70 border-secondary'}`}
              disabled={mission.done || mission.current < mission.goal}
            >
              {mission.done ? 'Récupéré' : 'Récupérer'}
            </Button>
          </div>
          <div className="max-w-full flex-nowrap overflow-y-auto flex items-center gap-2">
            {mission.items_info.map((item: MissionItemInfos) => {
              return (
                <Tooltip
                  content={item.nom}
                  placement="bottom"
                  showArrow
                  key={`mission-eternal-${mission.id_missions}-${item.nom}`}
                >
                  <div className="h-[50px] w-[50px] bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder aspect-square rounded-md relative">
                    <Image src={item.image_url} alt={item.nom} layout="fill" objectFit="cover" />
                  </div>
                </Tooltip>
              );
            })}
          </div>
          <div className="w-full h-[20%] flex justify-center items-center">
            <Progress
              value={mission.current}
              aria-label="progress bar"
              maxValue={mission.goal}
              classNames={{ indicator: 'bg-secondary' }}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default EternalMissionCard;
