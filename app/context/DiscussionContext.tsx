"use client"

import { message } from "antd";
import { createContext, useState } from "react";
import { DiscussionTab } from "../types/entities";

export const DiscussionContext = createContext<{
    selectedCDiscussion: DiscussionTab | null,
    setSelectedDiscussion: (conversation: DiscussionTab | null) => void,
}>({
    selectedCDiscussion: null,
    setSelectedDiscussion: (conversation: DiscussionTab | null) => { },
});

const DiscussionProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedCDiscussion, setSelectedDiscussion] = useState<DiscussionTab | null>(null);

    return (
        <DiscussionContext.Provider value={{ selectedCDiscussion, setSelectedDiscussion }}>
            {children}
        </DiscussionContext.Provider>
    )
}

export default DiscussionProvider;