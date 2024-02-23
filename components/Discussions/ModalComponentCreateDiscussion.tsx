'use client';
import { useEffect, useState, useContext } from 'react';
import {
  Card,
  CardBody,
  Button,
  Chip,
  Input,
  Listbox,
  ListboxItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from '@nextui-org/react';
import { DiscussionTab, Profile } from '@/app/types/entities';
import { createClient } from '@/utils/supabase/client';
import { ToasterContext } from '@/app/context/ToasterContext';
import defaultUser from '@/public/assets/defaultUser.svg';
import Image from 'next/image';

const ModalComponentCreateDiscussion = ({
  isOpen,
  setOpen,
  onOpenChange,
  profileConnected,
  setDiscussions,
  refetchDiscussions,
  setSelectedDiscussion,
}: {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  onOpenChange: (open: boolean) => void;
  profileConnected: Profile;
  setDiscussions: (discussions: DiscussionTab[]) => void;
  refetchDiscussions: () => Promise<DiscussionTab[]>;
  setSelectedDiscussion: (conversation: DiscussionTab) => void;
}) => {
  const supabase = createClient();
  const [inputNomDiscussion, setInputNomDiscussion] = useState<string>('');
  const [inputSearchValue, setInputSearchValue] = useState<string>('');
  const [users, setUsers] = useState<Profile[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

  const { info: infoToaster, error: errorToaster } = useContext(ToasterContext);

  async function createDiscussion(ids: string[], nom: string) {
    if (ids.length === 2) {
      const { data: discussions1, error: error1 } = await supabase
        .from('discussions_users')
        .select('id_discussion')
        .eq('id_user', ids[0]);

      const { data: discussions2, error: error2 } = await supabase
        .from('discussions_users')
        .select('id_discussion')
        .eq('id_user', ids[1]);

      if (error1 || error2) {
        console.log(error1, error2);
        return;
      }

      const existingDiscussion = discussions1.find((discussion) =>
        discussions2.some((d2) => d2.id_discussion === discussion.id_discussion),
      );

      if (existingDiscussion) {
        setOpen(false);
        setInputNomDiscussion('');
        const selectedDiscussion = await refetchDiscussions().then((discussions: DiscussionTab[]) =>
          discussions.find(
            (discussion: DiscussionTab) => discussion.id_discussion === existingDiscussion.id_discussion,
          ),
        );
        if (selectedDiscussion) {
          setSelectedDiscussion(selectedDiscussion);
        }
        infoToaster('Une discussion existe déjà avec cet utilisateur');
        return;
      }
    }

    const group = ids.length >= 3;

    if (group && !nom) {
      errorToaster('Veuillez renseigner un nom pour la discussion de groupe');
      return;
    }

    const { data: newDiscussion, error: errorInsertDiscussion } = await supabase
      .from('discussions')
      .upsert({ is_group: group, nom: ids.length >= 3 ? nom : null })
      .select('*');

    if (errorInsertDiscussion) {
      console.log(errorInsertDiscussion);
    }

    const { error: errorInsertDiscussionUsers } = await supabase
      .from('discussions_users')
      .insert(ids.map((id) => ({ id_discussion: newDiscussion![0].id_discussion, id_user: id })));
    if (errorInsertDiscussionUsers) {
      console.log(errorInsertDiscussionUsers);
    }

    setOpen(false);
    setInputNomDiscussion('');

    async function refetchDiscussionsCreate() {
      const refresh = await refetchDiscussions();
      setDiscussions(refresh);
      setSelectedDiscussion(
        refresh.find(
          (discussion: DiscussionTab) =>
            discussion.id_discussion === (newDiscussion && newDiscussion[0]?.id_discussion),
        ) as DiscussionTab,
      );
    }
    refetchDiscussionsCreate();
  }

  const getUsers = async () => {
    const { data, error } = await supabase
      .from('follow')
      .select('profiles!follow_id_followed_fkey(*)')
      .eq('id_user', profileConnected.id_user);
    if (data) {
      setUsers(data.map((follow: any) => follow.profiles) as Profile[]);
    }
    if (error) {
      console.log(error);
    }
  };

  const getUsersByName = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .neq('id_user', profileConnected.id_user)
      .ilike('username', `%${inputSearchValue}%`);
    if (data) {
      setUsers(data);
    }
    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
    setSelectedKeys([]);
  }, [isOpen]);

  useEffect(() => {
    if (inputSearchValue === '') getUsers();
    else getUsersByName();
  }, [inputSearchValue]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        closeButton={<></>}
        className="rounded-b-none max-w-none sm:max-w-md sm:rounded-b-xl"
        classNames={{
          base: 'bg-tempsBgLightSecondary dark:bg-tempBgDark rounded-md border border-tempLightBorder dark:border-tempDarkBorder',
          wrapper: 'w-full',
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="pt-7">
                {Array.from(selectedKeys).length >= 2 && (
                  <Input
                    placeholder="Nom de la discussion"
                    value={inputNomDiscussion}
                    onChange={(e) => setInputNomDiscussion(e.target.value)}
                    classNames={{
                      inputWrapper:
                        'bg-tempsBgLightSecondary dark:bg-tempBgDark border rounded-md border-tempLightBorder dark:border-tempDarkBorder group-data-[focus=true]:bg-tempBgLightSecondary dark:group-data-[focus=true]:bg-tempBgDark',
                    }}
                  />
                )}
                <Input
                  placeholder="Rechercher un utilisateur"
                  onChange={(e) => setInputSearchValue(e.target.value)}
                  classNames={{
                    inputWrapper:
                      'bg-tempsBgLightSecondary dark:bg-tempBgDark border rounded-md border-tempLightBorder dark:border-tempDarkBorder group-data-[focus=true]:bg-tempBgLightSecondary dark:group-data-[focus=true]:bg-tempBgDark',
                  }}
                  value={inputSearchValue}
                />

                <Card>
                  <CardBody className="flex flex-row items-center gap-1 w-full flex-wrap max-h-[125px]">
                    {Array.from(selectedKeys).map((key) => users.find((user) => user.id_user === key)).length === 0 ? (
                      <Chip key={`${Math.random()}-${Math.random()}-Chip-empty`} variant="flat" className="opacity-20">
                        Aucun utilisateur selectionné
                      </Chip>
                    ) : (
                      Array.from(selectedKeys)
                        .map((key) => users.find((user) => user.id_user === key))
                        .map((user) => (
                          <Chip
                            classNames={{ avatar: 'rounded-full' }}
                            key={`Chip-${Math.random()}-${user!.id_user}`}
                            variant="flat"
                            avatar={
                              <Image src={user!.avatar_url || defaultUser.src} alt="avatar" width={50} height={50} />
                            }
                          >
                            {user!.username}
                          </Chip>
                        ))
                    )}
                  </CardBody>
                </Card>
                <Listbox
                  aria-label="Multiple selection example"
                  variant="flat"
                  disallowEmptySelection={false}
                  selectionMode="multiple"
                  items={users}
                  onSelectionChange={(keys) => setSelectedKeys(keys as unknown as React.Key[])}
                  selectedKeys={selectedKeys}
                >
                  {(item) =>
                    item && (
                      <ListboxItem key={item.id_user} textValue={item.username}>
                        <div className="flex flex-row items-center gap-3 ">
                          <Image
                            src={item.avatar_url || defaultUser.src}
                            alt="avatar"
                            width={50}
                            height={50}
                            className={`w-6 h-6 sm:w-10 sm:h-10 bg-[#3f3f46] rounded-full`}
                          />
                          <span className="text-xs sm:text-base">{item.username}</span>
                        </div>
                      </ListboxItem>
                    )
                  }
                </Listbox>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  onPress={onClose}
                  onClick={() => setSelectedKeys([])}
                  className="customButton bg-danger/70 border-danger"
                >
                  Annuler
                </Button>
                <Button
                  onClick={() =>
                    createDiscussion(
                      [...Array.from(selectedKeys), profileConnected.id_user] as string[],
                      inputNomDiscussion,
                    )
                  }
                  isDisabled={
                    Array.from(selectedKeys).map((key) => users.find((user) => user.id_user === key)).length === 0
                  }
                  className={`${Array.from(selectedKeys).map((key) => users.find((user) => user.id_user === key)).length === 0 && 'hover:select-none bg-gray-800'} customButton bg-secondary/70 border-secondary`}
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

export default ModalComponentCreateDiscussion;
