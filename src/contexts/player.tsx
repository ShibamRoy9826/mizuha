'use client';
import React, { createContext, useContext, useRef, useState, useEffect } from "react";
import { songItem } from "@/utils/type";
import { station } from "@/utils/type";
import { getStations } from "@/utils/chillhopUtils";
import { getStationSongs } from "@/utils/chillhopUtils";


type playerContextType = {
    playing: boolean;
    volume: number;
    currSong: songItem | undefined;
    stations: station[];
    currStation: station | undefined;
    setCurrStation: React.Dispatch<React.SetStateAction<station | undefined>>;
    togglePlayback: (a: boolean) => void;
    setVolume: React.Dispatch<React.SetStateAction<number>>;
    setCurrSong: React.Dispatch<React.SetStateAction<songItem | undefined>>;

}
const PlayerContext = createContext<playerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
    // Pls don't kill me, ik its a mess, that's the reason for these comments

    // Variables ----------------------------------------------------
    const audioRef = useRef<HTMLAudioElement>(null);
    const [queue, setQueue] = useState<songItem[]>([]);
    const qIndex = useRef(0);

    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(1);

    const [stations, setStations] = useState<station[]>([]);
    const [currStation, setCurrStation] = useState<station>();

    const [currSong, setCurrSong] = useState<songItem>()

    // Use effect hooks- ---------------------------------------------------
    // playback state hook
    useEffect(() => {
        if (!audioRef.current) return;
        // cause it updates on next render
        if (playing) {
            audioRef.current.play().catch(e => console.log(e));
        } else {
            audioRef.current.pause();
        }
    }, [playing])

    //volume hook
    useEffect(() => {
        if (!audioRef.current) return;
        audioRef.current.volume = volume;
    }, [volume])

    //Get stations hook
    useEffect(() => {
        getStations().then((d) => {
            setStations(d.stations);
            const savedStation = localStorage.getItem("station")
            if (savedStation) {
                setCurrStation(JSON.parse(savedStation));
            } else {
                setCurrStation(d.stations[0]);
            }
        });
    }, []);

    // sets song whenn the queue changes
    useEffect(() => {
        if (queue.length > 0) {
            setSong(qIndex.current);
        }
    }, [queue])

    // get songs when current station station changes
    useEffect(() => {
        if (!currStation) return;
        getSongs();
    }, [currStation])

    useEffect(() => {
        if (!audioRef.current || !currSong) return;
        if (audioRef.current.src !== currSong.endpoint) {
            audioRef.current.src = currSong.endpoint;
            audioRef.current.play().catch(e => console.log(e));
        }
    }, [currSong])


    // Functions----------------------------------------------------------------
    function togglePlayback(a: boolean) {
        setPlaying(a);
    }

    function handleSongEnd() {
        qIndex.current += 1;
        setSong(qIndex.current);

    }

    async function setSong(index: number) {
        console.log("New song set, index", index)
        if (qIndex.current >= queue.length) {
            await getSongs();
            return;
        }
        const song = queue[index];
        const url = song.endpoint;
        setCurrSong(song);
        qIndex.current = index;
    }

    async function getSongs() {
        if (currStation) {
            const data = await getStationSongs(currStation.id);
            qIndex.current = 0;
            setQueue(data);
            localStorage.setItem("station", JSON.stringify(currStation));
        }
    }

    async function startPlaying() {
        if (audioRef.current && playing) {
            audioRef.current.play()
        }
    }

    return (
        <PlayerContext.Provider value={
            {
                playing, volume, togglePlayback, setVolume, currStation, setCurrStation,
                setCurrSong, currSong, stations
            }
        }>
            <audio
                ref={audioRef}
                src={currSong?.endpoint}
                className="hidden"
                preload="auto"
                onEnded={handleSongEnd}
                onError={handleSongEnd}
                onCanPlay={startPlaying}
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