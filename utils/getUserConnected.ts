'use server';

import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { cache } from 'react';

export const getUserConnected = cache(async () => {
  'use server';
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});
