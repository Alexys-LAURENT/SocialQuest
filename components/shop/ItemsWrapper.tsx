import { itemShop } from '@/app/types/entities';
import { Button, Chip } from '@nextui-org/react';
import Image from 'next/image';

const ItemsWrapper = ({ initialShopItems }: { initialShopItems: itemShop[] }) => {
  return (
    <div className="flex w-full overflow-hidden gap-2 p-4 flex-wrap">
      {initialShopItems &&
        initialShopItems.length > 0 &&
        initialShopItems.map((item, index) => (
          <div
            key={index + 100}
            className="cursor-pointer hover:scale-[1.02] transition-all relative flex flex-col items-center justify-center min-w-[150px] w-[150px] min-h-[200px] | md:min-w-[200px] md:w-[200px] md:min-h-[250px] p-2 bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder rounded-md"
          >
            <div className="flex w-full h-[70%] border border-tempLightBorder dark:border-tempDarkBorder bg-tempBgLightTertiary dark:bg-tempBgDarkSecondary rounded-md relative">
              <Image
                src={item.item_infos.image_url}
                alt={item.item_infos.nom}
                width={250}
                height={250}
                className="p-2 md:p-8 absolute top-0 left-0 right-0 bottom-0 w-full !h-full object-cover"
              />
              <Chip className="text-[10px] p-[2px] md:py-1 h-fit md:text-tiny absolute top-2 right-2">
                {item.item_infos.type}
              </Chip>
            </div>
            <div className="flex flex-col gap-1 w-full  mt-2">
              <div className="w-full flex gap-1 items-center">
                <p className="w-full line-clamp-1 text-ellipsis overflow-hidden ">{item.item_infos.nom}</p>
              </div>
              <div className="w-full flex gap-1 items-center">
                <Button className="customButton bg-secondary/20 border-secondary/30 !w-full items-center gap-1">
                  {item.prix}
                  <Image src="/assets/SocialCoin.png" alt="SocialCoin" width={16} height={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ItemsWrapper;
