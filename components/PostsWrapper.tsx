import { ExtendedPost, Profile } from '@/app/types/entities';
import dynamic from 'next/dynamic'

const Post = dynamic(() => import('@/components/Post'))

const PostsWrapper = async ({ user, getPost, postPage }: { user: Profile | null, getPost: any, postPage?: boolean }) => {
    const posts = await getPost()

    return (
        <div className={`w-full flex flex-col gap-4 ${postPage ? 'mt-8' : ''}`}>
            {posts?.length !== 0 ? (
                posts?.map((post: ExtendedPost) => (
                    <>
                        <Post key={post.id_post} post={post} user={user} />
                    </>
                ))
            ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="text-2xl font-semibold">
                        {postPage ? "Aucune réponse 😢" : "Aucun post 😢"}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostsWrapper;