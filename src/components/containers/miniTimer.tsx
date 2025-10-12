import { useSettings } from "@/contexts/settingsData";
import { motion, AnimatePresence } from "motion/react";

interface Props {
    time: number,
    timerTime: number,
    isVisible: boolean
}


export default function MiniTimer({ isVisible, time, timerTime }: Props) {
    const hours = Math.floor(time / 3600).toString().padStart(2, "0");
    const minutes = Math.floor(time / 60).toString().padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");


    const hoursTimer = Math.floor(timerTime / 3600).toString().padStart(2, "0");
    const minutesTimer = Math.floor(timerTime / 60).toString().padStart(2, "0");
    const secondsTimer = (timerTime % 60).toString().padStart(2, "0");
    const { settings } = useSettings()

    return (
        <AnimatePresence>
            {
                (isVisible && settings.showMiniTimer && time !== 0) &&
                <motion.div
                    className="glass p-4 rounded-xl absolute top-8 right-8 flex flex-col justify-center items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: settings.animTime }}
                    exit={{ opacity: 0 }}
                >
                    <h1 className="text-4xl text-center">{hours}:{minutes}:{seconds}</h1>
                    <h1 className="text-md text-[var(--fg2)] text-center">{hoursTimer}:{minutesTimer}:{secondsTimer}</h1>
                </motion.div>

            }
        </AnimatePresence>
    )
}