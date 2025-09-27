import { useState, useEffect } from "react";

export default function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, [])

    const hour = ((time.getHours() % 12)).toString().padStart(2, "0");
    const minute = time.getMinutes().toString().padStart(2, "0");
    const ampm = time.getHours() >= 12 ? "PM" : "AM"

    return (
        <div className={`flex flex-col absolute top-[25vh] left-[50%] translate-x-[-50%] items-center z-2 `}>
            <h1 className="text-7xl bold text-[var(--fg)]">{hour}:{minute} {ampm}</h1>
            <p className="text-[var(--fg2)]">{time.getDate()} {time.toLocaleString("default", { month: "long" })} {time.getFullYear()}</p>
        </div>
    )
}