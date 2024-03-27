'use client';
import { Item } from '@/app/types/entities';
import { Chip, Tab, Tabs } from '@nextui-org/react';
import Image from 'next/image';
import { useContext } from 'react';
import { InventaireContext } from '@/app/context/InventaireContext';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

type AllInventory = null | {
  all: Item[];
  equiped: Item[];
  banners: Item[];
  badges: Item[];
  items: Item[];
};

const TabsFiltre = ({ inventory, filterParam, newitemsParam }: { inventory: AllInventory; filterParam: string; newitemsParam: string }) => {
  const { selectedItem, setSelectedItem } = useContext(InventaireContext);


  const tabsList = [
    {
      title: 'Tout',
      key: 'Tout',
      data: inventory?.all,
    },
    {
      title: 'Équipés',
      key: 'Équipés',
      data: inventory?.equiped,
    },
    {
      title: 'Bannières',
      key: 'Bannières',
      data: inventory?.banners,
    },
    {
      title: 'Badges',
      key: 'Badges',
      data: inventory?.badges,
    },
    {
      title: 'Items',
      key: 'Items',
      data: inventory?.items,
    },
  ];

  return (
    <div className={` ${selectedItem ? 'hidden md:flex' : ''} flex w-full h-full gap-6 flex-col  transition-all`}>
      <Tabs
        className={`${selectedItem ? 'hidden md:flex' : ''}`}
        aria-label="Options"
        items={tabsList}
        classNames={{
          panel: 'p-0',
          tab: 'text-xs lg:text-sm',
          tabList:
            'bg-tempLightBorder dark:bg-tempDarkBorder transition-all !duration-500 text-textDark dark:text-textLight gap-1 lg:gap-2',
          cursor: 'transition-colors !duration-500',
        }}
        onSelectionChange={() => setSelectedItem(null)}
        defaultSelectedKey={filterParam ? filterParam : 'Tout'}
      >
        {(item) => (
          <Tab className={`${selectedItem ? 'hidden md:flex flex-col' : ''}`} key={item.key} title={item.title}>
            {item.data!.length > 0 ? (
              <div className="p-1 w-full grid itemsWrapper justify-start gap-3 overflow-y-auto transition-all duration-500 ease-in-out">
                {item.data?.map((unItem: Item) => {
                  return (
                    <div
                      key={`TabsFiltre-${unItem.items.id_item}-${Math.random()}`}
                      className={`cursor-pointer relative aspect-square overflow-hidden rounded-lg ${selectedItem && selectedItem.items && selectedItem.id_item_user === unItem.id_item_user ? '!outline !outline-2 !outline-secondary' : '!outline !outline-1 !outline-default-200'}`}
                      onClick={() => {
                        selectedItem?.id_item_user === unItem.id_item_user
                          ? setSelectedItem(null)
                          : setSelectedItem(unItem);
                      }}
                    >
                      {unItem.is_favorite && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          className="absolute top-1 right-1 z-50 w-4 h-4 lg:w-[1.15rem] lg:h-[1.15rem] fill-white bi bi-pin-angle-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a6 6 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707s.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a6 6 0 0 1 1.013.16l3.134-3.133a3 3 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146" />
                        </svg>
                      )}

                      {unItem.is_equiped && (
                        <CheckCircleIcon className="absolute top-1 left-1 z-50 w-4 h-4 lg:w-[1.2rem] lg:h-[1.2rem] fill-secondary" />
                      )}

                      {newitemsParam && newitemsParam.includes(unItem.id_item.toString()) &&
                        <Chip color="danger" classNames={{ content: 'p-0' }} className="px-1 h-fit text-[10px] absolute top-[0.15rem] left-6 lg:left-8 z-50">New !</Chip>
                      }

                      <div className="absolute rounded-full bg-gray-400/60  font-semibold bottom-1 right-1 w-5 h-5 z-50 flex justify-center items-center text-tiny">
                        {unItem.count}
                      </div>

                      <Image
                        src={unItem.items.image_url}
                        alt={unItem.items.nom}
                        width={200}
                        height={200}
                        className="absolute top-0 left-0 right-0 bottom-0 w-full !h-full object-cover drop-shadow-xl"
                        loading="lazy"
                      />
                    </div>
                  );
                }
                )}
              </div>
            ) : (
              <div className="flex items-center w-full h-full text-textDark dark:text-textLight">
                Aucun item
              </div>
            )}
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default TabsFiltre;
