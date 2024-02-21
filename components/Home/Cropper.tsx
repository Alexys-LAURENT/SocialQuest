'use client';
import { useLayoutEffect } from 'react';
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';

const CropperComponent = ({
  imageUrl,
  setCroppable,
  cropperRef,
}: {
  imageUrl?: string;
  setCroppable: React.Dispatch<React.SetStateAction<boolean>>;
  cropperRef: React.MutableRefObject<Cropper | undefined>;
}) => {
  useLayoutEffect(() => {
    const cropper = new Cropper(document.getElementById('image-test') as HTMLImageElement, {
      aspectRatio: 1 / 1,
      viewMode: 2,
      guides: false,
      minCanvasHeight: 0,
      ready: function () {
        cropperRef.current = cropper;
        setCroppable(true);
      },
      preview: '.previewCropper',
    });
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between items-center">
      <div className=" aspect-square h-[10vh] rounded-full border-4 border-red overflow-hidden">
        <div className="aspect-square h-full previewCropper "></div>
      </div>
      <div className="flex flex-col h-full md:max-h-[60vh] items-center justify-center">
        <div className="w-full md:w-[90vw] md:max-h-[60vh] overflow-hidden">
          <img
            id="image-test"
            src={imageUrl || 'https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg'}
            alt=""
            className="!w-full !h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default CropperComponent;
