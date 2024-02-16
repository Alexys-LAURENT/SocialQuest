'use client';
import { useState, useContext, ChangeEvent } from 'react';
import { DocumentIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { Spinner, Textarea } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { ToasterContext } from '@/app/context/ToasterContext';
import { sendPost } from '@/utils/sendPost';
import PostInputGuildsListBox from '@/components/PostInputGuildsSelect';
import Image from 'next/image';
import { uploadFiles } from '@/utils/uploadFiles';

interface PostInputProps {
  id_guilde?: string;
  page?: string;
  guildesUser?: any;
  parent?: string;
}

const PostInput = ({ id_guilde, page, guildesUser, parent }: PostInputProps) => {
  const router = useRouter();
  const { success, error } = useContext(ToasterContext);
  const limite = {
    titre: 200,
    contenu: 500,
  };

  const [titre, setTitre] = useState<string>('');
  const [contenu, setContenu] = useState<string>('');
  const [guilde, setGuilde] = useState<any>('');
  const [imageData, setImageData] = useState<{ file: File; url: string }[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);

  function handleChangeTitle(e: any) {
    if (e.target.value.length <= limite.titre) {
      setTitre(e.target.value);
    }
  }

  function handleChangeContent(e: any) {
    if (e.target.value.length <= limite.contenu) {
      setContenu(e.target.value);
    }
  }

  async function send(e: any) {
    e.preventDefault();
    if ((page !== 'post' && titre === '') || contenu === '') {
      return error(`Veuillez inclure ${page !== 'post' ? 'un titre et' : ''} un contenu`);
    }
    setIsPublishing(true);

    const data: { id_guilde?: string; titre: string; contenu: string; parent?: string; images?: string[] } = {
      titre: titre,
      contenu: contenu,
    };

    if (id_guilde) {
      data.id_guilde = id_guilde;
    } else if (guilde !== '') {
      data.id_guilde = guilde;
    }

    if (parent) {
      data.parent = parent;
    }

    const filesPaths = await uploadFiles(imageData, 'images_posts');
    if (!filesPaths) {
      return error("Une erreur est survenue lors de l'envoi des images");
    }

    data.images = filesPaths;
    const isDone = await sendPost(data);

    if (isDone) {
      success('Post envoyé !');
    } else {
      error('Une erreur est survenue');
    }
    setTitre('');
    setContenu('');
    setImageData([]);
    setIsPublishing(false);
    router.refresh();
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      const imageType = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/webp'];

      if (!imageType.includes(file.type)) {
        // empty the input
        event.target.value = '';
        return error("Le fichier n'est pas une image");
      }

      if (file.size > 5242881) {
        // empty the input
        event.target.value = '';
        return error('Le fichier est trop lourd, veuillez choisir une image de maximum 5Mo');
      }

      reader.onload = (e) => {
        if (e.target) {
          // Lecture terminée
          const imageDataUrl = e.target.result as string;
          //   setImageData(imageDataUrl);
          setImageData([...(imageData || []), { file: file, url: imageDataUrl }]);
        }
      };

      reader.readAsDataURL(file); // Lecture du fichier en tant que Data URL

      // empty the input
      event.target.value = '';
    }
  };

  return (
    <div className="w-full h-fit flex flex-col min-h-fit ">
      <form id="NewPostinput" onSubmit={(e) => send(e)}>
        <div className="flex flex-col h-full w-full bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder rounded-t-md py-2 px-6 gap-1 transition-all !duration-500">
          {page === 'index' && guildesUser.length > 0 && (
            <PostInputGuildsListBox setGuilde={setGuilde} guildesUser={guildesUser} />
          )}
          {page !== 'post' && (
            <div className="relative">
              <Textarea
                aria-label="titre"
                id="PostInputTitle"
                minRows={1}
                classNames={{
                  inputWrapper:
                    'bg-transparent group-data-[focus=true]:bg-opacity-30 data-[hover=true]:bg-opacity-30 pb-5 h-auto',
                  input: 'font-bold',
                }}
                value={titre}
                placeholder="Titre..."
                maxLength={limite.titre}
                onChange={(e) => handleChangeTitle(e)}
              ></Textarea>
              <div
                className={`CharCountTitleNewPostWrapper absolute bottom-1 right-4 text-[10px] text-[#7c7c7c] ${titre.length > limite.titre ? 'text-red-500' : ''}`}
              >
                <span className="CharCountTitleNewPost">{titre.length}</span>/{limite.titre}
              </div>
            </div>
          )}

          <div className="relative">
            <Textarea
              aria-label="contenu"
              id="PostInputContent"
              minRows={3}
              classNames={{
                inputWrapper:
                  'bg-transparent group-data-[focus=true]:bg-opacity-30 data-[hover=true]:bg-opacity-30 h-auto  pb-5',
              }}
              placeholder="Contenu..."
              value={contenu}
              maxLength={limite.contenu}
              onChange={(e) => handleChangeContent(e)}
            ></Textarea>
            <div
              className={`CharCountContenuNewPostWrapper absolute bottom-1 right-4 text-[10px] text-[#7c7c7c]  ${contenu.length > limite.contenu ? 'text-red-500' : ''}`}
            >
              <span className="CharCountContenuNewPost">{contenu.length}</span>/{limite.contenu}
            </div>
          </div>
          <div className="flex justify-center">
            <div
              className={`flex flex-wrap gap-2 aspect-square ${imageData && imageData.length >= 1 ? 'w-full' : 'w-0'}`}
            >
              {imageData &&
                imageData.map((img, index) => (
                  <div className="relative flex-1-1 " key={index}>
                    <Image src={img.url} alt="image" objectFit="cover" layout="fill" />
                    <button
                      type="button"
                      className="absolute top-1 right-1"
                      onClick={() => setImageData(imageData.filter((_, i) => i !== index))}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 bg-[#000000]/40 rounded-full p-1 hover:bg-[#000000]/60 transition-all !duration-[125ms]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#fff"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="h-[30px] w-full bg-tempLightBorder dark:bg-[#1f1e1b] rounded-b-md transition-all !duration-500">
          <div className="flex justify-between items-center h-full px-2">
            <button
              type="button"
              className="flex  items-center text-textDark dark:text-textLight transition-all !duration-[125ms]"
              aria-label="ajouter un document"
              name="add-document"
            >
              <input type="file" id="postUploaderFile" className="hidden" onChange={handleFileChange} />
              <DocumentIcon
                className={`w-5 h-5 text-textDark dark:text-textLight transition-all !duration-[125ms] ${imageData && imageData.length >= 4 ? 'opacity-25 cursor-not-allowed' : ''} `}
                onClick={() => {
                  imageData && imageData?.length < 4 && document.getElementById('postUploaderFile')?.click();
                }}
              />
              {imageData && imageData.length > 0 && (
                <span className="text-textDark/70 dark:text-textLight/70 text-[12px] ml-1">{imageData.length}/4</span>
              )}
            </button>
            <button
              type="submit"
              className="text-textDark dark:text-textLight transition-all !duration-[125ms]"
              aria-label="envoyer le post"
              name="send-post"
            >
              {isPublishing ? (
                <Spinner size="sm" className="scale-75 mt-2" color="white" />
              ) : (
                <PaperAirplaneIcon className="w-5 h-5  text-textDark dark:text-textLight ml-[0.15rem] -rotate-45 transition-all !duration-[125ms]" />
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostInput;
