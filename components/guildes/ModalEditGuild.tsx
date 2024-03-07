import React, { useContext, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Tabs,
  Card,
  Tab,
  CardBody,
  Chip,
  Accordion,
  AccordionItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react';
import { Textarea } from '@nextui-org/react';
import { GuildePage, Member } from '@/app/types/entities';
import Image from 'next/image';
import { EllipsisVerticalIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { updateGuildDescription } from '@/utils/updateGuildDescription';

const ModalEditGuild = ({
  isOpen,
  onOpenChange,
  guilde,
  moderators,
  members,
  handleRemoveUserFromGuild,
  handleToggleModStatus,
  handleValidateEditGuild,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  guilde: GuildePage;
  moderators: Member[][] | undefined;
  members: Member[][] | undefined;
  handleRemoveUserFromGuild: (id_user: string) => void;
  handleToggleModStatus: (id_user: string, toggle: 'mod' | 'unmod') => void;
  handleValidateEditGuild: (onClose: () => void, new_description: string) => void;
}) => {
  const [newDescription, setNewDescription] = useState(guilde.description);

  // Fonction pour obtenir le titre du groupe
  function getGroupTitle(username: string): string {
    const firstCharacter = username.charAt(0).toUpperCase();
    return /^[A-Za-z]$/.test(firstCharacter) ? firstCharacter : 'Autre';
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="full"
        scrollBehavior="inside"
        classNames={{
          base: 'bg-tempBgLightSecondary dark:bg-tempBgDark rounded-md border border-tempLightBorder dark:border-tempDarkBorder',
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modifier . {guilde.nom}</ModalHeader>
              <ModalBody>
                <Tabs aria-label="Options">
                  <Tab key="Description" title="Description">
                    <Card>
                      <CardBody>
                        <Textarea
                          classNames={{ inputWrapper: 'bg-transparent' }}
                          defaultValue={guilde.description}
                          onChange={(e) => setNewDescription(e.target.value)}
                          value={newDescription}
                          placeholder="Description de la guilde"
                        />
                      </CardBody>
                    </Card>
                  </Tab>
                  <Tab key="Membres" title="Membres">
                    {members?.length === 0 && <h3>Il n'y a pas de membres dans la guilde.</h3>}
                    {members && members.length > 0 && (
                      <Accordion defaultExpandedKeys={[`group-${getGroupTitle(members[0][0].username)}`]}>
                        {members && members.length > 0 ? (
                          members.map((group: Member[]) => (
                            <AccordionItem
                              key={'group-' + getGroupTitle(group[0].username)}
                              title={getGroupTitle(group[0].username)}
                              aria-label="test"
                            >
                              <div className="flex gap-2 flex-wrap mt-2">
                                {group.map((membre: Member) => (
                                  <Chip
                                    className={`${membre.is_moderator ? 'border border-secondary' : ''}`}
                                    avatar={
                                      <Image src={membre.avatar_url} alt={membre.username} width={100} height={100} />
                                    }
                                    endContent={
                                      <Popover placement="right">
                                        <PopoverTrigger className="cursor-pointer">
                                          <EllipsisVerticalIcon className="h-6 w-6" />
                                        </PopoverTrigger>
                                        <PopoverContent className=" rounded-md p-1">
                                          <div className="w-full flex flex-col">
                                            {membre.is_moderator ? (
                                              <div
                                                className="w-full hover:bg-white/5 cursor-pointer p-1 rounded-md"
                                                onClick={() => handleToggleModStatus(membre.id_user, 'unmod')}
                                              >
                                                Rétirer modérateur
                                              </div>
                                            ) : (
                                              <div
                                                className="w-full hover:bg-white/5 cursor-pointer p-1 rounded-md"
                                                onClick={() => handleToggleModStatus(membre.id_user, 'mod')}
                                              >
                                                Passer modérateur
                                              </div>
                                            )}
                                            <div
                                              className="w-full hover:bg-white/5 cursor-pointer p-1 rounded-md text-danger"
                                              onClick={() => handleRemoveUserFromGuild(membre.id_user)}
                                            >
                                              Supprimer de la guilde
                                            </div>
                                          </div>
                                        </PopoverContent>
                                      </Popover>
                                    }
                                  >
                                    {membre.username}
                                  </Chip>
                                ))}
                              </div>
                            </AccordionItem>
                          ))
                        ) : (
                          <div className="">IMPOSSIBLE</div>
                        )}
                      </Accordion>
                    )}
                  </Tab>
                  <Tab key="Modérateurs" title="Modérateurs">
                    {moderators?.length === 0 && <h3>Il n'y a pas de modérateur dans la guilde.</h3>}
                    {moderators && moderators.length > 0 && (
                      <Accordion defaultExpandedKeys={[`group-${getGroupTitle(moderators[0][0].username)}`]}>
                        {moderators && moderators.length > 0 ? (
                          moderators.map((group: Member[]) => (
                            <AccordionItem
                              key={'group-' + getGroupTitle(group[0].username)}
                              title={getGroupTitle(group[0].username)}
                              aria-label="test"
                            >
                              <div className="flex gap-2 flex-wrap mt-2">
                                {group.map((moderator: Member) => (
                                  <Chip
                                    className={`${moderator.is_moderator ? 'border border-secondary' : ''}`}
                                    avatar={
                                      <Image
                                        src={moderator.avatar_url}
                                        alt={moderator.username}
                                        width={100}
                                        height={100}
                                      />
                                    }
                                    endContent={
                                      <Popover placement="right">
                                        <PopoverTrigger className="cursor-pointer">
                                          <EllipsisVerticalIcon className="h-6 w-6" />
                                        </PopoverTrigger>
                                        <PopoverContent className=" rounded-md p-1">
                                          <div className="w-full flex flex-col">
                                            <div
                                              className="w-full hover:bg-white/5 cursor-pointer p-1 rounded-md"
                                              onClick={() => handleToggleModStatus(moderator.id_user, 'unmod')}
                                            >
                                              Rétirer modérateur
                                            </div>
                                            <div
                                              className="w-full hover:bg-white/5 cursor-pointer p-1 rounded-md text-danger"
                                              onClick={() => handleRemoveUserFromGuild(moderator.id_user)}
                                            >
                                              Supprimer de la guilde
                                            </div>
                                          </div>
                                        </PopoverContent>
                                      </Popover>
                                    }
                                  >
                                    {moderator.username}
                                  </Chip>
                                ))}
                              </div>
                            </AccordionItem>
                          ))
                        ) : (
                          <div className="">IMPOSSIBLE</div>
                        )}
                      </Accordion>
                    )}
                  </Tab>
                </Tabs>
              </ModalBody>
              <ModalFooter>
                <Button className="customButton" variant="light" onPress={onClose}>
                  Fermer
                </Button>
                <Button
                  className={`customButton ${newDescription === guilde.description || newDescription === '' ? 'bg-secondary/30 border-secondary/50 text-opacity-20' : 'bg-secondary/70 border-secondary'} text-white`}
                  onPress={() => {
                    if (newDescription === guilde.description || newDescription === '') return;
                    handleValidateEditGuild(onClose, newDescription);
                  }}
                  disabled={newDescription === guilde.description || newDescription === ''}
                >
                  Valider
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalEditGuild;
