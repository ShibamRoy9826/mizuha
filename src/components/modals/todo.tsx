"use client";

import Task from "../containers/task";
import { Pause, Play, Plus, TimerReset } from "lucide-react"
import Button from "../inputs/button"
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import { useTime } from "@/contexts/timers";

export default function TodoList() {
    const [list, setList] = useState<string[]>([]);
    const { time, running, start, pause, reset, type, timer } = useTime();

    const hours = Math.floor(time / 3600).toString().padStart(2, "0");
    const minutes = Math.floor(time / 60).toString().padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");


    const hoursTimer = Math.floor(timer / 3600).toString().padStart(2, "0");
    const minutesTimer = Math.floor(timer / 60).toString().padStart(2, "0");
    const secondsTimer = (timer % 60).toString().padStart(2, "0");

    const taskInputRef = useRef<HTMLInputElement>(null);
    const isMounted = useRef(false);

    function markComplete(index: number) {
        setList(prev => prev.filter((_, ind) => ind !== index));
    }

    function addTask() {
        const val = taskInputRef.current?.value;
        if (val) {
            setList([...list, val]);
        }
    }
    function onKeydown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            addTask();
        }
    }

    useEffect(() => {
        const listPrev = localStorage.getItem("tasks");
        if (listPrev) {
            setList(JSON.parse(listPrev));
        }
    }, [])

    useEffect(() => {
        if (isMounted.current) {
            localStorage.setItem("tasks", JSON.stringify(list))
        } else {
            isMounted.current = true;
        }
    }, [list])


    return (
        <div className="p-3">
            <h1 className="text-2xl text-center mb-4 text-[var(--fg2)]">
                {type === "task" ?
                    "Time to start working!" :
                    type === "break" ?
                        "Break time!" : "Long break time!"}</h1>

            <h1 className="text-4xl text-center">{hours}:{minutes}:{seconds}</h1>
            <h1 className="text-md text-[var(--fg2)] text-center">{hoursTimer}:{minutesTimer}:{secondsTimer}</h1>
            <div className="m-2 flex gap-4 items-center justify-center">
                <Button
                    icon={
                        running ?
                            <Pause size={20} /> :
                            <Play size={20} />
                    }
                    func={running ? pause : start}
                />
                <Button
                    icon={
                        <TimerReset size={20} />
                    }
                    func={reset}
                />

            </div>
            <div className="flex items-center justify-center gap-4 my-4">
                <input onKeyDown={onKeydown} ref={taskInputRef} type="text" placeholder="Any tasks left to do?" className="settingsField p-4 w-full h-[3rem]" />
                <Button
                    icon={
                        <Plus />
                    }
                    func={addTask}
                    text=""
                />

            </div>
            <div className="flex flex-col items-center p-4 bg-[var(--bg-darker)] rounded-xl row-span-3 col-span-2 overflow-y-scroll ">
                <AnimatePresence>
                    {

                        (list.length === 0) ?
                            <h1 className="text-center">
                                No tasks yet, get some work done!
                            </h1>
                            :
                            list.map((task, ind) => (
                                <Task text={task} markComplete={() => { markComplete(ind) }} key={ind} />
                            ))
                    }
                </AnimatePresence>
            </div>

        </div>
    )

}
