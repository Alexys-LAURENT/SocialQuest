import { bestSellingItem } from '@/app/types/entities';
import Image from 'next/image';
const MostBuyedItems = ({ bestSellingItems }: { bestSellingItems: bestSellingItem[] }) => {
  return (
    <div>
      <h3>items les plus achetés</h3>
      <div className="flex flex-row items-center max-w-full py-2 gap-2 overflow-x-auto flex-nowrap">
        {bestSellingItems &&
          bestSellingItems.length > 0 &&
          bestSellingItems.map((item, index) => (
            <div
              key={'bestSellingItem' + item.nom + index}
              className="relative flex flex-col items-center justify-center min-w-[150px] w-[150px] min-h-[200px] h-[200px] | md:min-w-[200px] md:w-[200px] md:min-h-[250px] md:h-[250px] p-2 bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder rounded-md"
            >
              <div className="flex w-full h-[70%] dark:bg-tempDarkHover bg-tempDarkHover/20 rounded-md relative">
                <Image
                  src={item.image_url}
                  alt={item.nom}
                  width={100}
                  height={100}
                  className=" rounded-md absolute top-0 left-0 right-0 bottom-0 w-full !h-full object-cover"
                />
              </div>
              <div className="flex flex-col w-full h-[30%] mt-1">
                <p className="md:text-lg font-medium w-[140px] md:w-[200px] overflow-hidden h-fit line-clamp-1 text-ellipsis">
                  {item.nom}
                </p>
                <p className="text-tiny line-clamp-2 text-ellipsis opacity-60">{item.description}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MostBuyedItems;
