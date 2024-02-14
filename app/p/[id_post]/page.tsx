import { getPost } from '@/utils/getPost';
import { getAnswers } from '@/utils/getAnswers';
import MainPost from '@/components/Post/MainPost';
import { getProfileConnected } from '@/utils/getProfileConnected';
import { ExtendedPost } from '@/app/types/entities';
import { notFound } from 'next/navigation';
import PostsWrapper from '@/components/PostsWrapper';
import PostInput from '@/components/PostInput';

const page = async ({ params }: { params: { id_post: string } }) => {

    const userProfile = await getProfileConnected()
    const post = await getPost(params.id_post) as ExtendedPost;
    const answers = await getAnswers(params.id_post);

    if (post === null) {
        notFound()
    }

    return (
        <div className="h-full w-full flex flex-col overflow-y-auto overflow-x-hidden items-center">

            <div className="flex w-full max-w-[1280px]">
                <div className="min-w-[0.5rem] sm:min-w-[5rem] md:min-w-[9rem] lg:min-w-[17rem] flex" />

                <div className="flex flex-col w-full gap-4 mb-5">
                    <MainPost post={post} user={userProfile} />
                    <PostInput id_guilde={undefined} page="post" guildesUser={null} parent={post.id_post} />
                    <PostsWrapper user={userProfile} getPost={() => answers} postPage={true} />
                </div>

                <div className="min-w-[0.5rem] sm:min-w-[5rem] md:min-w-[9rem] lg:min-w-[17rem] flex" />
            </div>

        </div>
    );
};

export default page;