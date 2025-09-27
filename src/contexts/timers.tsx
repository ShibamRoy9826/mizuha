'use client';
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

type TimeType = {
    timer: number;
    time: number;
    setTimer: (a: number) => void,
    start: () => void;
    pause: () => void;
    reset: () => void;
    running: boolean;
    done: boolean;
    type: string;
}

const TimeContext = createContext<TimeType | null>(null);

let interval: ReturnType<typeof setInterval> | null = null;

export function TimeProvider({ children }: { children: React.ReactNode }) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [done, setDone] = useState(false);
    const [running, setRunning] = useState(false);
    const [time, setTime] = useState(0);
    const [timer, setTimer] = useState(25 * 60);
    const [type, setType] = useState("task");
    const [sessionCount, setSessionCount] = useState(0);

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

    function start() {
        if (done) reset();
        if (running) return;
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
                reset, running, done, timer, type
            }
        }>

            <audio src={"/audio/alarm.wav"} ref={audioRef} />
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



