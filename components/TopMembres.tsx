import TopMembresItems from '@/components/TopMembresItems';

const TopMembres = ({ customFunction, initMembres }: { customFunction?: () => void; initMembres?: any }) => {
  return (
    <div className="min-h-[396.6px] p-4 w-full flex flex-col bg-tempBgLightSecondary dark:bg-tempBgDark border dark:border-tempDarkBorder border-tempLightBorder rounded-md transition-all !duration-500">
      <div className="flex flex-col min-h-[19.5rem] text-textDark dark:text-textLight transition-all !duration-[125ms] gap-4">
        <h3 className="text-base font-semibold">Top Membres</h3>
        <TopMembresItems customFunction={customFunction} initMembres={initMembres} />
      </div>
    </div>
  );
};

export default TopMembres;
