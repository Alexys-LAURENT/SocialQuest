import React from 'react';
import TopRowShopSection from '@/components/shop/TopRowShopSection';
import FilterSection from '@/components/shop/FilterSection';
import ItemsWrapper from '@/components/shop/ItemsWrapper';
import { shopSearchParmas } from '@/app/types/entities';

const ShopSection = ({ searchParams }: { searchParams: shopSearchParmas }) => {
  return (
    <div className="flex flex-col sm:flex-row w-full h-auto gap-2">
      <FilterSection searchParams={searchParams} />
      <div className="rounded-md bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder w-full h-fit flex flex-col">
        <TopRowShopSection searchParams={searchParams} />
        <ItemsWrapper />
      </div>
    </div>
  );
};

export default ShopSection;
