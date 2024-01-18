"use client"
import { useState, useContext } from 'react';
import { Button } from 'antd';
import { DocumentIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { createBrowserClient } from '@supabase/ssr'
import { Avatar, Select, SelectItem, Textarea } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { ToasterContext } from '@/app/context/ToasterContext';
import { sendPost } from '@/utils/sendPost';
import Forbidden from '@/public/assets/forbidden.png';

interface PostInputProps {
    id_guilde?: string,
    index?: boolean,
    guildesUser?: any
}

const PostInput = ({ id_guilde, index, guildesUser }: PostInputProps) => {
    const router = useRouter();
    const { success, error } = useContext(ToasterContext);
    const limite = {
        titre: 200,
        contenu: 500
    }

    const [titre, setTitre] = useState<string>('')
    const [contenu, setContenu] = useState<string>('')
    const [guilde, setGuilde] = useState<any>('')

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

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
        if (titre === '' || contenu === '') {
            return error('Veuillez inclure un titre et un contenu');
        }

        const data = id_guilde ? { id_guilde: id_guilde, titre: titre, contenu: contenu } : guilde === '' ? { titre: titre, contenu: contenu } : { id_guilde: guilde, titre: titre, contenu: contenu };

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
                <div className="flex flex-col h-full w-full bg-[#11100e] rounded-t-md py-2 px-6 gap-1">
                    {index &&
                        <Select
                            label="Guilde"
                            variant='underlined'
                            placeholder="Pas de guilde"
                            className="w-full"
                            classNames={{ trigger: "bg-transparent group-data-[focus=true]:bg-opacity-30 data-[hover=true]:bg-opacity-30 rounded-none", popoverContent: "bg-[#11100e]" }}
                            onChange={(e) => setGuilde(e.target.value)}
                        >
                            {guildesUser && guildesUser.map((guildeUser: any) => (
                                <SelectItem key={guildeUser.guildes.id_guilde} value={guildeUser.guildes.id_guilde} textValue={guildeUser.guildes.nom}>
                                    <div className="flex gap-2 items-center">
                                        <Avatar alt={guildeUser.guildes.nom} className="flex-shrink-0" size="sm" src={guildeUser.guildes.avatar_url} />
                                        <div className="flex flex-col">
                                            <span className="text-small">{guildeUser.guildes.nom}</span>
                                        </div>
                                    </div>
                                </SelectItem>
                            ))}
                        </Select>
                    }
                    <div className='relative'>
                        <Textarea aria-label='titre' id="PostInputTitle" minRows={1} classNames={{ inputWrapper: "bg-transparent group-data-[focus=true]:bg-opacity-30 data-[hover=true]:bg-opacity-30 h-auto pb-5", input: "font-bold" }} value={titre} placeholder="Titre..." maxLength={limite.titre} onChange={(e) => handleChangeTitle(e)}>

                        </Textarea>
                        <div className={`CharCountTitleNewPostWrapper absolute bottom-1 right-4 text-[10px] text-[#7c7c7c] ${titre.length > limite.titre ? 'text-red-500' : ''}`}>
                            <span className="CharCountTitleNewPost">{titre.length}</span>/{limite.titre}
                        </div>
                    </div>
                    <div className='relative'>
                        <Textarea aria-label='contenu' id="PostInputContent" classNames={{ inputWrapper: "bg-transparent group-data-[focus=true]:bg-opacity-30 data-[hover=true]:bg-opacity-30 h-auto pb-5" }} placeholder="Contenu..." value={contenu} maxLength={limite.contenu} onChange={(e) => handleChangeContent(e)}>

                        </Textarea>
                        <div className={`CharCountContenuNewPostWrapper absolute bottom-1 right-4 text-[10px] text-[#7c7c7c]  ${contenu.length > limite.contenu ? 'text-red-500' : ''}`}>
                            <span className="CharCountContenuNewPost">{contenu.length}</span>/{limite.contenu}
                        </div>
                    </div>

                </div>
                <div className="h-[30px] w-full bg-[#1f1e1b] rounded-b-md">
                    <div className="flex justify-between items-center h-full px-2">
                        <Button color='primary' className="p-0 h-[20px] w-[20px] border-none bg-transparent">
                            <DocumentIcon className="w-5 h-5 text-textLight" />
                        </Button>
                        <Button color='primary' className="p-0 h-[20px] w-[20px] border-none bg-transparent" htmlType='submit'>
                            <PaperAirplaneIcon className="w-5 h-5 text-textLight ml-[0.15rem] -rotate-45" />
                        </Button>
                    </div>
                </div>
            </form >
        </div >
    );
};

export default PostInput;