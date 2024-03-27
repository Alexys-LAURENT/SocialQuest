'use client';
import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline';
import { ChangeEvent, useContext, useRef, useState } from 'react';
import { ToasterContext } from '@/app/context/ToasterContext';
import { useDisclosure } from '@nextui-org/react';
import ModalCropImage from '@/components/ModalCropImage';
import Image from 'next/image';

const UploadFile = ({
  canEditAvatar,
  imageSrc,
  text,
  file,
  setFile,
  width = 'w-24',
  height = 'h-24',
  className,
  aspect,
}: {
  canEditAvatar?: boolean;
  imageSrc?: string;
  text: string;
  file: File | undefined;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  width?: string;
  height?: string;
  className?: string;
  aspect: 'avatar' | 'banner';
}) => {
  const FileUploadRef = useRef<HTMLInputElement>(null);
  const { error } = useContext(ToasterContext);
  // imageUrl = image loaded by the user
  const [imageUrl, setImageUrl] = useState<string>();
  // imageCroppedUrl = image returned by the crop function
  const [imageCroppedUrl, setImageCroppedUrl] = useState<string>();
  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      const imageType = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/webp'];

      if (!imageType.includes(file.type)) {
        // empty the input
        event.target.value = '';
        return error("Le fichier n'est pas une image");
      }

      if (file.size > 5242881) {
        // empty the input
        event.target.value = '';
        return error('Le fichier est trop lourd, veuillez choisir une image de maximum 5Mo');
      }

      reader.onload = (e) => {
        if (e.target) {
          // Lecture terminée
          const imageDataUrl = e.target.result as string;
          //   setImageData(imageDataUrl);
          setImageUrl(imageDataUrl);
          onOpen();
        }
      };

      reader.onerror = (e) => {
        error('Erreur lors de la lecture du fichier');
        console.error('Error reading the file', e);
      };

      reader.readAsDataURL(file); // Lecture du fichier en tant que Data URL

      // empty the input
      event.target.value = '';
    }
  };

  return (
    <>
      {imageUrl && (
        <ModalCropImage
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          imageUrl={imageUrl}
          imageName={file?.name}
          setFile={setFile}
          setImageCroppedUrl={setImageCroppedUrl}
          aspect={aspect}
        />
      )}

      {canEditAvatar === undefined || canEditAvatar ? (
        <>
          <input type="file" className="hidden" name="" id="" ref={FileUploadRef} onChange={handleFileChange} />
          <div
            onClick={() => FileUploadRef.current?.click()}
            className={`${width} ${height} ${className} group relative p-2 flex flex-col justify-center items-center gap-1 bg-tempBgLightSecondary dark:bg-tempBgDark ${aspect === 'avatar' ? 'rounded-full' : 'w-[200px] md:w-[300px]'} ${canEditAvatar ? 'hover:!outline-dashed hover:!outline-[0.2px]' : 'border border-dashed'} cursor-pointer border-white/80 hover:border-secondary`}
          >
            {(imageCroppedUrl || imageSrc) && (
              <Image
                alt="Avatar"
                src={imageCroppedUrl || imageSrc || ''}
                className={`absolute top-0 left-0 right-0 bottom-0 w-full !h-full object-cover ${aspect === 'avatar' ? 'rounded-full' : ''} group-hover:!opacity-70 transition-all`}
                width={100}
                height={100}
              />
            )}

            {(canEditAvatar || (!file && !imageCroppedUrl)) && (
              <div
                className={`flex flex-col gap-1 z-10 transition-all ${canEditAvatar ? 'opacity-0 group-hover:opacity-100' : ''}`}
              >
                {canEditAvatar ? <PencilIcon className="w-5 h-5 mx-auto" /> : <PlusIcon className="w-5 h-5 mx-auto" />}
                <span
                  className={`${canEditAvatar ? 'text-tempDarkHover dark:text-tempLightHover text-tiny' : 'dark:text-tempLightHover/50 text-tempDarkHover/50 text-[10px]'} text-center break-words`}
                >
                  {text}
                </span>
              </div>
            )}
          </div>
        </>
      ) : (
        <div
          className={`${width} ${height} ${className} relative p-2 flex flex-col justify-center items-center gap-1 bg-tempBgLightSecondary dark:bg-tempBgDark rounded-full`}
        >
          <Image
            alt="Avatar"
            src={imageCroppedUrl || imageSrc || ''}
            className={`absolute top-0 left-0 right-0 bottom-0 w-full !h-full object-cover rounded-full`}
            width={100}
            height={100}
          />
        </div>
      )}
    </>
  );
};

export default UploadFile;
