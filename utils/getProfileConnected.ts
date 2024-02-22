'use server';

import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { User } from '@supabase/supabase-js';
import { getUserConnected } from '@/utils/getUserConnected';
import { Profile } from '@/app/types/entities';
import { cache } from 'react';

export const getProfileConnected = cache(async (user?: User | null) => {
  'use server';

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  if (!user) user = await getUserConnected();

  if (user) {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*, niveaux(*))')
      .eq('id_user', user.id)
      .single();

    if (error) {
      console.log(error);
      return null;
    }

    return profile as unknown as Profile;
  }
  return null;
});
