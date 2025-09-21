"use client";
import { useSettings } from '@/contexts/settingsData';
import { motion } from 'motion/react'

interface Props {
    icon?: React.ReactNode;
    func: () => void;
    moreClasses?: string;
    text?: string;
}

export default function Button({ text, icon, func, moreClasses }: Props) {
    const { settings } = useSettings();
    return (
        <motion.div
            whileHover={{ scale: 1.1, backgroundColor: settings.backgroundLighter }}
            className={moreClasses + " cursor-pointer button p-2 inline-flex items-center justify-center"} onClick={func}>
            {icon}
            <h1>{text}</h1>
        </motion.div>
    )

}