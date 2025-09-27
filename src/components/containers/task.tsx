import { useSettings } from "@/contexts/settingsData";
import { Square } from "lucide-react";
import { AnimatePresence, motion } from 'motion/react';

interface Props {
    text: string;
    markComplete: () => void;
}

export default function Task({ text, markComplete }: Props) {
    const { settings } = useSettings();
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0, }}
            animate={{
                scale: 1,
                opacity: 1
            }}
            exit={{
                scale: 0,
                opacity: 0
            }}
            transition={{ duration: settings.animTime, type: "spring" }}
            className="min-h-10 rounded-xl my-[5px] border-[var(--lighter)] bg-[var(--bg-darker)] w-full flex items-center justify-center p-2">
            <h1 className="max-w-[25vw] text-center w-full mx-2">{text}</h1>
            <div className="cursor-pointer" onClick={markComplete}>
                <Square />
            </div>
        </motion.div>
    );
}