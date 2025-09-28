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
        console.log("Queue", queue);
        if (queue.length > 0) {
            setSong(qIndex.current);
        }
    }, [queue])

    // get songs when current station station changes
    useEffect(() => {
        if (!currStation) return;
        getSongs();
        togglePlayback(true);
    }, [currStation])


    // Functions----------------------------------------------------------------
    function togglePlayback(a: boolean) {
        setPlaying(a);
    }

    function handleSongEnd() {
        qIndex.current += 1;
        setSong(qIndex.current);

    }
    // async function testUrl(url: string) {
    //     try {
    //         const req = await fetch(url, { method: "HEAD", mode: "no-cors" });
    //         console.log("probably valid url", req.status, req.ok);
    //         return req.status !== 404;
    //     } catch (e) {
    //         console.log("Invalid url", e);
    //         return false;
    //     }
    // }

    // async function getProxyUrl(songUrl: string) {
    //     const req = await fetch(`/api/proxy/${encodeURIComponent(songUrl)}`);
    //     const data = (await req.json()) as string;
    //     return data;
    // }

    async function setSong(index: number) {
        if (qIndex.current >= queue.length) {
            await getSongs();
            return;
        }
        console.log("Checking index: ", index, "queue", queue);
        const song = queue[index];
        const url = song.endpoint;

        // const works = await testUrl(url)

        // if (works) {
        setCurrSong(song);
        qIndex.current = index;
        console.log("It works!!");
        // } else {
        //     qIndex.current += 1;
        //     setSong(qIndex.current);
        //     console.log("That didn't work...", qIndex.current);
        // }
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