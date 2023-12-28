"use client"

import { message } from "antd";
import { createContext } from "react";

export const ToasterContext = createContext({
    success: (message: string) => { },
    error: (message: string) => { },
    warning: (message: string) => { },
    info: (message: string) => { },
});

const ToasterProvider = ({ children }: { children: React.ReactNode }) => {
    const [messageApi, contextHolder] = message.useMessage();

    const success = (message: string) => {
        messageApi.open({
            type: 'success',
            content: message,
        });
    };

    const error = (message: string) => {
        messageApi.open({
            type: 'error',
            content: message,
        });
    };

    const warning = (message: string) => {
        messageApi.open({
            type: 'warning',
            content: message,
        });
    };

    const info = (message: string) => {
        messageApi.info(message);
    };

    return (
        <ToasterContext.Provider value={{ success, error, warning, info }}>
            {contextHolder}
            {children}
        </ToasterContext.Provider>
    )
}

export default ToasterProvider;