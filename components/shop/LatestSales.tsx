'use client';

import { latestSale } from '@/app/types/entities';
import { getLatestSales } from '@/utils/getLatestSales';
import { createClient } from '@/utils/supabase/client';
import { ScrollShadow } from '@nextui-org/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const LatestSales = ({ initialLatestSales }: { initialLatestSales: latestSale[] }) => {
  const [latestSales, setLatestSales] = useState<latestSale[]>(initialLatestSales);

  useEffect(() => {
    const supabase = createClient();
    const derniersVentes = supabase
      .channel('latest-sales')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'acheter' }, (_) => {
        getFreshData();
      })
      .subscribe();
    return () => {
      derniersVentes.unsubscribe();
    };
  }, []);

  const getFreshData = async () => {
    const newLatestSales = await getLatestSales();
    setLatestSales(newLatestSales);
  };

  return (
    <div>
      <h3>Dernières ventes</h3>
      <ScrollShadow
        hideScrollBar
        orientation="horizontal"
        className="flex flex-row items-center max-w-full py-2 gap-2 overflow-x-auto flex-nowrap"
      >
        {latestSales &&
          latestSales.length > 0 &&
          latestSales.map((vente: latestSale) => (
            <div
              key={`${vente.item_infos.id_item}-${vente.timestamp}-vente`}
              className="w-fit relative flex flex-row items-center justify-center p-1 px-2 gap-2 bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder rounded-md"
            >
              <div className="flex min-w-[40px] w-[40px] max-h-[40px] h-[40px] dark:bg-tempDarkHover bg-tempDarkHover/20 rounded-md relative">
                <Image
                  src={vente.item_infos.image_url}
                  alt={vente.item_infos.nom}
                  width={100}
                  height={100}
                  className=" rounded-md absolute top-0 left-0 right-0 bottom-0 w-full !h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-tiny whitespace-nowrap">{vente.item_infos.nom}</p>
                <div className="flex items-center w-fit gap-1">
                  <div className="w-4 h-4">
                    <Image src="/assets/SocialCoin.png" alt="SocialCoin" width={16} height={16} />
                  </div>
                  <p className="text-tiny whitespace-nowrap ">{vente.prix}</p>
                </div>
              </div>
            </div>
          ))}
      </ScrollShadow>
    </div>
  );
};

export default LatestSales;
