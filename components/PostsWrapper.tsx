'use client';
import { ExtendedPost, Profile } from '@/app/types/entities';
import { Tabs, Tab, Spinner } from '@nextui-org/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import PostsWrapperSkeleton from '@/components/Skeletons/PostsWrapperSkeleton';
import { getPostSuivis } from '@/utils/getPostSuivis';
import { getPostGuildes } from '@/utils/getPostGuildes';
import Post from '@/components/Post';
import { debounce } from 'lodash';
import { getPostsHome } from '@/utils/getInitPostsHome';

const PostsWrapper = ({
  postsInit,
  user,
  getPost,
  postPage,
  filtre,
  displayAnswerTo,
}: {
  postsInit?: ExtendedPost[] | null;
  user: Profile | null;
  getPost: () => Promise<ExtendedPost[] | null>,
  postPage?: boolean;
  filtre: boolean;
  displayAnswerTo?: boolean;
}) => {
  const [posts, setPosts] = useState<ExtendedPost[] | null>(postsInit || null);
  const [postsRandom, setPostsRandom] = useState<ExtendedPost[] | null>(null);
  const [postsSuivis, setPostsSuivis] = useState<ExtendedPost[] | null>(null);
  const [postsGuildes, setPostsGuildes] = useState<ExtendedPost[] | null>(null);
  const [lastScrollDirection, setLastScrollDirection] = useState<'up' | 'down'>('down');
  const [isSticky, setIsSticky] = useState(false);
  const [selectedKey, setSelectedKey] = useState('MaPage');
  const [offset, setOffset] = useState(10)
  const limit = 5;
  const [isInView, setIsInView] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [isLastsPosts, setIsLastsPosts] = useState(false)

  const containerRef = useRef(null)
  const prevScrollY = useRef(0);

  const handleScroll = () => {
    if (containerRef.current && typeof window !== 'undefined') {
      const container = containerRef.current as HTMLElement; // Add type assertion
      const { bottom } = container.getBoundingClientRect();
      const { innerHeight } = window;
      setIsInView((prev) => bottom - 1000 <= innerHeight);
    }
  }

  useEffect(() => {
    if (isInView) {
      setIsFetching(true)
      setOffset((prev) => prev + limit)
      getPostsHome(offset, limit).then((data) => {
        if (data?.length === 0) {
          setIsLastsPosts(true)
        } else {
          setPosts((prev) => [...(prev || []), ...data || []])
        }
        setIsFetching(false)
      })
    }
  }, [isInView])

  useEffect(() => {
    const mainDiv = document.getElementsByTagName('main')[0];
    const handleDebouncedScroll = debounce(() => handleScroll(), 0)
    mainDiv.addEventListener('scroll', handleDebouncedScroll)
    return () => {
      mainDiv.removeEventListener('scroll', handleDebouncedScroll)
    }
  }, [])

  useEffect(() => {
    if (postsInit) {
      setPosts(postsInit);
    } else {
      const fetchPosts = async () => {
        setPostsRandom(await getPost());
      };
      fetchPosts();
    }
  }, []);

  useEffect(() => {
    if (postsRandom && selectedKey === 'MaPage') {
      setPosts(postsRandom);
    }
  }, [postsRandom, selectedKey]);

  useEffect(() => {
    if (postsSuivis && selectedKey === 'Suivis') {
      setPosts(postsSuivis);
    }
  }, [postsSuivis, selectedKey]);

  useEffect(() => {
    if (postsGuildes && selectedKey === 'Guildes') {
      setPosts(postsGuildes);
    }
  }, [postsGuildes, selectedKey]);

  if (user && filtre === true) {
    useEffect(() => {
      const mainDiv = document.getElementsByTagName('main')[0];
      let lastDirectionChangeScrollY = 0;

      const handleScroll = () => {
        const currentScrollY = mainDiv.scrollTop;

        // Set the sticky status to true when the scroll threshold is reached
        if (currentScrollY > 350) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }

        if (Math.abs(lastDirectionChangeScrollY - currentScrollY) > 20) {
          if (lastDirectionChangeScrollY < currentScrollY) {
            setLastScrollDirection('down');
          } else if (lastDirectionChangeScrollY > currentScrollY) {
            setLastScrollDirection('up');
          }
          lastDirectionChangeScrollY = currentScrollY;
        }

        prevScrollY.current = currentScrollY;
      };

      mainDiv.addEventListener('scroll', handleScroll);

      return () => {
        mainDiv.removeEventListener('scroll', handleScroll);
      };
    }, []);

    useEffect(() => {
      const fetchPostsSuivis = async () => {
        setPostsSuivis(await getPostSuivis(user.id_user));
      };
      fetchPostsSuivis();
    }, []);

    useEffect(() => {
      const fetchPostsGuildes = async () => {
        setPostsGuildes(await getPostGuildes(user.id_user));
      };
      fetchPostsGuildes();
    }, []);
  }

  const loadPosts = async (id_user: string, key: string) => {
    if (key === selectedKey && key === 'MaPage') {
      document.getElementById('RefreshIconMaPage')?.classList.remove('hidden');
      setPostsRandom(await getPost());
      document.getElementById('RefreshIconMaPage')?.classList.add('hidden');
    }
    if (key === selectedKey && key === 'Suivis') {
      document.getElementById('RefreshIconSuivis')?.classList.remove('hidden');
      setPostsSuivis(await getPostSuivis(id_user));
      document.getElementById('RefreshIconSuivis')?.classList.add('hidden');
    }
    if (key === selectedKey && key === 'Guildes') {
      document.getElementById('RefreshIconGuildes')?.classList.remove('hidden');
      setPostsGuildes(await getPostGuildes(id_user));
      document.getElementById('RefreshIconGuildes')?.classList.add('hidden');
    }

    setSelectedKey(key);
  };

  if (posts === null) {
    return <PostsWrapperSkeleton postPage={postPage} />;
  }

  if (posts && filtre === false) {
    return (
      <div className={`w-full flex flex-col gap-4 ${postPage ? 'mt-8' : ''}`}>
        {posts?.length !== 0 ? (
          posts?.map((post: ExtendedPost) => (
            <Fragment key={`post-${post.id_post}`}>
              <Post key={post.id_post} post={post} user={user} displayAnswerTo={displayAnswerTo} />
            </Fragment>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="text-2xl font-semibold">{postPage ? 'Aucune réponse 😢' : 'Aucun post 😢'}</div>
          </div>
        )}
      </div>
    );
  }

  if (posts && filtre && user) {
    return (
      <div ref={containerRef} className={`${postPage ? 'mt-8' : ''} `}>
        <Tabs
          aria-label="Filtres"
          defaultSelectedKey={'MaPage'}
          onSelectionChange={(key: React.Key) => loadPosts(user.id_user, key.toString())}
          disableAnimation={isSticky}
          classNames={{
            base: `z-10 flex justify-center sticky transition-all !duration-250 ${lastScrollDirection === 'down' ? '-top-12' : 'top-1'}`,
            tabList: 'bg-tempLightBorder dark:bg-tempDarkBorder transition-all !duration-500 text-textDark dark:text-textLight',
            cursor: 'transition-colors !duration-500',
          }}
          selectedKey={selectedKey}
        >
          <Tab
            key="MaPage"
            title={
              selectedKey === 'MaPage' ? (
                <div className="flex items-center gap-2">
                  <span>Ma Page</span>
                  <Spinner id="RefreshIconMaPage" size="sm" className="scale-75 hidden" classNames={{ circle1: 'border-b-textDark dark:border-b-textLight', circle2: 'border-b-textDark dark:border-b-textLight' }} />
                </div>
              ) : (
                'Ma Page'
              )
            }
          >
            <div className="w-full flex flex-col gap-4">
              {posts?.length !== 0 ? (
                posts?.map((post: ExtendedPost) => (
                  <Fragment key={`post-${post.id_post}`}>
                    <Post key={post.id_post} post={post} user={user} displayAnswerTo={displayAnswerTo} />
                  </Fragment>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="text-2xl font-semibold">{postPage ? 'Aucune réponse 😢' : 'Aucun post 😢'}</div>
                </div>
              )}
            </div>
          </Tab>
          <Tab
            key="Suivis"
            title={
              selectedKey === 'Suivis' ? (
                <div className="flex items-center gap-2">
                  <span>Suivis</span>
                  <Spinner id="RefreshIconSuivis" size="sm" className="scale-75 hidden" classNames={{ circle1: 'border-b-textDark dark:border-b-textLight', circle2: 'border-b-textDark dark:border-b-textLight' }} />
                </div>
              ) : (
                'Suivis'
              )
            }
          >
            <div className="w-full flex flex-col gap-4">
              {posts?.length !== 0 ? (
                posts?.map((post: ExtendedPost) => (
                  <Fragment key={`post-${post.id_post}`}>
                    <Post key={post.id_post} post={post} user={user} displayAnswerTo={displayAnswerTo} />
                  </Fragment>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="text-2xl font-semibold">{postPage ? 'Aucune réponse 😢' : 'Aucun post 😢'}</div>
                </div>
              )}
            </div>
          </Tab>
          <Tab
            key="Guildes"
            title={
              selectedKey === 'Guildes' ? (
                <div className="flex items-center gap-2">
                  <span>Guildes</span>
                  <Spinner id="RefreshIconGuildes" size="sm" className="scale-75 hidden" classNames={{ circle1: 'border-b-textDark dark:border-b-textLight', circle2: 'border-b-textDark dark:border-b-textLight' }} />
                </div>
              ) : (
                'Guildes'
              )
            }
          >
            <div className="w-full flex flex-col gap-4">
              {posts?.length !== 0 ? (
                posts?.map((post: ExtendedPost) => (
                  <Fragment key={`post-${post.id_post}`}>
                    <Post key={post.id_post} post={post} user={user} displayAnswerTo={displayAnswerTo} />
                  </Fragment>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="text-2xl font-semibold">{postPage ? 'Aucune réponse 😢' : 'Aucun post 😢'}</div>
                </div>
              )}
            </div>
          </Tab>
        </Tabs>
        {isFetching && <div className="flex justify-center mt-4"><Spinner size="md" color="white" /></div>}
        {isLastsPosts && <div className="text-center text-textDark dark:text-textLight font-semibold text-lg mt-4">Vous avez atteint la fin des posts</div>}
      </div>
    );
  }
};

export default PostsWrapper;
