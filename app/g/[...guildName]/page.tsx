import PostsWrapper from "@/components/Home/PostsWrapper";
import { getAllPostsFromGuild } from "@/utils/getAllPosts";
import { getProfileConnected } from "@/utils/getProfileConnected";

const GuildPostsWrapper = async ({
    params
}: {
    params: { guildName: string }
}) => {
    const user = await getProfileConnected()
    const posts = await getAllPostsFromGuild(params.guildName[0])

    return (
        <div>
            <PostsWrapper posts={posts} user={user} />
        </div>
    );
};

export default GuildPostsWrapper;