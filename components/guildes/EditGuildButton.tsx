'use client';
import { Button, useDisclosure } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import { GuildePage, Member } from '../../app/types/entities';
import { useContext, useEffect, useState } from 'react';
import { getSortedItems } from '@/utils/getSortedModerators';
import { getGuildMembers } from '@/utils/getGuildMembers';
import { ToasterContext } from '@/app/context/ToasterContext';
import { toggleModeratorStatus } from '@/utils/toggleModeratorStatus';
import { removeUserFromGuild } from '@/utils/removeUserFromGuild';
import { updateGuildDescription } from '@/utils/updateGuildDescription';
import { useRouter } from 'next/navigation';

const DynamicModalEditGuild = dynamic(() => import('@/components/guildes/ModalEditGuild'));

const EditGuildButton = ({ guilde, role }: { guilde: GuildePage, role: string }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [members, setMembers] = useState<Member[][] | undefined>();
  const [moderators, setModerators] = useState<Member[][] | undefined>();
  const { success, error } = useContext(ToasterContext);
  const router = useRouter();

  useEffect(() => {
    const getMembers = async () => {
      const members = await getGuildMembers(guilde.id_guilde);
      if (members) {
        setMembers(getSortedItems(members));
      } else {
        setMembers([]);
      }
    };
    getMembers();
  }, [guilde.id_guilde]);

  useEffect(() => {
    if (!members) {
      setModerators([]);
      return;
    }
    // Appliquez votre logique existante pour filtrer les modérateurs
    const temp = members.map((group) => group.filter((member) => member.is_moderator));
    // Filtrer les groupes vides
    const filteredModerators = temp.filter((group) => group.length > 0);
    setModerators(filteredModerators);
  }, [members]);

  const handleToggleModStatus = async (id_user: string, toggle: 'mod' | 'unmod') => {
    const isToggled = await toggleModeratorStatus(guilde.id_guilde, id_user, toggle);
    if (isToggled) {
      success('Rôle mis à jour');
      // set is_moderator to false
      setMembers((prev) => {
        if (prev) {
          return prev.map((group) =>
            group.map((member) =>
              member.id_user === id_user ? { ...member, is_moderator: !member.is_moderator } : member,
            ),
          );
        }
      });
    } else {
      error('Erreur lors de la mise à jour du rôle');
    }
  };

  const handleRemoveUserFromGuild = async (id_user: string) => {
    const is_removed = await removeUserFromGuild(guilde.id_guilde, id_user);
    if (is_removed) {
      success('Membre retiré de la guilde');
      const temp = members!.map((group) => group.filter((member) => member.id_user !== id_user));
      // Filtrer les groupes vides
      const filteredMembers = temp.filter((group) => group.length > 0);
      setMembers(filteredMembers);
    } else {
      error('Erreur lors du retrait du membre');
    }
  };

  const handleValidateEditGuild = async (onClose: () => void, new_description: string) => {
    const is_updtated = await updateGuildDescription(guilde.id_guilde, new_description);
    if (is_updtated) {
      success('Description mise à jour');
      // Appliquez votre logique existante pour mettre à jour la guilde
      onClose();
      router.refresh();
    } else {
      error('Erreur lors de la mise à jour de la description');
    }
  };

  return (
    <>
      <Button onPress={onOpen} className="customButton bg-secondary/70 border-secondary text-white">
        {role === 'creator' ? 'Éditer la guilde' : 'Modérer la guilde'}
      </Button>
      {isOpen && (
        <DynamicModalEditGuild
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          guilde={guilde}
          moderators={moderators}
          members={members}
          handleRemoveUserFromGuild={handleRemoveUserFromGuild}
          handleToggleModStatus={handleToggleModStatus}
          handleValidateEditGuild={handleValidateEditGuild}
          role={role}
        />
      )}
    </>
  );
};

export default EditGuildButton;
