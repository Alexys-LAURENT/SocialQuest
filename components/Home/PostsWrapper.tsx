import React from 'react';
import Post from '@/components/Post';
import { ExtendedPost, Profile } from '@/app/types/entities';


const PostsWrapper = ({ posts, user }: { posts: ExtendedPost[], user: Profile }) => {
    return (
        <div className="w-full flex flex-col gap-4 mb-4">
            {posts?.length !== 0 ? (
                posts?.map((post: ExtendedPost) => (
                    <Post key={post.id_post} post={post} user={user} />
                ))
            ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="text-2xl font-semibold">
                        Aucun post 😢
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostsWrapper;