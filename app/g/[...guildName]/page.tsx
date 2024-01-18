import PostsWrapper from "@/components/Home/PostsWrapper";
import { getAllPostsFromGuild } from "@/utils/getAllPosts";
import { getProfileConnected } from "@/utils/getProfileConnected";

const GuildPostsWrapper = async ({
    params
}: {
    params: { guildName: string }
}) => {
    const user = await getProfileConnected()

    return (
        <div>
            <PostsWrapper getPost={() => getAllPostsFromGuild(params.guildName[0])} user={user} />
        </div>
    );
};

export default GuildPostsWrapper;