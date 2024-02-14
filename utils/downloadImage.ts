export const onDownload = (img: string) => {
    fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images_posts/${img}`)
        .then((response) => response.blob())
        .then((blob) => {
            const url = URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.download = 'image.png';
            document.body.appendChild(link);
            link.click();
            URL.revokeObjectURL(url);
            link.remove();
        });
};
