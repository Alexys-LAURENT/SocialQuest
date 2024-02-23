import PostsWrapper from '@/components/PostsWrapper';
import { getAllPostsFromGuild } from '@/utils/getAllPosts';
import { getProfileConnected } from '@/utils/getProfileConnected';
import { createClient } from '@supabase/supabase-js';

export const revalidate = 3600;

export async function generateStaticParams() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const results = (await supabase.from('guildes').select('nom')) as unknown as { data: any[] };
  const guildNames = results?.data;

  return guildNames?.map(({ nom }) => ({
    nom,
  }));
}

const GuildPostsWrapper = async ({ params }: { params: { guildName: string } }) => {
  const user = await getProfileConnected();

  const getAllPostsGuild = async () => {
    'use server';
    return await getAllPostsFromGuild(params.guildName[0]);
  };

  return (
    <div>
      <PostsWrapper getPost={getAllPostsGuild} user={user} filtre={false} />
    </div>
  );
};

export default GuildPostsWrapper;
