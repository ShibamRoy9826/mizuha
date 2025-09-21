"use client";
import { useBg } from "@/contexts/background"

export default function Background() {
    const { currBg } = useBg()

    return (
        <video
            key={currBg}
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover -z-1"
        >
            <source src={currBg} type="video/mp4" />
        </video>


    )
}