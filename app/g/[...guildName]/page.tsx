import PostsWrapper from '@/components/PostsWrapper';
import { getPostsGuilde } from '@/utils/getPostsGuilde';
import { getProfileConnected } from '@/utils/getProfileConnected';

const GuildPostsWrapper = async ({ params }: { params: { guildName: string } }) => {
  const user = await getProfileConnected();
  const postsInit = await getPostsGuilde(decodeURIComponent(params.guildName[0]), 0, 10);

  return (
    <div>
      <PostsWrapper
        key={postsInit?.postsGuilde.length}
        user={user}
        filtre={false}
        displayAnswerTo={true}
        page={'guilde'}
        postsInit={postsInit}
        guildeName={params.guildName[0]}
      />
    </div>
  );
};

export default GuildPostsWrapper;
