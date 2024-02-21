'use client';
import { useContext, useState } from 'react';
import { Button, Popover, PopoverContent, PopoverTrigger, Spinner } from '@nextui-org/react';
import Link from 'next/link';
import { EllipsisVerticalIcon, FlagIcon, ShareIcon, TrashIcon } from '@heroicons/react/24/outline';
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

export default function Post({ user, post }: { user: Profile | null; post: ExtendedPost }) {
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

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).classList.contains('postRedirect')) {
      const link = document.getElementById(`post-link-${post.id_post}`);
      link?.click();
    }
  };

  return (
    <div
      className="postRedirect flex flex-col border border-tempLightBorder dark:border-tempDarkBorder bg-tempBgLightSecondary dark:bg-tempBgDarkSecondary hover:bg-tempLightHover/20 dark:hover:bg-tempDarkHover/20 rounded-md p-2 gap-1 cursor-pointer transition-all !duration-500"
      onClick={(e) => handleClick(e)}
    >
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
              post.images.map((img, index) => (
                <div className={`relative flex-1-1 overflow-hidden`} key={`post-${post.id_post}-image-${img}`}>
                  <ImageAntdPreview img={img} onDownload={onDownload} />
                </div>
              ))}
          </div>
        </div>

        <div className="postRedirect flex md:flex-row gap-2 flex-col-reverse justify-between">
          <WrapperLikeAnswer post={post} user={user} />
          <div className="text-slate-400 text-xs flex items-end">{post.createdAtFormated}</div>
        </div>
      </div>
    </div>
  );
}
