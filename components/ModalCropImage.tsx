import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from '@nextui-org/react';
import CropperComponent from './Home/Cropper';
import { useEffect, useRef, useState } from 'react';
import { compressImage } from '@/utils/compressImage';

const ModalCropImage = ({
  isOpen,
  onOpenChange,
  imageUrl,
  imageName,
  setFile,
  setImageCroppedUrl,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  imageName: string | undefined;
  imageUrl: string;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  setImageCroppedUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const [croppable, setCroppable] = useState(false);
  const cropperRef = useRef<Cropper>();
  const [loading, setLoading] = useState(false);

  function getRoundedCanvas(sourceCanvas: any) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var width = sourceCanvas.width;
    var height = sourceCanvas.height;

    canvas.width = width;
    canvas.height = height;
    if (context) {
      context.imageSmoothingEnabled = true;
      context.drawImage(sourceCanvas, 0, 0, width, height);
      context.globalCompositeOperation = 'destination-in';
      context.beginPath();
      context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
      context.fill();
    }
    return canvas;
  }

  useEffect(() => {
    return () => {
      if (cropperRef.current) {
        cropperRef.current.destroy();
      }
    };
  }, []);

  const handleCropClick = (onClose: () => void) => () => {
    if (cropperRef.current) {
      setLoading(true);
      var croppedCanvas;
      var roundedCanvas: any;

      if (!croppable) {
        return;
      }

      // Crop
      croppedCanvas = cropperRef.current.getCroppedCanvas();

      // Round
      roundedCanvas = getRoundedCanvas(croppedCanvas);

      // Convert to Blob for uploading to supabase
      roundedCanvas.toBlob((blob: any) => {
        if (blob) {
          const imageFile = new File([blob], `${imageName?.split('.')[0] || 'image'}.webp`, { type: 'image/webp' });
          compressImage(imageFile).then((res) => {
            setFile(res);
            // get image url from res
            const url = URL.createObjectURL(res);
            setImageCroppedUrl(url);
            setLoading(false);
            onClose();
          });
        }
      }, 'image/png');
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="full">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Redimensionner votre image</ModalHeader>
              <ModalBody>
                <CropperComponent imageUrl={imageUrl} setCroppable={setCroppable} cropperRef={cropperRef} />
              </ModalBody>
              <ModalFooter>
                <div className="resultImage"></div>
                <Button className="customButton bg-danger/70 border-danger" variant="light" onPress={onClose}>
                  Fermer
                </Button>
                <Button className="customButton bg-secondary/70 border-secondary" onPress={handleCropClick(onClose)}>
                  {loading ? <Spinner size="sm" className="scale-75" color="white" /> : 'Valider'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalCropImage;
