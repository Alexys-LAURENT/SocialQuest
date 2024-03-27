'use client';
import { useContext, useEffect, useState } from 'react';
import UploadFile from '@/components/UploadFile';
import { updateAvatar } from '@/utils/updateAvatar';
import { ToasterContext } from '@/app/context/ToasterContext';
import { useRouter } from 'next/navigation';

const GuildUpdateProfilePicture = ({
  isGuildCreator,
  guilde,
}: {
  isGuildCreator: boolean;
  guilde: {
    id_guilde?: string;
    nom?: string;
    description?: string;
    avatar_url?: string;
    created_by?: string;
    usersCount?: number;
    isUserInGuilde?: boolean;
  };
}) => {
  const [file, setFile] = useState<File>();
  const { success, error } = useContext(ToasterContext);
  const router = useRouter();

  useEffect(() => {
    const uploadAvatar = async () => {
      if (file) {
        const isUpdated = await updateAvatar(
          { file },
          'guildes_avatars',
          'guildes',
          guilde.id_guilde,
          guilde.avatar_url,
        );
        if (!isUpdated) {
          return error("Une erreur est survenue lors de l'envoi des images");
        }
        router.refresh();
        success('Avatar modifiée !');
      }
    };
    uploadAvatar();
  }, [file]);

  return (
    <UploadFile
      aspect="avatar"
      canEditAvatar={isGuildCreator}
      imageSrc={guilde.avatar_url}
      width="w-20 min-w-[5rem]"
      height="h-20 min-h-[5rem]"
      text={'Edit'}
      file={file}
      setFile={setFile}
      className="sm:h-28 sm:w-28 sm:min-h-[7rem] sm:min-w-[7rem] md:h-40 md:w-40 md:min-h-[10rem] md:min-w-[10rem] rounded-full text-large transition-all"
    />
  );
};

export default GuildUpdateProfilePicture;
