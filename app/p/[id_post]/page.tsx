import { getPost } from '@/utils/getPost';
import { getAnswers } from '@/utils/getAnswers';
import MainPost from '@/components/Post/MainPost';
import { getProfileConnected } from '@/utils/getProfileConnected';
import { ExtendedPost } from '@/app/types/entities';
import { notFound } from 'next/navigation';
import PostsWrapper from '@/components/PostsWrapper';
import PostInput from '@/components/PostInput';
import { createClient } from '@supabase/supabase-js';

export const revalidate = 3600;

export async function generateStaticParams() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const results = (await supabase.from('posts').select('id_post')) as unknown as { data: any[] };
  const ids_posts = results?.data;

  return ids_posts?.map(({ id_post }) => ({
    id_post,
  }));
}

const page = async ({ params }: { params: { id_post: string } }) => {
  const userProfile = await getProfileConnected();
  const post = (await getPost(params.id_post)) as ExtendedPost;
  const getPostAnswers = async () => {
    'use server';
    return await getAnswers(params.id_post);
  };

  if (post === undefined) {
    notFound();
  }

  return (
    <div className="h-full w-full flex flex-col overflow-y-auto overflow-x-hidden items-center">
      <div className="flex w-full max-w-[1280px]">
        <div className="min-w-[0.5rem] sm:min-w-[5rem] md:min-w-[9rem] lg:min-w-[17rem] flex" />

        <div className="flex flex-col w-full gap-4 mb-5">
          <MainPost post={post} user={userProfile} />
          <PostInput id_guilde={undefined} page="post" guildesUser={null} parent={post.id_post} />

          <PostsWrapper
            user={userProfile}
            getPost={getPostAnswers}
            postPage={true}
            filtre={false}
          />
        </div>

        <div className="min-w-[0.5rem] sm:min-w-[5rem] md:min-w-[9rem] lg:min-w-[17rem] flex" />
      </div>
    </div>
  );
};

export default page;
