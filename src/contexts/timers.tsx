'use client';
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

// it also handles sound effects..
type TimeType = {
    timer: number;
    time: number;
    setTimer: (a: number) => void;
    start: () => void;
    pause: () => void;
    reset: () => void;
    running: boolean;
    done: boolean;
    type: string;
    playSfx: (sfx: string) => void;
}

const TimeContext = createContext<TimeType | null>(null);

let interval: ReturnType<typeof setInterval> | null = null;

export function TimeProvider({ children }: { children: React.ReactNode }) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const sfxRef = useRef<HTMLAudioElement>(null);

    const [done, setDone] = useState(false);
    const [running, setRunning] = useState(false);
    const [time, setTime] = useState(0);
    const [timer, setTimer] = useState(25 * 60);
    const [type, setType] = useState("task");
    const [sessionCount, setSessionCount] = useState(0);

    useEffect(() => {
        getFromLocal();
    }, [])

    useEffect(() => {
        if (done) {
            audioRef.current?.play();
            if (type === "task" && sessionCount < 3) {
                setType("break")
                setSessionCount(sessionCount + 1);
            } else if (type === "task" && sessionCount >= 3) {
                setType("long_break")
                setSessionCount(0);
            } else {
                setType("task")
            }
        }
    }, [done])

    useEffect(() => {
        switch (type) {
            case "task":
                setTimer(25 * 60);
                break
            case "break":
                setTimer(15 * 60);
                break
            case "long_break":
                setTimer(25 * 60);
                break
        }
    }, [done, type])

    function playSfx(sfx: string) {
        if (sfxRef.current) {
            switch (sfx) {
                case "pop":
                    sfxRef.current.src = "/audio/create.mp3";
                    sfxRef.current.currentTime = 0;
                    sfxRef.current.play();
                    break;
                case "unpop":
                    sfxRef.current.src = "/audio/delete.mp3";
                    sfxRef.current.currentTime = 0;
                    sfxRef.current.play();
                    break;
            }
        }
    }
    function getFromLocal() {
        const data = localStorage.getItem("pomodoro_data");
        if (data) {
            const dataParsed = JSON.parse(data);
            if (dataParsed.time && dataParsed.timer) {
                setTime(dataParsed.time);
                setTimer(dataParsed.timer);
            }
            setSessionCount(dataParsed.sessionCount);
            setType(dataParsed.type);
            setDone(dataParsed.done);
            setRunning(dataParsed.running);

            if (dataParsed.running && !dataParsed.done) {
                interval = setInterval(() => {
                    setTime(prevTime => {
                        if (prevTime + 1 >= timer) {
                            //don't replace with pause() in the future, look properly!
                            setDone(true);
                            clearInterval(interval!);
                            interval = null;
                            setRunning(false);

                            return timer;
                        }
                        localBackup(prevTime + 1);
                        return prevTime + 1;
                    })
                }, 1000);
            }
        }
    }
    function localBackup(t: number) {
        console.log("took time backup", t);
        localStorage.setItem("pomodoro_data", JSON.stringify(
            {
                time: t,
                timer: timer,
                sessionCount: sessionCount,
                type: type,
                done: done,
                running: running
            }
        ))
    }
    function start() {
        if (done) reset();
        if (running) return;
        if (interval) clearInterval(interval);
        setRunning(true);
        setDone(false);

        interval = setInterval(() => {
            setTime(prevTime => {
                if (prevTime + 1 >= timer) {
                    //don't replace with pause() in the future, look properly!
                    setDone(true);
                    clearInterval(interval!);
                    interval = null;
                    setRunning(false);
                    return timer;
                }
                localBackup(prevTime + 1);
                return prevTime + 1;
            })
        }, 1000);
    }

    function pause() {
        if (!running) return;
        setRunning(false);
        if (!interval) return;

        clearInterval(interval);
        interval = null;
    }

    function reset() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
        setTime(0);
        setRunning(false);
        setDone(false);
        if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current.currentTime = 0;
        }
    }


    return (
        <TimeContext.Provider value={
            {
                time,
                setTimer,
                start,
                pause,
                reset, running, done, timer, type,
                playSfx,
            }
        }>

            <audio hidden src={"/audio/alarm.wav"} ref={audioRef} />
            <audio hidden src={"/audio/delete.mp3"} ref={sfxRef} />

            {children}
        </TimeContext.Provider >
    )
}


export function useTime() {
    const context = useContext(TimeContext);
    if (!context) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
}



