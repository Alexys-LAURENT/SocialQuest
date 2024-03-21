'use server';
import { cookies } from 'next/headers';
import { createClient } from './supabase/server';
import { EternalMission, HebdoMission } from '@/app/types/entities';

export async function getHebdoMissions() {
  'use server';
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: missions, error } = (await supabase.rpc('get_weekly_missions')) as unknown as {
    data: HebdoMission[];
    error: any;
  };

  if (error) {
    console.log(error);
    return [];
  }

  await Promise.all(
    missions.map(async (mission) => {
      const { data: current, error } = await supabase.rpc(mission.rpc_name);
      if (error) {
        console.error(error);
        return 0;
      }
      mission.current = current;
    }),
  );

  return missions as HebdoMission[];
}

export async function getEternalMissions() {
  'use server';
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: missions, error } = (await supabase.rpc('get_eternal_missions')) as unknown as {
    data: EternalMission[];
    error: any;
  };

  if (error) {
    console.log(error);
    return [];
  }

  await Promise.all(
    missions.map(async (mission) => {
      const { data: current, error } = await supabase.rpc(mission.rpc_name);
      if (error) {
        console.error(error);
        return 0;
      }
      mission.current = current;
    }),
  );

  return missions as EternalMission[];
}
