import { getGuildesUser } from '@/utils/getGuildesUser';
import PostInput from '@/components/PostInput';

const PostInputSuspenser = async () => {
    const guildesUser = await getGuildesUser()

    return (
        <div>
            <PostInput page="index" guildesUser={guildesUser} />
        </div>
    );
};

export default PostInputSuspenser;