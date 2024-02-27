'use server';
import { getProfileConnected } from '@/utils/getProfileConnected';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { cache } from 'react';

export const getGuildesUser = cache(async (offset: number) => {
  'use server';

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const user = await getProfileConnected();

  const { data: guildesUser, error: guildesUserError } = await supabase
    .from('guildes_users')
    .select('guildes(*)')
    .eq('id_user', user?.id_user)
    .range(offset, offset + 4)
    .limit(4)

  const { data: isLastPage, error: isLastPageError } = await supabase
    .from('guildes_users')
    .select('guildes(*)')
    .eq('id_user', user?.id_user)
    .range(offset + 4, offset + 5)
    .limit(1)

  if (isLastPageError) {
    console.log('ErrorGetGuildesUser', isLastPageError);
    return null;
  }

  if (guildesUserError) {
    console.log('ErrorGetGuildesUser', guildesUserError);
    return null;
  }

  return {
    guildesUser: guildesUser.map((guildeUser: any) => guildeUser.guildes),
    isLastPage: isLastPage.length === 0
  };

});