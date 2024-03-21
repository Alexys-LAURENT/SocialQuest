import { Button, Card, CardBody, Progress, Tooltip } from '@nextui-org/react';
import Image from 'next/image';
import EternalMissionCard from './EternalMissionCard';
import { EternalMission } from '@/app/types/entities';
const EternalMissionsWrapper = ({ eternalMissions }: { eternalMissions: EternalMission[] }) => {
  return (
    <div className="relative w-full min-h-[7rem] max-w-[1280px]">
      <Card>
        <CardBody className="flex flex-col gap-8">
          {eternalMissions &&
            eternalMissions.length > 0 &&
            eternalMissions.map((mission: EternalMission) => {
              return <EternalMissionCard key={`mission-eternal-${mission.id_missions}`} mission={mission} />;
            })}
        </CardBody>
      </Card>
    </div>
  );
};

export default EternalMissionsWrapper;
