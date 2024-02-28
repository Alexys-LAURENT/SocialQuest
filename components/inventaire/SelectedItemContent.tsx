import Image from 'next/image';
import { Button, ButtonGroup, Chip } from '@nextui-org/react';
import { Item } from '@/app/types/entities';
import { useRouter } from 'next/navigation';
import { toggleItemSelected } from '@/utils/toggleItemSelected';
import { useContext } from 'react';
import { ToasterContext } from '@/app/context/ToasterContext';
import { toggleFavorite } from '@/utils/toggleFavorite';
import SellItemSection from './SellItemSection';

const SelectedItemContent = ({
  selectedItem,
  setSelectedItem,
  isUserInventory,
}: {
  selectedItem: Item;
  setSelectedItem: (item: Item) => void;
  isUserInventory: boolean;
}) => {
  const router = useRouter();
  const { success, error } = useContext(ToasterContext);

  const toggleFav = async () => {
    const isUpdated = await toggleFavorite(selectedItem);
    if (isUpdated) {
      selectedItem.is_favorite ? success('Désépinglé') : success('Épinglé');
      setSelectedItem({ ...selectedItem, is_favorite: !selectedItem.is_favorite });
      router.refresh();
    } else {
      error('Erreur lors de la mise à jour des favoris');
    }
  };

  return (
    <div className="flex flex-col justify-between h-full overflow-y-auto">
      <div className="flex flex-row flex-wrap md:flex-col gap-4 p-4 w-full">
        <div className="relative flex aspect-square w-4/12 min-w-[140px] md:w-full overflow-hidden rounded-lg bg-black/20 ">
          <Image
            className="object-cover"
            src={selectedItem.items.image_url}
            fill
            alt={selectedItem.items.description}
            sizes="100%"
          />
        </div>
        <div className="w-auto md:w-full ">
          <div className="text-xl md:text-3xl font-bold text-textDark dark:text-textLight transition-all !duration-[125ms]">
            <span className="working-break-words">{selectedItem.items.nom}</span>
          </div>
          <div className="text-base md:text-medium text-textDark dark:text-textLight transition-all !duration-[125ms]">
            <span className="working-break-words">{selectedItem.items.description}</span>
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <Chip className="transition-all !duration-500">
            <span className="text-textDark dark:text-textLight  transition-all !duration-[125ms]">
              {selectedItem.items.type}
            </span>
          </Chip>
          {selectedItem.items.type === 'Arme' && (
            <Chip className="transition-all !duration-500">
              <span className="text-textDark dark:text-textLight  transition-all !duration-[125ms]">
                {selectedItem.items.damage} dégats
              </span>
            </Chip>
          )}
        </div>

        {isUserInventory && selectedItem.items.type !== 'Arme' && (
          <ButtonGroup className="w-full">
            {selectedItem.items.type !== 'Badge' && <EquiperBtn SelectedItem={selectedItem} />}
            <Button
              onClick={() => toggleFav()}
              className={`px-3 min-w-0 transition-all !duration-500 ${selectedItem.items.type === 'Badge' ? 'w-full' : ''}`}
            >
              {selectedItem.items.type === 'Badge' && (selectedItem.is_favorite ? 'Désépingler' : 'Épingler')}
              {selectedItem.is_favorite ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  className={`w-6 h-6 fill-textDark dark:fill-textLight bi bi-pin-angle-fill transition-all !duration-500`}
                  viewBox="0 0 16 16"
                >
                  <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a6 6 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707s.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a6 6 0 0 1 1.013.16l3.134-3.133a3 3 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  className={`w-6 h-6 fill-textDark dark:fill-textLight bi bi-pin-angle transition-all !duration-500`}
                  viewBox="0 0 16 16"
                >
                  <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a6 6 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707s.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a6 6 0 0 1 1.013.16l3.134-3.133a3 3 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146m.122 2.112v-.002zm0-.002v.002a.5.5 0 0 1-.122.51L6.293 6.878a.5.5 0 0 1-.511.12H5.78l-.014-.004a5 5 0 0 0-.288-.076 5 5 0 0 0-.765-.116c-.422-.028-.836.008-1.175.15l5.51 5.509c.141-.34.177-.753.149-1.175a5 5 0 0 0-.192-1.054l-.004-.013v-.001a.5.5 0 0 1 .12-.512l3.536-3.535a.5.5 0 0 1 .532-.115l.096.022c.087.017.208.034.344.034q.172.002.343-.04L9.927 2.028q-.042.172-.04.343a1.8 1.8 0 0 0 .062.46z" />
                </svg>
              )}
            </Button>
          </ButtonGroup>
        )}
      </div>

      <SellItemSection success={success} error={error} selectedItem={selectedItem} />
    </div>
  );
};

export default SelectedItemContent;

const EquiperBtn = ({ SelectedItem }: { SelectedItem: Item }) => {
  const router = useRouter();
  const { success, error } = useContext(ToasterContext);
  const handleToggleItem = async (id_item_user: string | null, action: 'equip' | 'desequip') => {
    const isUpdated = await toggleItemSelected(id_item_user, action);
    if (isUpdated) {
      action === 'equip' ? success('Item équipée') : success('Item retiré');
      SelectedItem.is_equiped = !SelectedItem.is_equiped;
      router.refresh();
    } else {
      error("Erreur lors de la mise à jour de l'item");
    }
  };

  if (SelectedItem.items.type === 'Bannière') {
    return SelectedItem.is_equiped === true ? (
      <Button
        onClick={() => handleToggleItem(SelectedItem.id_item_user, 'desequip')}
        variant="flat"
        color="danger"
        className="w-full"
      >
        Déséquiper
      </Button>
    ) : (
      <Button
        onClick={() => handleToggleItem(SelectedItem.id_item_user, 'equip')}
        variant="flat"
        className="w-full bg-secondary"
      >
        Équiper
      </Button>
    );
  }
};
