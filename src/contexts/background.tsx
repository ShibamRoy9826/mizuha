'use client';
import React, { useRef, createContext, useContext, useEffect, useState } from "react";
import { localBg } from "@/utils/type";


type bgContextType = {
    setCurrBg: (bg: localBg | undefined) => void;
    addBgList: (bgs: localBg[]) => void;
    currBg: localBg | undefined;
    bgList: localBg[];
}

const BgContext = createContext<bgContextType | undefined>(undefined);

export function BgProvider({ children }: { children: React.ReactNode }) {
    const [bgList, setBgList] = useState<localBg[]>([]);
    const [currBg, setCBg] = useState<localBg | undefined>(undefined);
    const setDefault = useRef(false);

    function setCurrBg(bg: localBg | undefined) {
        setCBg(bg);

        if (bg) {
            localStorage.setItem("background", JSON.stringify(bg));
        }
    }
    async function loadBackgrounds() {
        const background = localStorage.getItem("background");

        if (background) {
            setCBg(JSON.parse(background));
        } else {
            setDefault.current = true;
        }
    }

    function addBgList(bgs: localBg[]) {
        const data = [...bgList, ...bgs]
        setBgList(data)
        if (setDefault.current) {
            setCurrBg(data[Math.floor(Math.random() * data.length)])
            setDefault.current = false;
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
                addBgList,
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