'use client';
import { PlusIcon } from '@heroicons/react/24/outline';
import React, { ChangeEvent, useContext, useState } from 'react';
import { ToasterContext } from '@/app/context/ToasterContext';
import { useDisclosure } from '@nextui-org/react';
import ModalCropImage from './ModalCropImage';
import Image from 'next/image';

const UploadFile = ({
  file,
  setFile,
  width = 'w-24',
  height = 'h-24',
}: {
  file: File | undefined;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  width?: string;
  height?: string;
}) => {
  const FileUploadRef = React.useRef<HTMLInputElement>(null);
  const { error } = useContext(ToasterContext);
  const [imageUrl, setImageUrl] = useState<string>();
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
        console.error(e);
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
        />
      )}

      <>
        <input type="file" className="hidden" name="" id="" ref={FileUploadRef} onChange={handleFileChange} />
        <div
          onClick={() => FileUploadRef.current?.click()}
          className={`${width} ${height} relative p-2 flex flex-col justify-center items-center gap-1 bg-tempLightHover dark:bg-tempDarkHover rounded-full border border-dashed cursor-pointer border-white hover:border-secondary`}
        >
          {imageCroppedUrl && (
            <Image
              alt="Avatar"
              src={imageCroppedUrl}
              className={`absolute top-0 left-0 right-0 bottom-0 w-full !h-full object-cover`}
              width={50}
              height={50}
            />
          )}
          <PlusIcon className="w-5 h-5 mx-auto " />
          <span className="text-[10px] text-center break-words dark:text-tempLightHover/50 text-tempDarkHover/50">
            Ajouter une image
          </span>
        </div>
      </>
    </>
  );
};

export default UploadFile;
