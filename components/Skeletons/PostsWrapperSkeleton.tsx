import PostSkeleton from '@/components/Skeletons/PostSkeleton';

const PostsWrapperSkeleton = () => {



    return (
        <div className="w-full flex flex-col gap-4 mb-4">
            {
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((item: number) => (
                    <PostSkeleton key={`postWrapperSkeleton-${item}`} />
                ))
            }
        </div>
    );
};

export default PostsWrapperSkeleton;