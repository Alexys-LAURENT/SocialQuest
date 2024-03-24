'use server';

import { createClient } from '@supabase/supabase-js';

export async function deleteUser(id: string) {
  'use server';
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SERVICE_ROLE_KEY!);

  const { error } = await supabase.auth.admin.deleteUser(id);

  if (error) {
    console.error('Erreur lors de la suppression:', error);
    return false;
  }

  return true;
}
