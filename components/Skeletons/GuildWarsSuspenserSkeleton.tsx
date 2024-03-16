import { Button, Spinner } from '@nextui-org/react';

const GuildWarsSuspenserSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-6 ">
      <Button className="customButton !w-full !text-medium !h-[37.59px]">
        <Spinner size="sm" className="scale-75" color="white" />
      </Button>

      <div className="flex flex-col h-[243px] w-full divide-y-1 px-2">
        <div className="w-full h-[60.3px] flex items-center justify-between">
          <p className="text-foreground text-large">Combat(s) en cours</p>
          <Spinner size="sm" className="scale-75" color="white" />
        </div>
        <div className="w-full h-[60.3px] flex items-center justify-between">
          <p className="text-foreground text-large">Combat(s) terminé(s)</p>
          <Spinner size="sm" className="scale-75" color="white" />
        </div>
        <div className="w-full h-[60.3px] flex items-center justify-between">
          <p className="text-foreground text-large">Mes demandes</p>
          <Spinner size="sm" className="scale-75" color="white" />
        </div>
        <div className="w-full h-[60.3px] flex items-center justify-between">
          <p className="text-foreground text-large">Demandes reçues</p>
          <Spinner size="sm" className="scale-75" color="white" />
        </div>
      </div>
    </div>
  );
};

export default GuildWarsSuspenserSkeleton;
