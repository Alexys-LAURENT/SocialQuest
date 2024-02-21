import { getProfileConnected } from './getProfileConnected';
import { createClient } from './supabase/client';
import { uploadFiles } from './uploadFiles';

export async function updateAvatar(file: { file: File | undefined }, bucket: string, type: 'profiles' | 'guildes', id_guilde?: string, guilde_avatar_url?: string) {
  const supabase = createClient();
  const user = await getProfileConnected();

  if (!file) {
    return;
  }

  const { error } = await supabase
    .storage
    .from(bucket)
    .remove([guilde_avatar_url?.split('/').pop()! || user?.avatar_url?.split('/').pop()!]);

  if (error) {
    console.error(error);
    return false
  }

  const filePath = await uploadFiles([file], bucket);

  if (!filePath) {
    console.error('Error while uploading file');
    return false;
  }

  const { error: errorUpdate } = await supabase
    .from(type)
    .update({ avatar_url: filePath[0] })
    .eq(type === 'profiles' ? 'id_user' : 'id_guilde', id_guilde || user?.id_user);

  if (errorUpdate) {
    console.error(errorUpdate);
    return false;
  }

  return true;

}

