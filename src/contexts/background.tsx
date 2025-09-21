'use client';
import React, { createContext, useContext, useEffect, useState } from "react";


type bgContextType = {
    setCurrBg: React.Dispatch<React.SetStateAction<string | undefined>>;
    currBg: string | undefined;
    bgList: string[];
}
const BgContext = createContext<bgContextType | undefined>(undefined);

export function BgProvider({ children }: { children: React.ReactNode }) {
    const [bgList, setBgList] = useState<string[]>([]);
    const [currBg, setCurrBg] = useState<string | undefined>(undefined);

    async function loadBackgrounds() {
        const res = await fetch("/api/backgrounds");
        const list: string[] = await res.json();
        setBgList(list);
        console.log(list);

        const background = localStorage.getItem("background");

        if (background) {
            setCurrBg(background);
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