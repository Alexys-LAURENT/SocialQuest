'use client';
import { Button, Card, CardBody, Input, Spinner } from '@nextui-org/react';
import Image from 'next/image';
import { Item } from '@/app/types/entities';
import { useEffect, useState } from 'react';
import { sellItem } from '@/utils/sellItem';
import { getNumberOfCurrentSalesByItemByUser } from '@/utils/getNumberOfCurrentSalesByItemByUser';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { removeItemFromSales } from '@/utils/removeItemFromSales';

const SellItemSection = ({
  success,
  error,
  selectedItem,
  averagePrice,
  loadingAvg,
}: {
  success: (message: string) => void;
  error: (message: string) => void;
  selectedItem: Item;
  averagePrice: number | null;
  loadingAvg: boolean;
}) => {
  const [sales, setSales] = useState<any[]>([]);
  const [price, setPrice] = useState<number>();
  const [triggerUpdateSales, setTriggerUpdateSales] = useState(0);
  const handleSellItem = async () => {
    if (!price) return error('Veuillez entrer un prix');
    if (price === 0) return error('Le prix ne peut pas être 0');
    const isSold = await sellItem(price, selectedItem.id_item, selectedItem.id_user);
    if (isSold === true) {
      success('Objet mis en vente');
      setPrice(0);
      setTriggerUpdateSales((prev) => prev + 1);
    } else {
      error(isSold.message);
    }
  };

  useEffect(() => {
    const getSalesForItem = async () => {
      const data = await getNumberOfCurrentSalesByItemByUser(selectedItem.id_user, selectedItem.id_item);
      if (data) {
        setSales(data);
      }
    };
    getSalesForItem();
  }, [triggerUpdateSales, selectedItem]);

  const handleRemoveItemFromSales = async (timestamp: string) => {
    const isRemoved = await removeItemFromSales(selectedItem.id_user, selectedItem.id_item, timestamp);
    if (isRemoved) {
      setTriggerUpdateSales((prev) => prev + 1);
      success('Objet retiré du marché');
    } else {
      error("Erreur lors de la suppression de l'objet du marché");
    }
  };

  return (
    <div className="m-2 p-4 gap-4 flex flex-col bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder rounded-md">
      <p className="text-xl font-bold text-center text-textDark dark:text-textLight transition-all !duration-[125ms]">
        Marché
      </p>

      <div className="w-full">
        {sales &&
          sales.length > 0 &&
          sales.map((sale, index) => (
            <Card key={`${sale.timestamp}-${index}`} className="w-full mb-2">
              <CardBody>
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="">{sale.prix}</span>
                    <Image src="/assets/SocialCoin.png" width={16} height={16} alt="SocialCoin" />
                  </div>
                  <XMarkIcon
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => handleRemoveItemFromSales(sale.timestamp)}
                  />
                </div>
                <span className="text-tiny w-full flex justify-start opacity-40">{sale.timestampFormatted}</span>
              </CardBody>
            </Card>
          ))}
      </div>

      <p className="flex gap-1 text-sm text-textDark dark:text-textLight transition-all !duration-[125ms]">
        Prix moyen :
        {loadingAvg ? (
          <Spinner size="sm" color="white" className="scale-75" />
        ) : (
          <span className="flex flex-row items-center gap-1 text-textDark dark:text-textLight transition-all !duration-[125ms]">
            {averagePrice !== null ? (
              <>
                {averagePrice} <Image src="/assets/SocialCoin.png" width={16} height={16} alt="SocialCoin" />
              </>
            ) : (
              'Aucune vente'
            )}{' '}
          </span>
        )}
      </p>

      <Input
        type="number"
        label="Prix"
        className="w-full"
        size="sm"
        disabled={selectedItem.count === sales.length}
        onKeyDown={(evt) => ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()}
        value={price?.toString()}
        onChange={(e) => setPrice(Number(e.target.value))}
        labelPlacement="inside"
        classNames={{
          inputWrapper: `py-0 h-10 rounded-none transition-all !duration-500 ${selectedItem.count === sales.length ? 'opacity-30 data-[hover=true]:bg-default-100' : ''}`,
        }}
      />

      <Button
        className={`!w-full customButton ${selectedItem.count === sales.length ? 'bg-secondary/30 border-secondary/30 text-opacity-30' : 'bg-secondary border-secondary'}  `}
        variant="flat"
        onClick={() => handleSellItem()}
        disabled={selectedItem.count === sales.length}
      >
        Mettre en vente
      </Button>
    </div>
  );
};

export default SellItemSection;
