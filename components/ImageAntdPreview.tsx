import { ArrowDownTrayIcon } from '@heroicons/react/20/solid';
import { Image as ImageAntd } from 'antd';
import Image from 'next/image';
import { useRef } from 'react';

const ImageAntdPreview = ({ img, onDownload }: { img: string, onDownload: (img: string) => void }) => {

    function getTranslateY(transform: string) {
        const match = transform.match(/translate3d\(\s*[^,]+\s*,\s*([^,]+)\s*,\s*[^,]+\s*\)/i);
        return match ? parseFloat(match[1]) : 0;
    }

    const translateYRef = useRef(0);

    const handleClickImage = (event: any) => {
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
                    }
                }
            });
        });

        const clickedImageSrc = (event.target as HTMLImageElement).src;

        setTimeout(() => {
            const images = document.querySelectorAll('.ant-image-preview-img') as NodeListOf<HTMLImageElement>;
            const image = Array.from(images).find(img => img.src === clickedImageSrc);
            if (image) {
                observer.observe(image, { attributes: true });
                image.addEventListener('pointerdown', () => translateYRef.current = 0);
                image.addEventListener('pointerup', handlePointerUp);
            }
        }, 0);
    };


    return (
        <ImageAntd
            onClick={handleClickImage}
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images_posts/${img}`}
            alt={img}
            loading='lazy'
            className='absolute top-0 left-0 right-0 bottom-0 w-full !h-full object-cover'
            rootClassName='!h-full !w-full'
            preview={{
                toolbarRender: (
                    _,
                    {
                    },
                ) => (
                    <ArrowDownTrayIcon onClick={() => onDownload(img)} className="w-10 h-10 rounded-lg text-white cursor-pointer bg-white/30 p-3" />
                )
            }}
            placeholder={
                <Image
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images_posts/${img}`}
                    alt={img}
                    width={150}
                    height={150}
                    className='absolute top-0 left-0 right-0 bottom-0 w-full !h-full object-cover blur'
                />
            }
        />
    );
};

export default ImageAntdPreview;