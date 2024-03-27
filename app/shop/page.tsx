import LatestSales from '@/components/shop/LatestSales';
import MostBuyedItems from '@/components/shop/MostBuyedItems';
import ShopSection from '@/components/shop/ShopSection';
import { getItemsInSalesBySearchParams } from '@/utils/getItemsInSalesBySearchParams';
import { shopSearchParmas } from '../types/entities';
import { getLatestSales } from '@/utils/getLatestSales';
import { getBestSellingItems } from '@/utils/getBestSellingItems';
const page = async ({ searchParams }: { searchParams: shopSearchParmas }) => {
  const initialShopItems = await getItemsInSalesBySearchParams(searchParams);
  const initialLatestSales = await getLatestSales();
  const bestSellingItems = await getBestSellingItems();

  return (
    <div className={`flex flex-col max-w-[1280px] w-full px-2 md:px-4 py-4 gap-6`}>
      {/* <div className="w-full h-28  dark:bg-tempDarkHover bg-tempDarkHover/20 rounded-md"></div> */}

      <MostBuyedItems bestSellingItems={bestSellingItems} />

      <LatestSales initialLatestSales={initialLatestSales} />

      <ShopSection searchParams={searchParams} initialShopItems={initialShopItems} />
    </div>
  );
};

export default page;
