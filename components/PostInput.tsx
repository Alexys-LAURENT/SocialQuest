import React from 'react';
import { Button } from 'antd';
import { DocumentIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { createBrowserClient } from '@supabase/ssr'

const PostInput = () => {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    function handleChangeContent(e: any) {
        const CharCountContenuNewPost = document.getElementsByClassName('CharCountContenuNewPost');
        const CharCountContenuNewPostWrapper = document.getElementsByClassName('CharCountContenuNewPostWrapper');
        if (CharCountContenuNewPost) {
            for (let i = 0; i < CharCountContenuNewPost.length; i++) {
                CharCountContenuNewPost[i].innerHTML = e.target.value.length.toString();
            }
        }
        if (CharCountContenuNewPostWrapper) {
            if (e.target.value.length > 500) {
                for (let i = 0; i < CharCountContenuNewPostWrapper.length; i++) {
                    CharCountContenuNewPostWrapper[i].classList.add('!text-red-500');
                }
            } else {
                for (let i = 0; i < CharCountContenuNewPostWrapper.length; i++) {
                    CharCountContenuNewPostWrapper[i].classList.remove('!text-red-500');
                }
            }
        }
    }

    function handleChangeTitle(e: any) {
        const CharCountTitleNewPost = document.getElementsByClassName('CharCountTitleNewPost');
        const CharCountTitleNewPostWrapper = document.getElementsByClassName('CharCountTitleNewPostWrapper');
        if (CharCountTitleNewPost) {
            for (let i = 0; i < CharCountTitleNewPost.length; i++) {
                CharCountTitleNewPost[i].innerHTML = e.target.value.length.toString();
            }
        }
        if (CharCountTitleNewPostWrapper) {
            if (e.target.value.length > 20) {
                for (let i = 0; i < CharCountTitleNewPostWrapper.length; i++) {
                    CharCountTitleNewPostWrapper[i].classList.add('!text-red-500');
                }
            } else {
                for (let i = 0; i < CharCountTitleNewPostWrapper.length; i++) {
                    CharCountTitleNewPostWrapper[i].classList.remove('!text-red-500');
                }
            }
        }
    }

    function sendPost(e: any) {
        e.preventDefault();
        const title = document.getElementById('PostInputTitle') as HTMLInputElement;
        const content = document.getElementById('PostInputContent') as HTMLInputElement;
        if (title.value.length > 20 || content.value.length > 500) {
            return;
        }
        console.log(title.value);
        console.log(content.value);
    }


    return (
        <div className="w-full h-full flex flex-col min-h-[10rem]">
            <form id='NewPostinput' onSubmit={(e) => sendPost(e)}>
                <div className="relative flex flex-col h-full w-full bg-[#11100e] rounded-t-md py-2 px-6 gap-1">
                    <input type="text" placeholder="Titre..." id="PostInputTitle" className="w-full h-[30px] bg-[#11100e] rounded-t-md text-2xl placeholder:text-[#3b3a39]" maxLength={20} onChange={(e) => handleChangeTitle(e)} />
                    <textarea name="" id="PostInputContent" className="w-full min-h-[80px] max-h-[350px] bg-[#11100e] mb-2 text-lg placeholder:text-[#3b3a39]" placeholder="Contenu..." maxLength={500} onChange={(e) => handleChangeContent(e)}>

                    </textarea>
                    <div className="CharCountTitleNewPostWrapper absolute top-7 right-2 text-[10px] text-[#7c7c7c]">
                        <span className="CharCountTitleNewPost">0</span>/20
                    </div>
                    <div className="CharCountContenuNewPostWrapper absolute bottom-[0.15rem] right-2 text-[10px] text-[#7c7c7c]">
                        <span className="CharCountContenuNewPost">0</span>/500
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