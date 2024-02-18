'use client'
import { useEffect } from 'react';
import { Button } from '@nextui-org/react';
import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr'
import { ExtendedPost, Profile } from '@/app/types/entities';
import { ChatBubbleLeftIcon, HeartIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const WrapperLikeAnswer = ({ post, user }: { post: ExtendedPost, user: Profile | null }) => {
    const router = useRouter();
    const [likesCount, setLikesCount] = useState(post.likes_count)
    const [answersCount, setAnswersCount] = useState(post.answers_count)
    const [userLikedPost, setUserLikedPost] = useState(post.user_liked_post)

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )


    useEffect(() => {
        const like = supabase.channel('realtime:public:likes`$`id_post=eq.`$`' + post.id_post)
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'likes', filter: `id_post=eq.${post.id_post}` },
                (_) => {
                    async function getLikesCount() {
                        const { data: likesCount } = await supabase
                            .from('likes')
                            .select('count')
                            .eq('id_post', post.id_post);

                        const { data: userLikes } = await supabase
                            .from('likes')
                            .select()
                            .eq('id_post', post?.id_post)
                            .eq('id_user', user?.id_user);

                        const userLikedPost = userLikes && userLikes.length > 0;

                        setLikesCount(likesCount && likesCount[0]?.count || 0);
                        setUserLikedPost(userLikedPost || false);
                    }
                    getLikesCount()
                }
            )
            .subscribe()

        return () => {
            like.unsubscribe()
        }
    }, [])

    useEffect(() => {
        const answers = supabase.channel('realtime:public:posts`$`parent=eq.`$`' + post.id_post)
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'posts', filter: `parent=eq.${post.id_post}` },
                (_) => {
                    console.log('answers changed')
                    async function getAnswersCount() {
                        const { data: answersCount } = await supabase
                            .from('posts')
                            .select('count')
                            .eq('parent', post.id_post);

                        setAnswersCount(answersCount && answersCount[0]?.count || 0);
                    }
                    getAnswersCount()
                }
            )
            .subscribe()

        return () => {
            answers.unsubscribe()
        }
    }, [])

    // fix state not updating when user disconnect on index page
    useEffect(() => {
        if (!user) setUserLikedPost(false)
    }
        , [user])


    const handletoggleLike = (e: any) => {
        e.preventDefault();
        if (user === null) {
            router.push('/login');
            return;
        }

        toggleLike()
        setLikesCount(userLikedPost && likesCount > 0 ? likesCount - 1 : likesCount + 1)
    }

    const toggleLike = async () => {

        if (userLikedPost) {
            // Unlike
            await supabase
                .from('likes')
                .delete()
                .match({ id_user: user!.id_user, id_post: post.id_post }) // Utiliser l'ID de l'utilisateur connecté

        } else {
            // Like
            await supabase
                .from('likes')
                .insert({ id_user: user!.id_user, id_post: post.id_post }) // Utiliser l'ID de l'utilisateur connecté

        }

        setUserLikedPost(!userLikedPost)
    }


    const formatCount = (count: number) => {
        if (count >= 1000000) {
            return (Math.floor(count / 1000000 * 10) / 10).toFixed(1) + 'M'; // convert to M for number from > 1000000
        } else if (count >= 1000) {
            return (Math.floor(count / 100) / 10).toFixed(1) + 'k'; // convert to k for number from > 1000 
        } else {
            return count;
        }
    }

    return (
        <div className='flex gap-4'>
            {user ? (
                <>
                    <Button variant='flat' className='bg-secondary/30 min-w-0 h-7 w-max rounded-sm text-textDark dark:text-textLight transition-all !duration-[75ms] px-2' onClick={(e) => handletoggleLike(e)}>
                        <HeartIcon className={`w-5 h-5 ${userLikedPost ? 'text-red-500 fill-red-500' : ''} transition-all ease-in-out`} /> {formatCount(likesCount)}
                    </Button>
                    <Button as={Link} variant='flat' className='bg-secondary/30 min-w-0 h-7 w-max rounded-sm text-textDark dark:text-textLight transition-all !duration-[75ms] px-2' href={`/p/${post.id_post}`}>
                        <ChatBubbleLeftIcon className="w-5 h-5" /> {formatCount(answersCount)}
                    </Button>
                </>
            ) : (
                <>
                    <Button as={Link} variant='flat' className='bg-secondary/30 min-w-0 h-7 w-max rounded-sm text-textDark dark:text-textLight transition-all !duration-500 px-2' href='/login'>
                        <HeartIcon className={`w-5 h-5 ${userLikedPost ? 'text-red-500 fill-red-500' : ''}`} /> {formatCount(likesCount)}
                    </Button>
                    <Button as={Link} variant='flat' className='bg-secondary/30 min-w-0 h-7 w-max rounded-sm text-textDark dark:text-textLight transition-all !duration-500 px-2' href={`/p/${post.id_post}`}>
                        <ChatBubbleLeftIcon className="w-5 h-5" /> {formatCount(answersCount)}
                    </Button>
                </>
            )}
        </div>
    );
};

export default WrapperLikeAnswer;