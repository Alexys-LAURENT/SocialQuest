'use client';
import { Profile } from '@/app/types/entities';
import { Button } from '@nextui-org/react';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import { useContext, useEffect, useState } from 'react';
import { ToasterContext } from '@/app/context/ToasterContext';
import { useRouter } from 'next/navigation';
import { toggleFollow } from '@/utils/toggleFollow';
import UploadFile from '@/components/UploadFile';
import { updateAvatar } from '@/utils/updateAvatar';

const UserTopRow = ({
  isUserProfil,
  pageProfile,
  profileConnected,
}: {
  isUserProfil: boolean;
  pageProfile: Profile;
  profileConnected: Profile | null;
}) => {
  const { success, error } = useContext(ToasterContext);
  const [file, setFile] = useState<File>();
  const router = useRouter();

  const handleFollow = async () => {
    if (!profileConnected?.id_user) return router.push('/login');
    const isDone = await toggleFollow(pageProfile?.id_user, pageProfile?.isFollowed!, profileConnected?.id_user);
    if (isDone) {
      pageProfile.isFollowed === true
        ? success('Vous ne suivez plus cet utilisateur')
        : success('Vous suivez désormais cet utilisateur');
      router.refresh();
    } else {
      error('Une erreur est survenue');
    }
  };

  useEffect(() => {
    const uploadProfilePicture = async () => {
      if (file) {
        const isUpdated = await updateAvatar({ file }, 'avatars', 'profiles');
        if (!isUpdated) {
          return error("Une erreur est survenue lors de l'envoi des images");
        }
        router.refresh();
        success('Photo de profil modifiée !');
      }
    };
    uploadProfilePicture();
  }, [file]);

  return (
    <>
      <div className="relative -top-[40px] sm:-top-[60px] md:-top-[80px] w-full max-w-[1280px] flex items-end px-6 md:px-12">
        <UploadFile
          aspect="avatar"
          canEditAvatar={isUserProfil}
          imageSrc={pageProfile.avatar_url}
          width="w-20 min-w-[5rem]"
          height="h-20 min-h-[5rem]"
          text={'Edit'}
          file={file}
          setFile={setFile}
          className="sm:h-28 sm:w-28 sm:min-h-[7rem] sm:min-w-[7rem] md:h-40 md:w-40 md:min-h-[10rem] md:min-w-[10rem] rounded-full text-large transition-all"
        />

        <div className="flex justify-between items-center h-unit-10 mb-1 sm:mb-0 ms-2 sm:ms-4  md:mb-7 w-full">
          <div className="sm:max-w-[80%]">
            <p className=" w-full overflow-hidden text-ellipsis line-clamp-1 text-lg md:text-2xl font-semibold text-textDark dark:text-textLight transition-all !duration-[125ms]">
              {pageProfile?.username}
            </p>
          </div>
          {pageProfile.id_user !== profileConnected?.id_user && (
            <span className="sm:flex items-center hidden gap-4">
              <Button className="bg-bgLight customButton">
                <ChatBubbleOvalLeftEllipsisIcon className="text-bgDarkPopover h-[20px]" />
              </Button>

              <Button onClick={() => handleFollow()} className="bg-secondary customButton text-textLight">
                {pageProfile.isFollowed ? 'Abonné' : 'Suivre'}
              </Button>
            </span>
          )}
        </div>
      </div>
      {pageProfile.id_user !== profileConnected?.id_user && (
        <div className=" w-full max-w-[1280px] px-6 md:px-12 flex flex-row justify-end my-4 sm:my-2 gap-2 sm:gap-4 sm:hidden -top-[40px] sm:-top-[60px] md:-top-[80px] relative">
          <Button onClick={() => handleFollow()} className="bg-secondary customButton text-textLight !w-full">
            {pageProfile.isFollowed ? 'Abonné' : 'Suivre'}
          </Button>

          <Button className="bg-bgLight customButton !min-w-0">
            <ChatBubbleOvalLeftEllipsisIcon className="text-bgDarkPopover h-[20px]" />
          </Button>
        </div>
      )}
    </>
  );
};

export default UserTopRow;
