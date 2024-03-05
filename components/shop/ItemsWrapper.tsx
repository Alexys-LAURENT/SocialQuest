import { itemShop } from '@/app/types/entities';
import ShopItem from './ShopItem';

const ItemsWrapper = ({ initialShopItems }: { initialShopItems: itemShop[] }) => {
  return (
    <div
      className={`flex w-full ${initialShopItems.length === 0 ? 'min-h-[339px]' : ''} overflow-hidden gap-2 p-4 flex-wrap `}
    >
      {initialShopItems &&
        initialShopItems.length > 0 &&
        initialShopItems.map((item) => (
          <ShopItem item={item} key={`${item.item_infos.id_item}-${item.timestamp}-${item.seller_infos.id_user}`} />
        ))}
      {initialShopItems.length === 0 && (
        <div className="min-h-full w-full flex justify-center items-center ">
          <p className="">Aucun item trouvé...</p>
        </div>
      )}
    </div>
  );
};

export default ItemsWrapper;
