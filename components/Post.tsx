'use client';
import { useContext, useEffect, useRef, useState } from 'react';
import { Button, Popover, PopoverContent, PopoverTrigger, Spinner } from '@nextui-org/react';
import Link from 'next/link';
import { EllipsisVerticalIcon, FlagIcon, HeartIcon, ShareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ExtendedPost, Profile } from '@/app/types/entities';
import PopoverUserProfile from '@/components/PopoverUserProfile';
import WrapperLikeAnswer from '@/components/WrapperLikeAnswer';
import { ToasterContext } from '@/app/context/ToasterContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import defaultUser from '@/public/assets/defaultUser.svg';
import { removePost } from '@/utils/removePost';
import { onDownload } from '@/utils/downloadImage';
import ImageAntdPreview from '@/components/ImageAntdPreview';
import { createClient } from '@/utils/supabase/client';

export default function Post({ user, post, displayAnswerTo }: { user: Profile | null; post: ExtendedPost, displayAnswerTo?: boolean }) {
  const router = useRouter();
  const { success, error } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const isDeleted = await removePost(post);
    if (!isDeleted) {
      error('Erreur lors de la suppression des images');
    } else {
      success('Post supprimé');
      router.refresh();
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const supabase = createClient();

  const clickCount = useRef(0);
  const clickTimer = useRef<NodeJS.Timeout | null>(null);
  const [hearts, setHearts] = useState<{ x: number; y: number; id: number }[]>([]);
  const [nextHeartId, setNextHeartId] = useState(1);

  const showHeart = (e: any) => {
    const boundingBox = e.currentTarget.getBoundingClientRect(); // Obtient la position de la div par rapport à la fenêtre
    const x = e.clientX - boundingBox.left; // Coordonnée x relative à la div
    const y = e.clientY - boundingBox.top; // Coordonnée y relative à la div

    const heartId = nextHeartId;

    setHearts((prevHearts) => [
      ...prevHearts,
      { x, y, id: heartId },
    ]);
    setNextHeartId((prevId) => prevId + 1);

    setTimeout(() => {
      setHearts((prevHearts) => prevHearts.filter((heart) => heart.id !== heartId));
    }, 780); // ajuste la durée d'affichage du cœur selon tes besoins
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {

    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    if (!isTouchDevice && (e.target as HTMLElement).classList.contains('postRedirect')) {
      clickCount.current = 0;
      return document.getElementById(`post-link-${post.id_post}`)?.click();
    }

    let parent = e.target as HTMLElement | null;
    while (parent) {
      if (parent.classList.contains('ant-image-preview-root') || parent.classList.contains('ant-image-preview-close')) {
        return;
      }
      parent = parent.parentElement;
    }

    clickCount.current++;

    if (clickCount.current === 1) {
      clickTimer.current = setTimeout(() => {
        // Si c'est un simple clic, effectue la redirection
        if ((e.target as HTMLElement).classList.contains('postRedirect')) {
          const link = document.getElementById(`post-link-${post.id_post}`);
          clickCount.current = 0;
          link?.click();
        }

        clickCount.current = 0;
      }, 200); // ajuste la durée du double clic selon tes besoins
    } else if (clickCount.current === 2) {
      //check si il y a un user connecté
      if (!user) {
        return document.getElementById('redirect-login')?.click();
      }

      // Si c'est un double clic, like le post
      likePost();
      !post.user_liked_post && showHeart(e);
      clickCount.current = 0;
      clearTimeout(clickTimer.current!);
    }
  };

  const likePost = async () => {
    if (post.user_liked_post) {
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
    post.user_liked_post = !post.user_liked_post;
  };

  useEffect(() => {
    return () => {
      // Assure-toi de nettoyer le timer lors du démontage du composant
      if (clickTimer.current) {
        clearTimeout(clickTimer.current);
      }
    };
  }, []);

  return (
    <div
      className="postRedirect relative flex flex-col border border-tempLightBorder dark:border-tempDarkBorder bg-tempBgLightSecondary dark:bg-tempBgDarkSecondary hover:bg-tempLightHover/20 dark:hover:bg-tempDarkHover/20 rounded-md p-2 gap-1 cursor-pointer transition-all !duration-500"
      onClick={(e) => handleClick(e)}
    >
      <Link id={`redirect-login`} href={`/login`} className="hidden" />
      <Link id={`post-link-${post.id_post}`} href={`/p/${post.id_post}`} className="hidden" />
      <div className="flex gap-2">
        <Image
          src={post.id_guilde ? post.guilde_avatar_url : post.creator_avatar_url || defaultUser.src}
          alt={post.id_guilde ? post.guilde_avatar_url : post.creator_avatar_url || defaultUser.src}
          width={32}
          height={32}
          className="min-h-[32px] min-w-[32px] rounded-full"
        />
        <div className="postRedirect flex items-center justify-between w-full">
          <div className="flex items-center gap-1">
            {post.id_guilde && (
              <>
                <Link
                  href={`/g/${post.guilde_nom}`}
                  className="text-sm text-textDark dark:text-textLight  font-semibold"
                >
                  {post.guilde_nom}
                </Link>
                <div className="text-textDark dark:text-textLight transition-all !duration-[125ms]">•</div>
              </>
            )}
            <PopoverUserProfile post={post} />
          </div>
          <Popover
            placement="top"
            offset={10}
            shouldBlockScroll={true}
            isOpen={isOpen}
            onOpenChange={(open) => setIsOpen(open)}
          >
            <PopoverTrigger>
              <EllipsisVerticalIcon className="w-7 h-7 px-1 text-textDark dark:text-textLight cursor-pointer transition-all !duration-[125ms]" />
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <div className="flex flex-col">
                <Button className="flex gap-2 min-w-0 h-7 min-h-0 px-3 rounded-b text-secondary" variant="light"
                  // copy post link to clipboard
                  onClick={() => {
                    // to finish, doesn't work on all browsers yet, library suggested: clipboard-polyfill
                    navigator.clipboard && navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_APP_URL}/p/${post.id_post}`)
                      .then(() => {
                        success('Lien du post copié dans le presse papier !');
                        setIsOpen(false);
                      })
                      .catch(() => {
                        error('Erreur lors de la copie du lien dans le presse papier');
                        setIsOpen(false);
                      });
                  }}
                >
                  <ShareIcon className="w-5 h-5" />
                  <div>Partager</div>
                </Button>
                {user?.id_user === post.id_user ? (
                  <Button
                    onClick={() => handleDelete()}
                    className="flex gap-2 min-w-0 h-7 min-h-0 px-3 rounded-t"
                    variant="light"
                    color="danger"
                  >
                    {isLoading ? (
                      <div className="w-full flex justify-satrt">
                        Suppression...
                        <Spinner size="sm" className="scale-80" color="danger" />
                      </div>
                    ) : (
                      <>
                        <TrashIcon className="w-5 h-5" />
                        <div>Supprimer</div>
                      </>
                    )}
                  </Button>
                ) : (
                  <Button className="flex gap-2 min-w-0 h-7 min-h-0 px-3 rounded-t" variant="light" color="danger">
                    <FlagIcon className="w-5 h-5" />
                    <div>Signaler</div>
                  </Button>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="postRedirect flex flex-col px-10 gap-2">
        <div className='postRedirect'>
          <div
            className={`postRedirect text-textDark dark:text-textLight text-md text-[18px] font-semibold working-break-words transition-all !duration-[125ms] ${post.titre ? 'mb-1' : ''}`}
          >
            {post.titre}
          </div>
          <div className="postRedirect text-textDark dark:text-textLight working-break-words transition-all !duration-[125ms] font-light mb-4">
            {post.contenu}
          </div>
          <div
            className={`flex flex-wrap gap-1 aspect-square rounded-lg overflow-hidden cursor-default ${post.images && post.images.length >= 1 ? 'w-full' : 'w-0'}`}
          >
            {post.images &&
              post.images.length > 0 &&
              post.images.map((img) => (
                <div className={`relative flex-1-1 overflow-hidden`} key={`post-${post.id_post}-image-${img}`}>
                  <ImageAntdPreview img={img} onDownload={onDownload} />
                </div>
              ))}
          </div>
        </div>

        {displayAnswerTo && post.parent_post_id && (
          <div className="flex items-center gap-2 text-textDark dark:text-textLight">
            <Link href={`/p/${post.parent_post_id}`} className='flex gap-1'>
              <div className="text-xs text-default-500">En réponse à</div>
              <div className="text-xs text-blue-500 font-semibold hover:underline">@{post.parent_post_username}</div>
            </Link>
          </div>
        )}

        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="heart-container !z-[1000000]"
            style={{
              top: `${heart.y}px`,
              left: `${heart.x}px`,
            }}
          >
            <HeartIcon className={`w-5 h-5 text-red-500 fill-red-500`} style={{ transform: `rotate(${Math.random() * 30 - 15}deg)` }} />
          </div>
        ))}

        <div className="postRedirect flex md:flex-row gap-2 flex-col-reverse justify-between">
          <WrapperLikeAnswer post={post} user={user} likePost={likePost} />
          <div className="text-slate-400 text-xs flex items-end">{post.createdAtFormated}</div>
        </div>
      </div>
    </div>
  );
}
