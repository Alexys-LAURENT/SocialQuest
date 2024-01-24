"use client"
import { useState, useContext } from 'react';
import { Button } from 'antd';
import { DocumentIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { Textarea } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { ToasterContext } from '@/app/context/ToasterContext';
import { sendPost } from '@/utils/sendPost';
import PostInputGuildsListBox from '@/components/PostInputGuildsSelect';

interface PostInputProps {
    id_guilde?: string,
    page?: string
    guildesUser?: any
    parent?: string
}

const PostInput = ({ id_guilde, page, guildesUser, parent }: PostInputProps) => {
    const router = useRouter();
    const { success, error } = useContext(ToasterContext);
    const limite = {
        titre: 200,
        contenu: 500
    }

    const [titre, setTitre] = useState<string>('')
    const [contenu, setContenu] = useState<string>('')
    const [guilde, setGuilde] = useState<any>('')

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
        if (page !== 'post' && titre === '' || contenu === '') {
            return error(`Veuillez inclure ${page !== 'post' ? 'un titre et' : ''} un contenu`);
        }

        const data: { id_guilde?: string, titre: string, contenu: string, parent?: string } = { titre: titre, contenu: contenu };

        if (id_guilde) {
            data.id_guilde = id_guilde;
        } else if (guilde !== '') {
            data.id_guilde = guilde;
        }

        if (parent) {
            data.parent = parent;
        }

        const isDone = await sendPost(data);

        if (isDone) {
            success('Post envoyé !');
        } else {
            error('Une erreur est survenue');
        }
        setTitre('');
        setContenu('');
        router.refresh();
    }


    return (
        <div className="w-full h-fit flex flex-col min-h-fit ">
            <form id='NewPostinput' onSubmit={(e) => send(e)} >
                <div className="flex flex-col h-full w-full bg-bgLightCard dark:bg-bgDarkCard rounded-t-md py-2 px-6 gap-1 transition-all !duration-500">
                    {page === 'index' && guildesUser.length > 0 &&
                        <PostInputGuildsListBox setGuilde={setGuilde} guildesUser={guildesUser} />
                    }
                    {page !== 'post' &&
                        <div className='relative'>
                            <Textarea aria-label='titre' id="PostInputTitle" minRows={1} classNames={{ inputWrapper: "bg-transparent group-data-[focus=true]:bg-opacity-30 data-[hover=true]:bg-opacity-30 pb-5 h-auto", input: "font-bold" }} value={titre} placeholder="Titre..." maxLength={limite.titre} onChange={(e) => handleChangeTitle(e)} >

                            </Textarea>
                            <div className={`CharCountTitleNewPostWrapper absolute bottom-1 right-4 text-[10px] text-[#7c7c7c] ${titre.length > limite.titre ? 'text-red-500' : ''}`}>
                                <span className="CharCountTitleNewPost">{titre.length}</span>/{limite.titre}
                            </div>
                        </div>
                    }
                    <div className='relative'>
                        <Textarea aria-label='contenu' id="PostInputContent" minRows={3} classNames={{ inputWrapper: "bg-transparent group-data-[focus=true]:bg-opacity-30 data-[hover=true]:bg-opacity-30 h-auto  pb-5" }} placeholder="Contenu..." value={contenu} maxLength={limite.contenu} onChange={(e) => handleChangeContent(e)} >

                        </Textarea>
                        <div className={`CharCountContenuNewPostWrapper absolute bottom-1 right-4 text-[10px] text-[#7c7c7c]  ${contenu.length > limite.contenu ? 'text-red-500' : ''}`}>
                            <span className="CharCountContenuNewPost">{contenu.length}</span>/{limite.contenu}
                        </div>
                    </div>

                </div>
                <div className="h-[30px] w-full bg-[#b9b9b9] dark:bg-[#1f1e1b] rounded-b-md transition-all !duration-500">
                    <div className="flex justify-between items-center h-full px-2">
                        <Button color='primary' className="p-0 h-[20px] w-[20px] border-none bg-transparent">
                            <DocumentIcon className="w-5 h-5 text-textDark dark:text-textLight transition-all !duration-[125ms]" />
                        </Button>
                        <Button color='primary' className="p-0 h-[20px] w-[20px] border-none bg-transparent" htmlType='submit'>
                            <PaperAirplaneIcon className="w-5 h-5  text-textDark dark:text-textLight ml-[0.15rem] -rotate-45 transition-all !duration-[125ms]" />
                        </Button>
                    </div>
                </div>
            </form >
        </div >
    );
};

export default PostInput;