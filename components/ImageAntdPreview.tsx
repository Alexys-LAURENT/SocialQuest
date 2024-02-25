"use client"
import { ArrowDownTrayIcon } from '@heroicons/react/20/solid';
import { EyeIcon } from '@heroicons/react/24/outline';
import { Image as ImageAntd } from 'antd';
import ImageNext from 'next/image';
import { useRef } from 'react';

const ImageAntdPreview = ({ img, onDownload }: { img: string; onDownload: (img: string) => void }) => {


  function getTranslateY(transform: string) {
    const match = transform.match(/translate3d\(\s*[^,]+\s*,\s*([^,]+)\s*,\s*[^,]+\s*\)/i);
    return match ? parseFloat(match[1]) : 0;
  }

  function getTranslateX(transform: string) {
    const match = transform.match(/translate3d\(\s*([^,]+)\s*,\s*[^,]+\s*,\s*[^,]+\s*\)/i);
    return match ? parseFloat(match[1]) : 0;
  }

  function getScale(transform: string) {
    const match = transform.match(/scale3d\(\s*([^,]+)\s*,\s*[^,]+\s*,\s*[^,]+\s*\)/i);
    return match ? parseFloat(match[1]) : 1;
  }

  const translateYRef = useRef(0);
  const translateXRef = useRef(0);

  const handleClickImage = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Check if the device is a touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    if (!isTouchDevice) {
      return;
    }

    const threshold = window.innerHeight * 0.2; // 20% of the window height

    const handlePointerUp = () => {
      if (Math.abs(translateYRef.current) > threshold) {
        const closeButton = document.querySelector('.ant-image-preview-close') as HTMLButtonElement;
        if (closeButton) {
          closeButton.click();
        }
      }
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          if (mutation.target instanceof HTMLElement) {
            translateYRef.current = getTranslateY(mutation.target.style.transform);
            translateXRef.current = getTranslateX(mutation.target.style.transform);
            const scale = getScale(mutation.target.style.transform);

            // Calculate the opacity and scale based on the translateY value and the scale
            const factor = 2; // Increase this to make the effect slower
            const opacity = Math.max(0, 1 - Math.abs(translateYRef.current / factor) / threshold / scale);
            mutation.target.style.opacity = `${opacity}`;

          }
        }
      });
    });

    const clickedImageSrc = (event.target as HTMLImageElement).src;

    setTimeout(() => {
      const images = document.querySelectorAll('.ant-image-preview-img') as NodeListOf<HTMLImageElement>;
      const image = Array.from(images).find((img) => img.src === clickedImageSrc);
      if (image) {
        observer.observe(image, { attributes: true });
        image.addEventListener('pointerdown', () => (translateYRef.current = 0));
        image.addEventListener('pointerup', handlePointerUp);
      }
    }, 0);
  };

  return (
    <ImageAntd
      onClick={handleClickImage}
      src={img}
      alt={img}
      loading="lazy"
      className="absolute top-0 left-0 right-0 bottom-0 w-full !h-full object-cover"
      rootClassName="!h-full !w-full"
      preview={{
        mask: (
          <div className='items-center justify-center gap-2 text-white flex'>
            <EyeIcon className="w-4 h-4 mt-[0.1rem]" />
            <p>Voir</p>
          </div>
        ),
        toolbarRender: (_, { }) => (
          <ArrowDownTrayIcon
            onClick={() => onDownload(img)}
            className="w-10 h-10 rounded-lg text-white cursor-pointer bg-white/30 p-3"
          />
        ),
      }}
      placeholder={
        <ImageNext
          src={img}
          alt={img}
          width={50}
          height={50}
          className="absolute top-0 left-0 right-0 bottom-0 w-full !h-full object-cover blur-[5px]"
        />
      }
    />
  )
};

export default ImageAntdPreview;
