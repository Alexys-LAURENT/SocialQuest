import { useState, useContext } from 'react';
import { Button } from 'antd';
import { DocumentIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { createBrowserClient } from '@supabase/ssr'
import { Textarea } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { ToasterContext } from '@/app/context/ToasterContext';
const PostInput = () => {
    const router = useRouter();
    const { success } = useContext(ToasterContext);
    const limite = {
        titre: 200,
        contenu: 500
    }

    const [titre, setTitre] = useState<string>('')
    const [contenu, setContenu] = useState<string>('')

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

    function sendPost(e: any) {
        e.preventDefault();
        supabase.from('posts').insert([
            // iduser handled by supabase auth.uid()
            { titre: titre, contenu: contenu }
        ]).then(() => {
            setTitre('');
            setContenu('');
            router.refresh();
            success('Post envoyé !');
        })
    }


    return (
        <div className="w-full h-full flex flex-col min-h-[10rem]">
            <form id='NewPostinput' onSubmit={(e) => sendPost(e)} >
                <div className="relative flex flex-col h-full w-full bg-[#11100e] rounded-t-md py-2 px-6 gap-1">

                    {/* <input type="text" placeholder="Titre..." id="PostInputTitle" value={titre} className="w-full h-[30px] bg-[#11100e] rounded-t-md text-2xl placeholder:text-[#3b3a39]" maxLength={50} onChange={(e) => handleChangeTitle(e)} /> */}

                    <div className='relative'>
                        <Textarea aria-label='titre' id="PostInputTitle" minRows={1} maxRows={5} classNames={{ inputWrapper: "bg-transparent group-data-[focus=true]:bg-opacity-30 data-[hover=true]:bg-opacity-30 h-auto pb-5", input: "font-bold" }} value={titre} placeholder="Titre..." maxLength={limite.titre} onChange={(e) => handleChangeTitle(e)}>

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
            </form>
        </div>
    );
};

export default PostInput;