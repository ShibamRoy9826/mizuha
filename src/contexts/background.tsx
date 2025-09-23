'use client';
import React, { createContext, useContext, useEffect, useState } from "react";


type bgContextType = {
    setCurrBg: (bg: string | undefined) => void;
    currBg: string | undefined;
    bgList: string[];
}
const BgContext = createContext<bgContextType | undefined>(undefined);

export function BgProvider({ children }: { children: React.ReactNode }) {
    const [bgList, setBgList] = useState<string[]>([]);
    const [currBg, setCBg] = useState<string | undefined>(undefined);

    function setCurrBg(bg: string | undefined) {
        setCBg(bg);
        if (bg) {
            localStorage.setItem("background", bg);
        }
    }
    async function loadBackgrounds() {
        const res = await fetch("/api/backgrounds");
        const list: string[] = await res.json();
        setBgList(list);
        console.log(list);

        const background = localStorage.getItem("background");

        if (background) {
            setCBg(background);
        } else {
            setCurrBg(list[0]);
        }

    }
    useEffect(() => {
        loadBackgrounds();
    }, [])


    return (
        <BgContext.Provider value={
            {
                bgList,
                setCurrBg,
                currBg
            }
        }>
            {children}
        </BgContext.Provider>
    )
}


export function useBg() {
    const context = useContext(BgContext);
    if (!context) {
        throw new Error("useUser must be used within a bgProvider");
    }
    return context;
}