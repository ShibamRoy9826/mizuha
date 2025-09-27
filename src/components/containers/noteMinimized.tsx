import { useSettings } from "@/contexts/settingsData";
import { EllipsisVertical, Square } from "lucide-react";
import { motion } from 'motion/react';
import { note } from "@/utils/type";

interface Props {
    text: note;
}

export default function NoteMinimized({ text }: Props) {
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
            className="min-h-10 rounded-xl my-[5px] border-[var(--lighter)] bg-[var(--bg-darker)] w-full flex flex-row items-center justify-center p-2">
            <h1 className="max-w-[25vw] text-center w-full mx-2">{text.title}</h1>
            <div className="cursor-pointer ml-auto" onClick={() => { }}>
                <EllipsisVertical size={20} />
            </div>
        </motion.div>
    );

}