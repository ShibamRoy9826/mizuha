'use client';
import React, { createContext, useContext, useEffect, useState } from "react";
import { settingsType } from "@/utils/type";

const defaultSettings = {
    animTime: 0.5,
    background: 'rgba(0,0,0,0.1)',
    foreground: 'white',
    backgroundLighter: 'rgba(255,255,255,0.1)',
    sidebarPos: "left"
}

type settingsContext = {
    setSettings: React.Dispatch<React.SetStateAction<settingsType>>;
    settings: settingsType
}
const SettingsContext = createContext<settingsContext | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<settingsType>(defaultSettings)

    useEffect(() => {
        const data = localStorage.getItem('settings');
        if (data) {
            setSettings(JSON.parse(data));
        }
    }, [])

    return (
        <SettingsContext.Provider value={
            {
                setSettings,
                settings
            }
        }>
            {children}
        </SettingsContext.Provider>
    )
}


export function useSettings() {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
}