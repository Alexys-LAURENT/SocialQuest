import { createClient } from '@/utils/supabase/client';

export async function uploadFiles(files: { file: File | undefined }[], bucket: string) {
  const supabase = createClient();
  var FILES_PATH = [] as string[];

  if (!files) {
    return [];
  }

  await Promise.all(
    files.map(async (image) => {
      const fileExt = image.file!.name.split('.').pop();
      const fileName = image
        .file!.name.split('.')
        .slice(0, -1)
        .join('.')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      const newFileName = `${fileName}.${Math.random()}.${fileExt}`;
      const filePath = `${newFileName}`;

      const { data, error } = await supabase.storage.from(bucket).upload(filePath, image.file!);

      if (data?.path) {
        FILES_PATH.push(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${data?.path}`);
      }

      if (error) {
        await Promise.all(
          FILES_PATH.map(async (path) => {
            const { error } = await supabase.storage.from(bucket).remove([path]);
            if (error) {
              console.error('ErrorUploadFiles', error);
            }
          }),
        );

        console.error('ErrorUploadFiles', error);
        return false;
      }
    }),
  );
  return FILES_PATH;
}
