"use client";
import { Image as ImageAntd } from 'antd';

const Image = ({ src, alt }: { src: string, alt: string }) => {
    return (
        <ImageAntd
            preview={{ toolbarRender: () => (<></>), }}
            width={36}
            className="rounded-md w-full h-full"
            src={src}
            alt={alt}
        />
    );
};

export default Image;