"use client";
import { ExtendedPost, Profile } from '@/app/types/entities';
import { Tabs, Tab, Spinner } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import { Fragment, useEffect, useRef, useState } from 'react';
import PostsWrapperSkeleton from './Skeletons/PostsWrapperSkeleton';
import { getPostSuivis } from '@/utils/getPostSuivis';
import { getPostGuildes } from '@/utils/getPostGuildes';

const Post = dynamic(() => import('@/components/Post'))

const PostsWrapper = ({ user, getPost, postPage, filtre }: { user: Profile | null, getPost: any, postPage?: boolean, filtre: boolean }) => {

    const [posts, setPosts] = useState<ExtendedPost[] | null>(null)
    const [postsRandom, setPostsRandom] = useState<ExtendedPost[] | null>(null)
    const [postsSuivis, setPostsSuivis] = useState<ExtendedPost[] | null>(null)
    const [postsGuildes, setPostsGuildes] = useState<ExtendedPost[] | null>(null)
    const [lastScrollDirection, setLastScrollDirection] = useState<'up' | 'down'>('down')
    const [isSticky, setIsSticky] = useState(false);
    const [selectedKey, setSelectedKey] = useState('MaPage')

    const prevScrollY = useRef(0);

    useEffect(() => {
        const fetchPosts = async () => {
            setPostsRandom(await getPost())
        }
        fetchPosts()
    }, [])

    useEffect(() => {
        if (postsRandom && selectedKey === 'MaPage') {
            setPosts(postsRandom)
        }
    }, [postsRandom, selectedKey])

    useEffect(() => {
        if (postsSuivis && selectedKey === 'Suivis') {
            setPosts(postsSuivis)
        }
    }, [postsSuivis, selectedKey])

    useEffect(() => {
        if (postsGuildes && selectedKey === 'Guildes') {
            setPosts(postsGuildes)
        }
    }, [postsGuildes, selectedKey])

    if (user && filtre === true) {
        useEffect(() => {
            const mainDiv = document.getElementsByTagName('main')[0];

            const handleScroll = () => {
                const currentScrollY = mainDiv.scrollTop;

                // Set the sticky status to true when the scroll threshold is reached
                if (currentScrollY > 350) {
                    setIsSticky(true);
                } else {
                    setIsSticky(false);
                }

                if (prevScrollY.current < currentScrollY) {
                    setLastScrollDirection('down');
                } else if (prevScrollY.current > currentScrollY) {
                    setLastScrollDirection('up');
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
                setPostsSuivis(await getPostSuivis(user.id_user))
            }
            fetchPostsSuivis()
        }, [])

        useEffect(() => {
            const fetchPostsGuildes = async () => {
                setPostsGuildes(await getPostGuildes(user.id_user))
            }
            fetchPostsGuildes()
        }, [])
    }

    const loadPosts = async (id_user: string, key: string) => {
        if (key === selectedKey && key === 'MaPage') {
            document.getElementById('RefreshIconMaPage')?.classList.remove('hidden')
            setPostsRandom(await getPost())
            document.getElementById('RefreshIconMaPage')?.classList.add('hidden')
        }
        if (key === selectedKey && key === 'Suivis') {
            document.getElementById('RefreshIconSuivis')?.classList.remove('hidden')
            setPostsSuivis(await getPostSuivis(id_user))
            document.getElementById('RefreshIconSuivis')?.classList.add('hidden')
        }
        if (key === selectedKey && key === 'Guildes') {
            document.getElementById('RefreshIconGuildes')?.classList.remove('hidden')
            setPostsGuildes(await getPostGuildes(id_user))
            document.getElementById('RefreshIconGuildes')?.classList.add('hidden')
        }

        setSelectedKey(key)
    }

    if (posts === null) {
        return <PostsWrapperSkeleton postPage={postPage} />
    }

    if (posts && filtre === false) {
        return (
            <div className={`w-full flex flex-col gap-4 ${postPage ? 'mt-8' : ''}`}>
                {posts?.length !== 0 ? (
                    posts?.map((post: ExtendedPost) => (
                        <Fragment key={`post-${post.id_post}`}>
                            <Post key={post.id_post} post={post} user={user} />
                        </Fragment>
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
    }

    if (posts && filtre && user) {
        return (
            <div className={`${postPage ? 'mt-8' : ''} `}>
                <Tabs aria-label="Filtres" defaultSelectedKey={'MaPage'} onSelectionChange={(key: any) => loadPosts(user.id_user, key)} disableAnimation={isSticky}
                    classNames={{
                        base: `z-[999] flex justify-center sticky transition-all !duration-250 ${lastScrollDirection === 'down' ? '-top-12' : 'top-1'}`
                    }} selectedKey={selectedKey}>
                    <Tab key="MaPage" title={selectedKey === 'MaPage' ?
                        <div className="flex items-center gap-2">
                            <span>Ma Page</span>
                            <Spinner id='RefreshIconMaPage' size="sm" className="scale-75 hidden" color="white" />
                        </div> : "Ma Page"}>
                        <div className="w-full flex flex-col gap-4">
                            {posts?.length !== 0 ? (
                                posts?.map((post: ExtendedPost) => (
                                    <Fragment key={`post-${post.id_post}`}>
                                        <Post key={post.id_post} post={post} user={user} />
                                    </Fragment>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <div className="text-2xl font-semibold">
                                        {postPage ? "Aucune réponse 😢" : "Aucun post 😢"}
                                    </div>
                                </div>
                            )}
                        </div>
                    </Tab>
                    <Tab key="Suivis" title={selectedKey === 'Suivis' ?
                        <div className="flex items-center gap-2">
                            <span>Suivis</span>
                            <Spinner id='RefreshIconSuivis' size="sm" className="scale-75 hidden" color="white" />
                        </div> : "Suivis"}>
                        <div className="w-full flex flex-col gap-4">
                            {posts?.length !== 0 ? (
                                posts?.map((post: ExtendedPost) => (
                                    <Fragment key={`post-${post.id_post}`}>
                                        <Post key={post.id_post} post={post} user={user} />
                                    </Fragment>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <div className="text-2xl font-semibold">
                                        {postPage ? "Aucune réponse 😢" : "Aucun post 😢"}
                                    </div>
                                </div>
                            )}
                        </div>
                    </Tab>
                    <Tab key="Guildes" title={selectedKey === 'Guildes' ?
                        <div className="flex items-center gap-2">
                            <span>Guildes</span>
                            <Spinner id='RefreshIconGuildes' size="sm" className="scale-75 hidden" color="white" />
                        </div> : "Guildes"}>
                        <div className="w-full flex flex-col gap-4">
                            {posts?.length !== 0 ? (
                                posts?.map((post: ExtendedPost) => (
                                    <Fragment key={`post-${post.id_post}`}>
                                        <Post key={post.id_post} post={post} user={user} />
                                    </Fragment>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <div className="text-2xl font-semibold">
                                        {postPage ? "Aucune réponse 😢" : "Aucun post 😢"}
                                    </div>
                                </div>
                            )}
                        </div>
                    </Tab>
                </Tabs>
            </div>
        )
    }
};

export default PostsWrapper;