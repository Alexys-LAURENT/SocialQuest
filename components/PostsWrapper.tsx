'use client';
import { ExtendedPost, Profile } from '@/app/types/entities';
import { Tabs, Tab, Spinner } from '@nextui-org/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import Post from '@/components/Post';
import { debounce } from 'lodash';
import { getPostsHome } from '@/utils/getPostsHome';
import { getPostsProfil } from '@/utils/getPostsProfil';
import { getPostsGuilde } from '@/utils/getPostsGuilde';
import { getPostAnswers } from '@/utils/getPostAnswers';
import AdPost from './AdPost';

const PostsWrapper = ({
  page,
  postsInit,
  user,
  profilePageId,
  guildeName,
  postId,
  postPage,
  filtre,
  displayAnswerTo,
}: {
  page: string;
  postsInit: any;
  user: Profile | null;
  profilePageId?: string;
  guildeName?: string;
  postId?: string;
  postPage?: boolean;
  filtre: boolean;
  displayAnswerTo?: boolean;
}) => {
  const [postsRandom, setPostsRandom] = useState<any | null>({ data: postsInit.postsRandom, isLastPostRandom: postsInit.postsRandomLast })
  const [postsSuivis, setPostsSuivis] = useState<any | null>({ data: postsInit.postsSuivis, isLastPostSuivis: postsInit.postsSuivisLast })
  const [postsGuildes, setPostsGuildes] = useState<any | null>({ data: postsInit.postsGuildes, isLastPostGuildes: postsInit.postsGuildesLast })
  const [offsetRandom, setOffsetRandom] = useState(10)
  const [offsetSuivis, setOffsetSuivis] = useState(10)
  const [offsetGuildes, setOffsetGuildes] = useState(10)

  const [postsProfil, setPostsProfil] = useState<any | null>({ data: postsInit.postsProfil, isLastPostProfil: postsInit.postsProfilLast })
  const [offsetProfil, setOffsetProfil] = useState(10)

  const [postsGuilde, setPostsGuilde] = useState<any | null>({ data: postsInit.postsGuilde, isLastPostGuilde: postsInit.postsGuildeLast })
  const [offsetGuilde, setOffsetGuilde] = useState(10)

  const [postAnswers, setPostAnswers] = useState<any | null>({ data: postsInit.postAnswers, isLastPostAnswer: postsInit.postAnswersLast })
  const [offsetAnswer, setOffsetAnswer] = useState(10)

  const limit = 5;

  const [isInView, setIsInView] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const [lastScrollDirection, setLastScrollDirection] = useState<'up' | 'down'>('down');
  const [isSticky, setIsSticky] = useState(false);
  const [selectedKey, setSelectedKey] = useState('MaPage');

  const containerRef = useRef(null)
  const prevScrollY = useRef(0);


  const Adpost = {
    id_post: 'ad',
    id_user: '274dea91-d2c3-4540-8f5f-dfd68f14f96f',
    parent_post_id: undefined,
    titre: 'Minecraft: Build. Explore. Survive.',
    contenu:
      `
      Your world. Your rules.

      Create, explore, and survive in the infinite world of Minecraft. Build anything you can imagine, from cozy cottages to epic castles. Delve into unexplored lands, encounter unique creatures, and uncover hidden treasures.
      Minecraft: Where Imagination Meets Adventure

      Play Now: https://www.minecraft.net/
      `,
    created_at: '2024-05-21T19:27:03.160411+00:00',
    id_guilde: undefined,
    images: ["https://sm.ign.com/t/ign_za/cover/m/minecraft/minecraft_tchj.1200.jpg"],
    creator_id_user: '274dea91-d2c3-4540-8f5f-dfd68f14f96f',
    creator_username: 'jblasio0',
    creator_avatar_url:
      'https://robohash.org/sunthicsimilique.png?size=200x100&set=set1',
    creator_a_propos:
      'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.',
    creator_banner_url:
      'https://rwfqowdxozczhnhxrkyd.supabase.co/storage/v1/object/public/assets/Bannieres/dog_family.png?t=2024-03-26T17%3A29%3A47.463Z',
    creator_niveau_libelle: 15,
    guilde_nom: 'LeagueOfLegends',
    guilde_avatar_url:
      'https://rwfqowdxozczhnhxrkyd.supabase.co//storage/v1/object/public/guildes_avatars/image.0.16852455294115543.webp',
    likes_count: 0,
    user_liked_post: false,
    answers_count: 0,
    parent_post_username: undefined,
    createdAtFormated: '21 mai 2024, 21:27'
  }

  useEffect(() => {
    // console.log(postsRandom.isLastPostRandom)
  }, [postsRandom])

  const handleScroll = () => {
    if (containerRef.current && typeof window !== 'undefined') {
      const container = containerRef.current as HTMLElement;
      const { bottom } = container.getBoundingClientRect();
      const { innerHeight } = window;
      setIsInView((prev) => bottom - 200 <= innerHeight);
    }
  }

  useEffect(() => {
    if (isInView) {
      setIsFetching(true)

      page === "home" && selectedKey === 'MaPage' && getPostsHome(offsetRandom, offsetSuivis, offsetGuildes, limit, "random").then((data) => {
        setOffsetRandom(offsetRandom + limit)
        if (data) {
          setPostsRandom({ data: [...postsRandom.data, ...data.postsRandom], isLastPostRandom: data.postsRandomLast });
        }
        setIsFetching(false)
      })

      page === "home" && selectedKey === 'Suivis' && getPostsHome(offsetRandom, offsetSuivis, offsetGuildes, limit, "suivis").then((data) => {
        setOffsetSuivis(offsetSuivis + limit)
        if (data) {
          setPostsSuivis({ data: [...postsSuivis.data, ...data.postsSuivis], isLastPostSuivis: data.postsSuivisLast });
        }
        setIsFetching(false)
      })

      page === "home" && selectedKey === 'Guildes' && getPostsHome(offsetRandom, offsetSuivis, offsetGuildes, limit, "guildes").then((data) => {
        setOffsetGuildes(offsetGuildes + limit)
        if (data) {
          setPostsGuildes({ data: [...postsGuildes.data, ...data.postsGuildes], isLastPostGuildes: data.postsGuildesLast });
        }
        setIsFetching(false)
      })

      page === "profil" && getPostsProfil(profilePageId!, offsetProfil, limit).then((data) => {
        setOffsetProfil(offsetProfil + limit)
        if (data) {
          setPostsProfil({ data: [...postsProfil.data, ...data.postsProfil], isLastPostProfil: data.postsProfilLast });
        }
        setIsFetching(false)
      })

      page === "guilde" && getPostsGuilde(guildeName!, offsetGuilde, limit).then((data) => {
        setOffsetGuilde(offsetGuilde + limit)
        if (data) {
          setPostsGuilde({ data: [...postsGuilde.data, ...data.postsGuilde], isLastPostGuilde: data.postsGuildeLast });
        }
        setIsFetching(false)
      })

      page === "post" && getPostAnswers(postId!, offsetAnswer, limit).then((data) => {
        setOffsetAnswer(offsetAnswer + limit)
        if (data) {
          setPostAnswers({ data: [...postAnswers.data, ...data.postAnswers], isLastPostAnswer: data.postAnswersLast });
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

  if (user && filtre === true) {
    useEffect(() => {
      const mainDiv = document.getElementsByTagName('main')[0];
      let lastDirectionChangeScrollY = 0;

      const handleScrollFiltre = () => {
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

      mainDiv.addEventListener('scroll', handleScrollFiltre);

      return () => {
        mainDiv.removeEventListener('scroll', handleScrollFiltre);
      };
    }, []);
  }

  const handleKeyChange = async (key: string) => {
    if (key === selectedKey && key === 'MaPage') {
      document.getElementById('RefreshIconMaPage')?.classList.remove('hidden');
      setOffsetRandom(10)
      const posts = await getPostsHome(0, offsetSuivis, offsetGuildes, 10, "random")
      setPostsRandom({ data: posts!.postsRandom, isLastPostRandom: posts!.postsRandomLast });
      document.getElementById('RefreshIconMaPage')?.classList.add('hidden');
    }

    if (key === selectedKey && key === 'Suivis') {
      document.getElementById('RefreshIconSuivis')?.classList.remove('hidden');
      setOffsetSuivis(10)
      const posts = await getPostsHome(offsetRandom, 0, offsetGuildes, 10, "suivis")
      setPostsSuivis({ data: posts!.postsSuivis, isLastPostSuivis: posts!.postsSuivisLast });
      document.getElementById('RefreshIconSuivis')?.classList.add('hidden');
    }

    if (key === selectedKey && key === 'Guildes') {
      document.getElementById('RefreshIconGuildes')?.classList.remove('hidden');
      setOffsetGuildes(10)
      const posts = await getPostsHome(offsetRandom, offsetSuivis, 0, 10, "guildes")
      setPostsGuildes({ data: posts!.postsGuildes, isLastPostGuildes: posts!.postsGuildesLast });
      document.getElementById('RefreshIconGuildes')?.classList.add('hidden');
    }

    setSelectedKey(key);
  };


  return (
    <div ref={containerRef} className={`${postPage ? 'mt-8' : ''} `}>
      <Tabs
        aria-label="Filtres"
        defaultSelectedKey={page === "home" || !user ? 'MaPage' : page === "profil" ? 'Profil' : page === "guilde" ? 'Guilde' : 'Post'}
        onSelectionChange={(key: React.Key) => handleKeyChange(key.toString())}
        disableAnimation={isSticky}
        classNames={{
          base: `z-10 flex justify-center sticky transition-all !duration-250 ${lastScrollDirection === 'down' ? '-top-12' : 'top-1'}`,
          tabList: `bg-tempLightBorder dark:bg-tempDarkBorder transition-all !duration-500 text-textDark dark:text-textLight ${page === "profil" || page === "guilde" || page === "post" || !user ? 'hidden' : ''}`,
          cursor: 'transition-colors !duration-500',
        }}
        selectedKey={selectedKey}
      >
        {page === "home" && (
          <Tab
            className={`${!user && 'py-0'}`}
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
              {postsRandom?.data?.length > 0 ? (
                <Fragment>
                  <Post key={postsRandom.data[0].id_post} post={postsRandom.data[0]} user={user} displayAnswerTo={displayAnswerTo} />
                  <AdPost key={'postsRandom.data[0].id_post'} post={Adpost} user={user} displayAnswerTo={displayAnswerTo} />
                  {postsRandom.data.slice(1).map((post: ExtendedPost) => (
                    <Fragment key={`post-${post.id_post}`}>
                      <Post key={post.id_post} post={post} user={user} displayAnswerTo={displayAnswerTo} />
                    </Fragment>
                  ))}
                </Fragment>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="text-2xl font-semibold">Aucun post 😢</div>
                </div>
              )}
            </div>
          </Tab>
        )}

        {page === "home" && (
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
              {postsGuildes?.data?.length !== 0 ? (
                postsGuildes?.data?.map((post: ExtendedPost) => (
                  <Fragment key={`post-${post.id_post}`}>
                    <Post key={post.id_post} post={post} user={user} displayAnswerTo={displayAnswerTo} />
                  </Fragment>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="text-2xl font-semibold">Aucun post 😢</div>
                </div>
              )}
            </div>
          </Tab>
        )}

        {page === "profil" && (
          <Tab
            key="Profil"
            title={"Profil"}
          >
            <div className="w-full flex flex-col gap-4">
              {postsProfil?.data?.length !== 0 ? (
                postsProfil?.data?.map((post: ExtendedPost) => (
                  <Fragment key={`post-${post.id_post}`}>
                    <Post key={post.id_post} post={post} user={user} displayAnswerTo={displayAnswerTo} />
                  </Fragment>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="text-2xl font-semibold">Aucun post 😢</div>
                </div>
              )}
            </div>
          </Tab>
        )}

        {page === "guilde" && (
          <Tab
            key="Guilde"
            title={"Guilde"}
          >
            <div className="w-full flex flex-col gap-4">
              {postsGuilde?.data?.length !== 0 ? (
                postsGuilde?.data?.map((post: ExtendedPost) => (
                  <Fragment key={`post-${post.id_post}`}>
                    <Post key={post.id_post} post={post} user={user} displayAnswerTo={displayAnswerTo} />
                  </Fragment>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="text-2xl font-semibold">Aucun post 😢</div>
                </div>
              )}
            </div>
          </Tab>
        )}

        {page === "post" && (
          <Tab
            key="Post"
            title={"Post"}
          >
            <div className="w-full flex flex-col gap-4">
              {postAnswers?.data?.length !== 0 ? (
                postAnswers?.data?.map((post: ExtendedPost) => (
                  <Fragment key={`post-${post.id_post}`}>
                    <Post key={post.id_post} post={post} user={user} displayAnswerTo={displayAnswerTo} />
                  </Fragment>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="text-2xl font-semibold">Aucune réponse 😢</div>
                </div>
              )}
            </div>
          </Tab>
        )}

      </Tabs>

      {isFetching && <div className="flex justify-center mt-4"><Spinner size="md" color="white" /></div>}

      {selectedKey === 'MaPage' && postsRandom.isLastPostRandom && postsRandom.data.length > 0 && <div className="text-center text-textDark dark:text-textLight font-semibold text-lg mt-4">Vous avez atteint la fin des posts</div>}
      {selectedKey === 'Suivis' && postsSuivis.isLastPostSuivis && postsSuivis.data.length > 0 && <div className="text-center text-textDark dark:text-textLight font-semibold text-lg mt-4">Vous avez atteint la fin des posts</div>}
      {selectedKey === 'Guildes' && postsGuildes.isLastPostGuildes && postsGuildes.data.length > 0 && <div className="text-center text-textDark dark:text-textLight font-semibold text-lg mt-4">Vous avez atteint la fin des posts</div>}
      {selectedKey === 'Profil' && postsProfil.isLastPostProfil && postsProfil.data.length > 0 && <div className="text-center text-textDark dark:text-textLight font-semibold text-lg mt-4">Vous avez atteint la fin des posts</div>}
      {selectedKey === 'Guilde' && postsGuilde.isLastPostGuilde && postsGuilde.data.length > 0 && <div className="text-center text-textDark dark:text-textLight font-semibold text-lg mt-4">Vous avez atteint la fin des posts</div>}
      {selectedKey === 'Post' && postAnswers.isLastPostAnswer && postAnswers.data.length > 0 && <div className="text-center text-textDark dark:text-textLight font-semibold text-lg mt-4">Vous avez atteint la fin des réponses</div>}
    </div>
  );
};

export default PostsWrapper;
