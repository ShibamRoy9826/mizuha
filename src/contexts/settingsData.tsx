'use client';
import React, { createContext, useContext, useEffect, useState } from "react";
import { settingsType } from "@/utils/type";

const defaultSettings = {
    animTime: 0.5,
    windowSpeed: 0.3,
    background: 'rgba(0,0,0,0.1)',
    foreground: 'white',
    backgroundLighter: 'rgba(255,255,255,0.1)',
    backgroundDarker: 'rgba(0,0,0,0.5)',
    sidebarPos: "left",
    clockEnabled: true,
    searchEnabled: true,
    searchEngine: "google"
}

type settingsContext = {
    setSettings: (s: settingsType) => void;
    settings: settingsType
}
const SettingsContext = createContext<settingsContext | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettingsVar] = useState<settingsType>(defaultSettings)

    useEffect(() => {
        const data = localStorage.getItem('settings');
        if (data) {
            setSettingsVar(JSON.parse(data));
        }
    }, [])

    function setSettings(s: settingsType) {
        setSettingsVar(s);
        localStorage.setItem('settings', JSON.stringify(s));
    }

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