"use client"

import { createContext, useState, useContext } from "react";
import { DiscussionTab, Message } from "../types/entities";
import { createClient } from "@/utils/supabase/client";
import { ToasterContext } from "./ToasterContext";
import { useRouter } from "next/navigation";

export const DiscussionContext = createContext<{
    messages: Message[] | null,
    setMessages: (messages: Message[] | null) => void,
    selectedCDiscussion: DiscussionTab | null,
    setSelectedDiscussion: (conversation: DiscussionTab | null) => void,
    isEditingGroup: boolean,
    setIsEditingGroup: (isEditingGroup: boolean) => void,
    componentReloaded: boolean,
    setComponentReloaded: (componentReloaded: boolean) => void,
    addUsersToSelectedDiscussion: (ids: string[]) => Promise<void>,
    removeUserFromSelectedDiscussion: (id: string) => Promise<void>,
    updateCurrentSelectedDiscussion: (nom: string) => Promise<void>
}>({
    messages: null,
    setMessages: (messages: Message[] | null) => { },
    selectedCDiscussion: null,
    setSelectedDiscussion: (conversation: DiscussionTab | null) => { },
    isEditingGroup: false,
    setIsEditingGroup: (isEditingGroup: boolean) => { },
    componentReloaded: true,
    setComponentReloaded: (componentReloaded: boolean) => { },
    addUsersToSelectedDiscussion: (ids: string[]) => Promise.resolve(),
    removeUserFromSelectedDiscussion: (id: string) => Promise.resolve(),
    updateCurrentSelectedDiscussion: (nom: string) => Promise.resolve()
});

const DiscussionProvider = ({ children }: { children: React.ReactNode }) => {
    const [messages, setMessages] = useState<Message[] | null>(null)
    const [selectedCDiscussion, setSelectedDiscussion] = useState<DiscussionTab | null>(null);
    const [isEditingGroup, setIsEditingGroup] = useState<boolean>(false)
    const [componentReloaded, setComponentReloaded] = useState<boolean>(true)
    const { success, error: toasterError } = useContext(ToasterContext)
    const router = useRouter()
    const supabase = createClient()

    const addUsersToSelectedDiscussion = async (ids: string[]) => {
        await Promise.all(ids.map(async (id) => {
            const { error } = await supabase.from('discussions_users').insert({
                id_discussion: selectedCDiscussion!.id_discussion,
                id_user: id
            })
            if (error) {
                console.log(error)
                toasterError("Une erreur est survenue lors de l'ajout d'un utilisateur")
            }
        }))
        // update state
        const newUsers = await supabase.from('profiles').select('id_user, username, avatar_url').in('id_user', ids)
        setSelectedDiscussion({
            ...selectedCDiscussion!,
            profiles: [...selectedCDiscussion!.profiles, ...(newUsers.data || [])]
        })
        success("Utilisateur(s) ajouté(s) avec succès")
        router.refresh()
    }

    const removeUserFromSelectedDiscussion = async (id: string) => {
        const { error } = await supabase.from('discussions_users').delete().eq('id_user', id).eq('id_discussion', selectedCDiscussion!.id_discussion)
        if (error) {
            console.log(error)
            toasterError("Une erreur est survenue lors de la suppression d'un utilisateur")
        }
        // update state
        setSelectedDiscussion({
            ...selectedCDiscussion!,
            profiles: selectedCDiscussion!.profiles.filter(p => p.id_user !== id)
        })
        success("Utilisateur supprimé avec succès")
        router.refresh()
    }

    const updateCurrentSelectedDiscussion = async (nom: string) => {
        const { error } = await supabase.from('discussions').update({ nom }).eq('id_discussion', selectedCDiscussion!.id_discussion)
        if (error) {
            console.log(error)
            toasterError("Une erreur est survenue lors de la mise à jour du nom du groupe")
        }
        // update state
        setSelectedDiscussion({
            ...selectedCDiscussion!,
            nom
        })
        success("Nom du groupe mis à jour avec succès")
        router.refresh()
    }


    return (
        <DiscussionContext.Provider value={{ selectedCDiscussion, setSelectedDiscussion, isEditingGroup, setIsEditingGroup, addUsersToSelectedDiscussion, removeUserFromSelectedDiscussion, updateCurrentSelectedDiscussion, componentReloaded, setComponentReloaded, messages, setMessages }}>
            {children}
        </DiscussionContext.Provider>
    )
}

export default DiscussionProvider;