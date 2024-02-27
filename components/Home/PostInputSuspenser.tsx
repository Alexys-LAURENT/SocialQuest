import { getGuildesUserPostInput } from '@/utils/getGuildesUserPostInput';
import PostInput from '@/components/PostInput';

const PostInputSuspenser = async () => {
    const guildesUser = await getGuildesUserPostInput()

    return (
        <div>
            <PostInput page="index" guildesUser={guildesUser} />
        </div>
    );
};

export default PostInputSuspenser;