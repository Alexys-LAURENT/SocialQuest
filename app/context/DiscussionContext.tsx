"use client"

import { message } from "antd";
import { createContext, useState } from "react";

export const DiscussionContext = createContext({
    selectedCDiscussion: null,
    setSelectedDiscussion: (conversation: any) => { },
});

const DiscussionProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedCDiscussion, setSelectedDiscussion] = useState<any | null>(null);

    return (
        <DiscussionContext.Provider value={{ selectedCDiscussion, setSelectedDiscussion }}>
            {children}
        </DiscussionContext.Provider>
    )
}

export default DiscussionProvider;