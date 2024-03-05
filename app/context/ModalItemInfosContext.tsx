'use client';
import dynamic from 'next/dynamic';
import { Button, Chip, useDisclosure } from '@nextui-org/react';
import { createContext, useContext, useRef, useState } from 'react';
import { itemShop } from '../types/entities';
import Image from 'next/image';
import Link from 'next/link';
import { buyItem } from '@/utils/buyItem';
import { ToasterContext } from '@/app/context/ToasterContext';
import { useRouter } from 'next/navigation';

export const ModalItemInfoContext = createContext({
  openModalForItem: (_item: itemShop) => {},
});

const DynamicModal = dynamic(() => import('@nextui-org/react').then((mod) => mod.Modal));
const DynamicModalContent = dynamic(() => import('@nextui-org/react').then((mod) => mod.ModalContent));
const DynamicModalBody = dynamic(() => import('@nextui-org/react').then((mod) => mod.ModalBody));
const DynamicModalFooter = dynamic(() => import('@nextui-org/react').then((mod) => mod.ModalFooter));

export default function ModalItemInfoProvider({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { success, error } = useContext(ToasterContext);
  const [item, setItem] = useState<itemShop | null>(null);
  const refUserLink = useRef<HTMLAnchorElement | null>(null);
  const openModalForItem = (item: itemShop) => {
    setItem(item);
    onOpen();
  };
  const router = useRouter();

  const handleClickChip = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, onClose: () => void) => {
    e.preventDefault();
    if (refUserLink.current) {
      refUserLink.current.click();
      onClose();
    }
  };

  const handleBuyItem = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, onClose: () => void) => {
    if (!item) return;
    const res = await buyItem(item);
    if (res.status) {
      success(res.message);
      onClose();
      router.refresh();
    } else {
      error(res.message);
    }
  };

  return (
    <ModalItemInfoContext.Provider value={{ openModalForItem }}>
      {children}
      {isOpen && item && (
        <DynamicModal
          classNames={{
            base: 'bg-tempBgLightSecondary dark:bg-tempBgDark rounded-md border border-tempLightBorder dark:border-tempDarkBorder',
          }}
          closeButton={<></>}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size="2xl"
        >
          <DynamicModalContent>
            {(onClose) => (
              <>
                <DynamicModalBody className="md:mt-10">
                  <div className="flex flex-col md:flex-row w-full gap-2">
                    <div className="w-full md:w-5/12">
                      <div className="w-full max-w-[150px] md:max-w-none mx-auto aspect-square relative rounded-md">
                        <Image
                          src={item!.item_infos.image_url}
                          alt={item!.item_infos.nom}
                          width={400}
                          height={400}
                          className="rounded-md absolute top-0 left-0 right-0 bottom-0 w-full !h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full md:w-7/12">
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl md:text-2xl font-semibold">{item!.item_infos.nom} </h2>
                        <Chip size="sm">Rare</Chip>
                      </div>
                      <p>{item!.item_infos.description}</p>

                      <div className="flex items-center gap-2 ">
                        <p>Vendu par : </p>
                        <Chip
                          onClick={(e) => handleClickChip(e, onClose)}
                          className="relative cursor-pointer"
                          avatar={
                            <Image
                              src={item!.seller_infos.avatar_url}
                              alt={item!.seller_infos.username}
                              width={100}
                              height={100}
                            />
                          }
                        >
                          <p>{item!.seller_infos.username}</p>
                        </Chip>
                        <Link href={`/${item!.seller_infos.username}`} className="hidden" ref={refUserLink}></Link>
                      </div>

                      <span className="dark:opacity-30 opacity-60 text-tiny">{item!.timestampFormatted}</span>
                    </div>
                  </div>
                </DynamicModalBody>
                <DynamicModalFooter>
                  <Button className="customButton bg-tempLightBorder dark:bg-tempDarkBorder" onPress={onClose}>
                    Fermer
                  </Button>
                  <Button
                    className="customButton bg-secondary/70 border-secondary text-white dark:text-black"
                    onClick={(e) => handleBuyItem(e, onClose)}
                  >
                    Acheter
                  </Button>
                </DynamicModalFooter>
              </>
            )}
          </DynamicModalContent>
        </DynamicModal>
      )}
    </ModalItemInfoContext.Provider>
  );
}
