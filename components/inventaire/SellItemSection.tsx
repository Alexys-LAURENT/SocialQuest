'use client';
import { Button, Input } from '@nextui-org/react';
import Image from 'next/image';
import { Item } from '@/app/types/entities';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { sellItem } from '@/utils/sellItem';

const SellItemSection = ({
  success,
  error,
  selectedItem,
}: {
  success: (message: string) => void;
  error: (message: string) => void;
  selectedItem: Item;
}) => {
  const [price, setPrice] = useState<number>();
  const handleSellItem = async () => {
    if (!price) return error('Veuillez entrer un prix');
    if (price === 0) return error('Le prix ne peut pas être 0');
    const isSold = await sellItem(price, selectedItem.id_item_user);
    if (isSold) {
      success('Objet mis en vente');
      setPrice(undefined);
    } else {
      error('Erreur lors de la mise en vente');
    }
  };

  return (
    <div className="flex flex-col border-t dark:border-gray-200 border-gray-500 gap-2 p-4 pb-12">
      <p className="text-3xl font-bold text-center pb-4 text-textDark dark:text-textLight transition-all !duration-[125ms]">
        Marché
      </p>

      <p className="flex gap-1 text-sm text-textDark dark:text-textLight transition-all !duration-[125ms]">
        Prix moyen sur le marché :{' '}
        <span className="flex flex-row items-center gap-1 text-textDark dark:text-textLight transition-all !duration-[125ms]">
          125 <Image src="/assets/SocialCoin.png" width={16} height={16} alt="SocialCoin" />
        </span>
      </p>

      <Input
        type="number"
        label="Prix"
        className="w-full"
        size="sm"
        onKeyDown={(evt) => ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()}
        value={price?.toString()}
        onChange={(e) => setPrice(Number(e.target.value))}
        labelPlacement="inside"
        classNames={{ inputWrapper: 'py-0 h-10 rounded-none transition-all !duration-500' }}
      />

      <Button className="w-full rounded-none min-h-[40px] bg-secondary" variant="flat" onClick={() => handleSellItem()}>
        Mettre en vente
      </Button>
    </div>
  );
};

export default SellItemSection;
