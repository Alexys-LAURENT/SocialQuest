import React from 'react';
import { getPost } from '@/utils/getPost';
import { getAnswers } from '@/utils/getAnswers';
import Post from '@/components/Post';
import { getProfileConnected } from '@/utils/getProfileConnected';
import { ExtendedPost } from '@/app/types/entities';
import { notFound } from 'next/navigation';
import PostsWrapper from '@/components/Home/PostsWrapper';

const page = async ({ params }: { params: { id_post: string } }) => {

    const userProfile = await getProfileConnected()
    const post = await getPost(params.id_post) as ExtendedPost;
    const answers = await getAnswers(params.id_post);

    if (post === null) {
        notFound()
    }

    return (
        <div className="h-full w-full flex flex-col overflow-y-auto overflow-x-hidden items-center">

            <div className="flex w-full h-full max-w-[1280px]">
                <div className="min-w-[5rem] md:min-w-[9rem] lg:min-w-[17rem] hidden sm:flex" />

                <div className="flex flex-col w-full">
                    <Post post={post} user={userProfile} />
                    <PostsWrapper user={userProfile} getPost={() => answers} />
                </div>

                <div className="min-w-[5rem] md:min-w-[9rem] lg:min-w-[17rem] hidden sm:flex" />
            </div>

        </div>
    );
};

export default page;