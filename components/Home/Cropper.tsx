'use client';
import { useLayoutEffect } from 'react';
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';

const CropperComponent = ({
  imageUrl,
  setCroppable,
  cropperRef,
  aspect,
}: {
  imageUrl?: string;
  setCroppable: React.Dispatch<React.SetStateAction<boolean>>;
  cropperRef: React.MutableRefObject<Cropper | undefined>;
  aspect: 'avatar' | 'banner';
}) => {
  useLayoutEffect(() => {
    const cropper = new Cropper(document.getElementById('image-to-crop') as HTMLImageElement, {
      aspectRatio: aspect === 'avatar' ? 1 / 1 : 3 / 1,
      viewMode: 2,
      guides: false,
      minCanvasHeight: 0,
      ready: function () {
        cropperRef.current = cropper;
        setCroppable(true);
        resize();
      },
      preview: '.previewCropper',
    });
  }, []);

  function resize() {
    const cropperViewBox = document.querySelector('.cropper-view-box') as HTMLElement;
    const cropperFace = document.querySelector('.cropper-face') as HTMLElement;
    if (aspect === 'avatar') {
      // set the border radius of class cropper-view-box to 100%
      cropperViewBox.style.borderRadius = '50%';
      cropperFace.style.borderRadius = '50%';
    } else {
      cropperViewBox.style.borderRadius = '0px';
      cropperFace.style.borderRadius = '0px';
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-between items-center">
      <div
        className={` ${aspect === 'avatar' ? 'aspect-square rounded-full' : 'aspect-banner'} h-[10vh] border-4 border-red overflow-hidden`}
      >
        <div
          className={`${aspect === 'avatar' ? 'aspect-square rounded-full' : 'aspect-banner'}  previewCropper `}
        ></div>
      </div>
      <div className="flex flex-col h-full items-center justify-center">
        <div className="w-full md:w-[90vw] max-h-[60vh] overflow-hidden">
          <img
            id="image-to-crop"
            src={imageUrl || 'https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg'}
            alt=""
            className="!w-full !h-full opacity-0"
          />
        </div>
      </div>
    </div>
  );
};

export default CropperComponent;
