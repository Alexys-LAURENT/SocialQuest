'use client';
import { ModalGuildsWarsContext } from '@/app/context/ModalGuildsWarsContext';
import { Item } from '@/app/types/entities';
import { getParticipationsUsers } from '@/utils/getParticipationsUsers';
import { getUsableGuildWarItems } from '@/utils/getUsableGuildWarItems';
import { participationGuildWar } from '@/utils/participationGuildWar';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Chip, Divider, Modal, ModalBody, ModalContent, Popover, PopoverContent, PopoverTrigger, Spinner, Tab, Tabs } from '@nextui-org/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
useRouter
const GuildWarInfos = ({ user, guilde }: { user: any; guilde: any }) => {
  const { guildWar } = useContext(ModalGuildsWarsContext);
  const [isOpen, setIsOpen] = useState(false);
  const [participationsUser, setParticipationsUser] = useState<any>(null);
  const [itemsAvailableUser, setItemsAvailableUser] = useState<any>(null);
  const [itemsSelectedNewParticipation, setItemsSelectedNewParticipation] = useState<any>([]);

  const router = useRouter();

  if (!guildWar) return null;

  const guildWarGains = [guildWar.item_1, guildWar.item_2, guildWar.item_3, guildWar.item_4, guildWar.item_5].filter(
    (item) => item !== null,
  );

  const getParticipations = async () => {
    const participations = await getParticipationsUsers(guildWar!.id_guild_war);
    setParticipationsUser(participations);

  };

  const getItems = async () => {
    const usableItems = await getUsableGuildWarItems();

    // Remove duplicates and add count property to each item
    const uniqueItems = usableItems?.reduce((acc, curr) => {
      const existingItem = acc.find((item: any) => item.items.id === curr.items.id);
      if (existingItem) {
        existingItem.count++;
      } else {
        acc.push({ ...curr, count: 1 });
      }
      return acc;
    }, []);

    setItemsAvailableUser(uniqueItems);
  }


  user && useEffect(() => {
    getParticipations();
    getItems();
  }, [guildWar]);


  const handleSelectItem = (item: Item) => {
    itemsSelectedNewParticipation.push(item);
    setIsOpen(false);
  };

  const handleParticiper = async () => {
    await participationGuildWar(guilde.id_guilde, guildWar.id_guild_war, itemsSelectedNewParticipation);
    await getParticipations();
    setItemsSelectedNewParticipation([]);
    router.refresh();
  }

  return (
    <div className="flex flex-col items-center">
      <div className="h-4/6 flex items-end mb-2 justify-around pt-2 px-10 w-full ">
        <div className="flex flex-col gap-2 items-center justify-center">
          <Image
            src={guildWar.guild_who_asked_infos.avatar_url}
            className="w-20 h-20 rounded-full"
            alt="guild logo"
            width={50}
            height={50}
          />
          <p>{guildWar.guild_who_asked_infos.nom}</p>
        </div>
        <h2 className="text-2xl">VS</h2>
        <div className="flex flex-col gap-2 items-center justify-center">
          <Image
            src={guildWar.guild_who_received_infos.avatar_url}
            className="w-20 h-20 rounded-full"
            alt="guild logo"
            width={50}
            height={50}
          />

          <p>{guildWar.guild_who_received_infos.nom}</p>
        </div>
      </div>
      <Divider className='my-10' />
      <Tabs aria-label='Options' defaultSelectedKey={guildWar.status === 'En attente' || !user ? 'recompenses' : 'participation'}>
        {guildWar.status !== 'En attente' && user && (
          <Tab key="participation" title="Participation" className='w-full'>
            <div className="w-full justify-center items-center flex flex-col gap-4">
              {participationsUser ? (
                <>
                  {participationsUser.length > 0 && participationsUser[0].items.filter((item: any) => item !== null).length > 0 ? (
                    <>
                      <div className="text-center gap-1">
                        Vous avez participé à cette guerre de guilde pour
                        <span className="font-bold">
                          {
                            " " + (guildWar.participationsGuildWhoAsk.find(participation => participation.id_user === user.id)
                              ? guildWar.guild_who_asked_infos.nom
                              : guildWar.participationsGuildWhoReceived.find(participation => participation.id_user === user.id)
                                ? guildWar.guild_who_received_infos.nom
                                : guilde.nom)
                            + " "
                          }
                        </span>
                        avec les items suivants :
                      </div>
                      <div className="flex flex-wrap w-full justify-between">
                        {participationsUser[0].items.filter((item: any) => item !== null).map((item: any, index: number) => (
                          <div key={`CardParticipationGuildWarsDone${guildWar.id_guild_war}-${index}`} className="relative cursor-pointer aspect-square rounded-md overflow-hidden w-16 h-16 sm:w-20 sm:h-20 border border-dashed">
                            <Popover key={`CardParticipationGuildWars${guildWar.id_guild_war}-${index}`} >
                              <PopoverTrigger>
                                <div className="relative aspect-square rounded-md overflow-hidden w-16 h-16 sm:w-20 sm:h-20 border border-dashed">
                                  <Image
                                    className="absolute top-0 left-0 right-0 bottom-0 w-full !h-full object-cover"
                                    src={item?.image_url}
                                    alt="Item"
                                    width={100}
                                    height={100}
                                  />
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className='min-w-[125px] gap-2 p-2 bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder rounded-md'>
                                <Chip>{item?.rarete}</Chip>
                                <p>{item?.nom}</p>
                                <p>{item?.damage} dégats</p>
                              </PopoverContent>
                            </Popover>
                            {/* <Image
                              className="absolute top-0 left-0 right-0 bottom-0 w-full !h-full object-cover"
                              src={item?.image_url}
                              alt="Item"
                              width={100}
                              height={100}
                            /> */}
                          </div>
                        ))}
                        {participationsUser && participationsUser[0].items.filter((item: any) => item !== null).length < 5 && [...Array(5 - participationsUser[0].items.filter((item: any) => item !== null).length)].map((_, index) => (
                          <div key={`CardParticipationGuildWarsDoneEmpty${guildWar.id_guild_war}-${index}`} className="relative aspect-square rounded-md transition-all w-16 h-16 sm:w-20 sm:h-20 border border-dashed">
                            <XMarkIcon className="absolute top-3 left-3 sm:top-5 sm:left-5 w-10 h-10" />
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="flex w-full flex-col gap-4">
                      <div className="text-center flex flex-col">
                        Vous n'avez pas encore participé à cette guerre de guilde !
                        <span className="text-xs text-red-500">Attention, vous ne pourrez participer qu'une seule fois et pour une seule des deux guildes.</span>
                      </div>
                      <div className="flex flex-wrap w-full justify-between">
                        {
                          itemsSelectedNewParticipation.length > 0 && itemsSelectedNewParticipation.map((i: any) => (
                            <div
                              key={`CardParticipationGuildWars${guildWar.id_guild_war}-${itemsSelectedNewParticipation.indexOf(i)}-${Math.random()}`}
                              className="group relative cursor-pointer aspect-square rounded-md overflow-hidden hover:opacity-70 transition-all w-16 h-16 sm:w-20 sm:h-20 border border-dashed items-center justify-center"
                              onClick={() => {
                                const indexToRemove = itemsSelectedNewParticipation.findIndex((selectedItem: any) => selectedItem === i);
                                if (indexToRemove !== -1) {
                                  const updatedSelection = [...itemsSelectedNewParticipation];
                                  updatedSelection.splice(indexToRemove, 1);
                                  setItemsSelectedNewParticipation(updatedSelection);
                                }
                              }}
                            >
                              <Image
                                className="absolute top-0 left-0 right-0 bottom-0 w-full !h-full object-cover"
                                src={i.items.image_url}
                                alt="Item"
                                width={100}
                                height={100}
                              />
                              <XMarkIcon className="absolute opacity-0 group-hover:opacity-100 transition-all !duration-150 top-3 left-3 sm:top-5 sm:left-5 w-10 h-10" />
                            </div>
                          ))}
                        {itemsSelectedNewParticipation.length < 5 && [...Array(5 - itemsSelectedNewParticipation.length)].map((_, index) => (
                          <div key={`CardParticipationGuildWarsEmpty${guildWar.id_guild_war}-${index}`} className="flex cursor-pointer aspect-square rounded-md overflow-hidden hover:opacity-70 transition-all w-16 h-16 sm:w-20 sm:h-20 border border-dashed items-center justify-center" onClick={() => setIsOpen(true)}>
                            {
                              itemsSelectedNewParticipation.includes(index) ?
                                <Image
                                  src={"https://example.com/image.jpg"}
                                  alt="Banniere"
                                  width={100}
                                  height={100}
                                /> :
                                <PlusIcon className="w-8 h-8" />
                            }
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <Button className={`customButton bg-secondary/70 border-secondary`} onClick={() => handleParticiper()} isDisabled={itemsSelectedNewParticipation.length < 1}>
                    Participer
                  </Button>
                </>
              ) : (
                <div className="flex items-center justify-center h-[11rem]">
                  <Spinner size='lg' color='white' />
                </div>
              )}
            </div>
          </Tab>
        )}
        <Tab key="recompenses" title="Récompenses" className='w-full'>
          <div className="flex flex-wrap gap-2 items-center justify-center">
            {guildWarGains
              .sort((a, b) => {
                const rarityOrder = ['Légendaire', 'Épic', 'Rare', 'Commun'];
                return rarityOrder.indexOf(a!.rarete) - rarityOrder.indexOf(b!.rarete);
              })
              .map((item, i) => (
                <Popover key={`CardRewardsGuildWars${guildWar.id_guild_war}-${i}`}>
                  <PopoverTrigger>
                    <div key={`CardRewardsGuildWars${guildWar.id_guild_war}-${i}`} className={`relative cursor-pointer aspect-square ${document.getElementsByTagName('html')[0].classList.contains('dark') ? 'rotating-border-dark' : 'rotating-border-light'} rotating-border--${item?.rarete} rounded-md hover:opacity-70 transition-all w-20 h-20`}>
                      <Image className="absolute top-0 left-0 right-0 bottom-0 w-full !h-full object-cover" src={item!.image_url} alt="Banniere" width={100} height={100} />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className='min-w-[125px] gap-2 p-2 bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder rounded-md'>
                    <Chip>{item!.rarete}</Chip>
                    <p>{item!.nom}</p>
                  </PopoverContent>
                </Popover>
              ))}
          </div>
        </Tab>
      </Tabs>

      <Modal
        classNames={{
          base: 'm-0 border-b-none sm:border-md bg-tempBgLightSecondary dark:bg-tempBgDark rounded-md border border-tempLightBorder dark:border-tempDarkBorder',
        }}
        closeButton={<></>}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        size="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <ModalBody className="md:mt-10">
              {itemsAvailableUser ? (
                <div className="flex flex-col gap-4">
                  <p className="text-center text-xl font-bold">Sélectionner un item :</p>
                  <div className="flex gap-4">
                    {itemsAvailableUser.map((item: any) => (
                      <div
                        className={`relative flex flex-col transition-all justify-center items-center gap-2 border p-2 rounded-md ${itemsSelectedNewParticipation.filter((selectedItem: any) => selectedItem.items.id === item.items.id).length >= item.count
                          ? 'cursor-not-allowed opacity-70'
                          : 'cursor-pointer hover:opacity-70'
                          }`}
                        onClick={() => {
                          if (itemsSelectedNewParticipation.filter((selectedItem: any) => selectedItem.items.id === item.items.id).length < item.count) {
                            handleSelectItem(item);
                          }
                        }}
                      >
                        <div key={`CardParticipationGuildWars${guildWar.id_guild_war}`} className="relative aspect-square rounded-md overflow-hidden min-w-[5rem] min-h-[5rem]">
                          <Image
                            className="absolute top-0 left-0 right-0 bottom-0 w-full !h-full object-cover"
                            src={item.items.image_url}
                            alt="Item"
                            width={100}
                            height={100}
                          />
                        </div>
                        <Chip className="text-white text-center">{item.items.nom}</Chip>
                        <p className="text-white text-center">{item.items.damage} dégats</p>
                        <div className="absolute w-5 h-5 top-3 right-3 bg-default-400 rounded-full flex items-center justify-center">
                          <p className="text-white">{item.count - itemsSelectedNewParticipation.filter((i: any) => i.items.id === item.items.id).length}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <p>Chargement...</p>
                </div>
              )}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </div >
  );
};

export default GuildWarInfos;