import React from 'react';
import { ExtendedPost } from '@/app/types/entities'
import { Profile } from '@/app/types/entities'
import dynamic from 'next/dynamic'

const DynamicPost = dynamic(() => import('@/components/Post'))


const Posts = ({ userProfile, isUserProfil, posts }: { userProfile: Profile | null, isUserProfil: boolean, posts: ExtendedPost[] }) => {

    return (
        <div className="w-full max-w-2xl" >

            <div className="flex flex-col gap-6">
                {posts.length > 0 ? (
                    posts?.map((post: ExtendedPost) => (
                        <DynamicPost key={post.id_post} post={post} user={userProfile} />

                    ))
                ) : (
                    isUserProfil ? (
                        <div className="flex flex-col items-center justify-center gap-2">
                            <div className="text-2xl font-semibold">
                                Aucun post
                            </div>
                            <div className="text-font-light">
                                Vous n'avez pas encore fait de post
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-2">
                            <div className="text-2xl font-semibold">
                                Aucun post
                            </div>
                            <div className="text-font-light">
                                Cet utilisateur n'a pas encore fait de post
                            </div>
                        </div>
                    )
                )}
            </div>
        </div >
    );
};

export default Posts;