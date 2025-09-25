'use client';
import React, { createContext, useContext, useRef, useState, useEffect } from "react";
import { songItem } from "@/utils/type";
import { station } from "@/utils/type";
import { getStations } from "@/utils/chillhopUtils";
import { getStationSongs } from "@/utils/chillhopUtils";
import CurrentSong from "@/components/currentSong";


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
    const qIndex = useRef(0);

    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [currSongId, setCurrSongId] = useState(10000);
    const [stations, setStations] = useState<station[]>([]);

    const [currStation, setCurrStation] = useState<station>();

    const [currSong, setCurrSong] = useState<songItem>()

    function togglePlayback(a: boolean) {
        if (!audioRef.current) return;
        console.log("Toggle playing called, ", a);
        setPlaying(a);
    }

    function handleSongEnd() {
        if (queue.length !== 0) {
            qIndex.current += 1
            setCurrSong(queue[qIndex.current]);
        }
    }

    useEffect(() => {
        if (!audioRef.current) return;

        if (!playing) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log(e));
        }
    }, [playing])

    useEffect(() => {
        if (!audioRef.current) return;
        audioRef.current.volume = volume;
    }, [volume])

    useEffect(() => {
        getStations().then((d) => { setStations(d.stations); setCurrStation(d.stations[0]) });
    }, []);

    useEffect(() => {
        console.log("Queue length", queue.length);
        console.log("Queue: ", queue);
        if (queue.length !== 0) {
            setCurrSong(queue[qIndex.current]);
        }
    }, [queue])

    useEffect(() => {
        async function getSongs() {
            if (currStation) {
                const data = await getStationSongs(currStation.id);
                setQueue(data);
            }
        }
        getSongs();
    }, [currStation])

    return (
        <PlayerContext.Provider value={
            {
                playing, volume, togglePlayback, setVolume, currStation, setCurrStation,
                setCurrSong, setCurrSongId, currSong, currSongId, stations
            }
        }>
            <audio
                ref={audioRef}
                src={currSong?.endpoint}
                className="hidden"
                onEnded={handleSongEnd}
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