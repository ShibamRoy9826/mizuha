'use client';
import React, { createContext, useContext, useRef, useState, useEffect } from "react";
import { songItem } from "@/utils/type";
import { station } from "@/utils/type";
import { getStations } from "@/utils/chillhopUtils";


type playerContextType = {
    playing: boolean;
    volume: number;
    currSongId: number;
    currSong: songItem | undefined;
    stations: station[];
    currStation: station | undefined;
    setCurrStation: React.Dispatch<React.SetStateAction<station | undefined>>;
    togglePlayback: (a: boolean) => void;
    setVolume: React.Dispatch<React.SetStateAction<number>>;
    setCurrSongId: React.Dispatch<React.SetStateAction<number>>;
    setCurrSong: React.Dispatch<React.SetStateAction<songItem | undefined>>;

}
const PlayerContext = createContext<playerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [queue, setQueue] = useState<songItem[]>([]);
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0);
    const [currSongId, setCurrSongId] = useState(10000);
    const [stations, setStations] = useState<station[]>([]);

    const [currStation, setCurrStation] = useState<station>();

    const [currSong, setCurrSong] = useState<songItem>()

    function togglePlayback(a: boolean) {
        if (!audioRef.current) return;
        setPlaying(a);
    }

    function playNewSong(url: string) {
        if (!audioRef.current) return;
        audioRef.current.src = url;
        audioRef.current.play().catch(e => console.log("Playback failed, ", e));
    }

    useEffect(() => {
        getStations().then((d) => setStations(d.stations));
    }, []);

    return (
        <PlayerContext.Provider value={
            {
                playing, volume, togglePlayback, setVolume, currStation, setCurrStation,
                setCurrSong, setCurrSongId, currSong, currSongId, stations
            }
        }>
            <audio
                ref={audioRef}
                className="hidden"
            />
            {children}
        </PlayerContext.Provider>
    )
}


export function usePlayer() {
    const context = useContext(PlayerContext);
    if (!context) {
        throw new Error("usePlayer must be used within a PlayerProvider");
    }
    return context;
}