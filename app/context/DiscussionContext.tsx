"use client"

import { message } from "antd";
import { createContext, useState } from "react";
import { DiscussionTab } from "../types/entities";

export const DiscussionContext = createContext<{
    selectedCDiscussion: DiscussionTab | null,
    setSelectedDiscussion: (conversation: DiscussionTab | null) => void,
    isEditingGroup: boolean,
    setIsEditingGroup: (isEditingGroup: boolean) => void
}>({
    selectedCDiscussion: null,
    setSelectedDiscussion: (conversation: DiscussionTab | null) => { },
    isEditingGroup: false,
    setIsEditingGroup: (isEditingGroup: boolean) => { }
});

const DiscussionProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedCDiscussion, setSelectedDiscussion] = useState<DiscussionTab | null>(null);
    const [isEditingGroup, setIsEditingGroup] = useState<boolean>(false)


    return (
        <DiscussionContext.Provider value={{ selectedCDiscussion, setSelectedDiscussion, isEditingGroup, setIsEditingGroup }}>
            {children}
        </DiscussionContext.Provider>
    )
}

export default DiscussionProvider;