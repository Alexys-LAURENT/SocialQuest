import imageCompression from 'browser-image-compression';

export const compressImage = async (file: File, maxWidth: number): Promise<File> => {
  const options = {
    //   maxSizeMB: 1,          // Taille maximale de l'image (en MB)
    maxWidthOrHeight: maxWidth, // Largeur ou hauteur maximale de l'image
    useWebWorker: true, // Utiliser un worker web pour la compression (si disponible)
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error("Erreur lors de la compression de l'image :", error);
    return file;
  }
};
