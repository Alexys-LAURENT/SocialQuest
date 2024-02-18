import PostsWrapper from "@/components/PostsWrapper";
import { getAllPostsFromGuild } from "@/utils/getAllPosts";
import { getProfileConnected } from "@/utils/getProfileConnected";

const GuildPostsWrapper = async ({
    params
}: {
    params: { guildName: string }
}) => {
    const user = await getProfileConnected()

    const getAllPostsGuild = async () => {
        "use server"
        return await getAllPostsFromGuild(params.guildName[0])
    }

    return (
        <div>
            <PostsWrapper getPost={getAllPostsGuild} user={user} filtre={false} />
        </div>
    );
};

export default GuildPostsWrapper;