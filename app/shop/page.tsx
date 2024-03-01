import LatestSales from '@/components/shop/LatestSales';
import MostBuyedItems from '@/components/shop/MostBuyedItems';
import ShopSection from '@/components/shop/ShopSection';
import { getItemsInSalesBySearchParams } from '@/utils/getItemsInSalesBySearchParams';
import { shopSearchParmas } from '../types/entities';
const page = async ({ searchParams }: { searchParams: shopSearchParmas }) => {
  console.log(searchParams);
  const initialShopItems = await getItemsInSalesBySearchParams(searchParams);
  console.log(initialShopItems);
  return (
    <div className={`flex flex-col max-w-[1280px] w-full px-2 md:px-4 py-4 gap-6`}>
      <div className="w-full h-28  dark:bg-tempDarkHover bg-tempDarkHover/20 rounded-md"></div>

      <MostBuyedItems />

      <LatestSales />

      <ShopSection searchParams={searchParams} />
    </div>
  );
};

export default page;
