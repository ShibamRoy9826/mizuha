import { useSettings } from "@/contexts/settingsData";
import { Trash } from "lucide-react";
import { motion } from 'motion/react';
import { note } from "@/utils/type";
import { useHydratedNotes, useNotesContext } from "@/contexts/notes";

interface Props {
    text: note;
    onClick: () => void;
    index: number
}

export default function NoteMinimized({ index, text, onClick }: Props) {
    useHydratedNotes();
    const { settings } = useSettings();
    const { removeItem } = useNotesContext();
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
            onClick={onClick}
            whileHover={{ backgroundColor: settings.backgroundLighter }}
            transition={{ duration: settings.animTime, type: "spring" }}
            className=" cursor-pointer min-h-10 rounded-xl my-[5px] border-[var(--bg-lighter)] bg-[var(--bg-darker)] w-full flex flex-row items-center justify-center p-2">
            <h1 className="max-w-[25vw] text-center w-full mx-2">{text.title}</h1>
            <div className="z-3 cursor-pointer ml-auto hover:bg-[var(--bg-darker)] rounded-full p-2 duration-650"
                onClick={(e) => { e.stopPropagation(), removeItem(index) }}>
                <Trash size={20} />
            </div>
        </motion.div>
    );

}