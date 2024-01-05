'use client'
import React, { useEffect } from 'react';
import { Button } from '@nextui-org/react';
import { ExtendedPost, Profile } from '@/app/types/entities';
import { ChatBubbleLeftIcon, HeartIcon } from '@heroicons/react/24/outline';
import { createBrowserClient } from '@supabase/ssr'
import { useState } from 'react';
import { data } from 'autoprefixer';

const WrapperLikeAnswer = ({ post, user }: { post: ExtendedPost, user: Profile }) => {
    const [likesCount, setLikesCount] = useState(post.likesCount)
    const [answersCount, setAnswersCount] = useState(post.answersCount)
    const [userLikedPost, setUserLikedPost] = useState(post.userLikedPost)

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    useEffect(() => {
        const like = supabase.channel('realtime:public:likes`$`id_post=eq.`$`' + post.id_post)
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'likes', filter: `id_post=eq.${post.id_post}` },
                (payload) => {
                    async function getLikesCount() {
                        const { data: likesCount } = await supabase
                            .from('likes')
                            .select('count')
                            .eq('id_post', post.id_post);

                        const { data: userLikes } = await supabase
                            .from('likes')
                            .select()
                            .eq('id_post', post.id_post)
                            .eq('id_user', user.id_user);

                        const userLikedPost = userLikes && userLikes.length > 0;

                        setLikesCount(likesCount && likesCount[0]?.count || 0);
                        setUserLikedPost(userLikedPost || false);
                    }
                    getLikesCount()
                }
            )
            .subscribe()
    }, []);


    const handletoggleLike = () => {
        toggleLike()
        setLikesCount(userLikedPost && likesCount > 0 ? likesCount - 1 : likesCount + 1)
    }

    const toggleLike = async () => {


        if (userLikedPost) {
            // Unlike
            await supabase
                .from('likes')
                .delete()
                .match({ id_user: user.id_user, id_post: post.id_post }) // Utiliser l'ID de l'utilisateur connecté

        } else {
            // Like
            await supabase
                .from('likes')
                .insert({ id_user: user.id_user, id_post: post.id_post }) // Utiliser l'ID de l'utilisateur connecté

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
            <Button variant='flat' color='primary' className='min-w-0 h-7 w-max rounded-sm text-textLight px-2' onClick={handletoggleLike}>
                <HeartIcon className={`w-5 h-5 ${userLikedPost ? 'text-red-500 fill-red-500' : ''} transition-all ease-in-out`} /> {formatCount(likesCount)}
            </Button>
            <Button variant='flat' color='primary' className='min-w-0 h-7 w-max rounded-sm text-textLight px-2'>
                <ChatBubbleLeftIcon className="w-5 h-5" /> {answersCount}
            </Button>
        </div>
    );
};

export default WrapperLikeAnswer;