import { formatCount } from '@/utils/formatCount';
import { getCountGuildeMember } from '@/utils/getCountGuildeMember';
import { Divider } from '@nextui-org/react';

const GuildeDescription = async ({
  guilde_description,
  id_guilde,
}: {
  guilde_description: string;
  id_guilde: string;
}) => {
  const users_count = await getCountGuildeMember(id_guilde);

  return (
    <div className="p-2 w-full h-fit flex flex-col bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder rounded-md">
      <div className="text-lg font-semibold">
        <h4>A propos</h4>
        <span className="text-sm font-normal">{guilde_description}</span>
      </div>
      <div className="w-full ">
        <Divider className="my-2" />
        <div className="flex flex-col">
          <p className="text-md font-semibold">{formatCount(users_count)}</p>
          <span className="text-tiny opacity-60">membres</span>
        </div>
      </div>
    </div>
  );
};

export default GuildeDescription;
