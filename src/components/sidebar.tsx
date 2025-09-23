"use client";
import Button from "@/components/inputs/button"
import { motion } from 'motion/react';
import { useState } from "react";
import { useSettings } from "@/contexts/settingsData";
import { ChevronRight, ChevronLeft, Settings, ClipboardList, Clock } from "lucide-react";
import { useModal } from "@/contexts/modals";
import SettingsModal from "./modals/settingsModal";
import JournalModal from "./modals/journalModal";

export default function SideBar() {
    const { settings } = useSettings();
    const [isSidebarVisible, setVisible] = useState(true);
    const { setContent, setIsVisible, isVisible, setDirection, setTitle } = useModal();

    function toggleSettingsModal() {
        setTitle("Settings")
        setDirection("left");
        setContent(<SettingsModal />);
        setIsVisible(!isVisible);
    }

    function toggleJournalModal() {
        setTitle("Journal")
        setDirection("left");
        setContent(<JournalModal />);
        setIsVisible(!isVisible);
    }


    return (
        <>
            <motion.div
                initial={(settings.sidebarPos === "left") ? { left: -100 } : { right: -100 }}
                animate={(settings.sidebarPos === "left") ? { left: isSidebarVisible ? 10 : -100 } : { right: isSidebarVisible ? 10 : -100 }}
                transition={{ duration: settings.animTime, type: "spring" }}
                className="p-4 flex flex-col absolute glass h-auto w-auto top-[50%] translate-y-[-50%]">
                <Button
                    icon={
                        <Settings size={20} />
                    }
                    func={() => { toggleSettingsModal() }}
                    moreClasses="my-1"
                />


                <Button
                    icon={
                        <ClipboardList size={20} />
                    }
                    func={() => { toggleJournalModal() }}
                    moreClasses="my-1"
                />
                <Button
                    icon={
                        <Clock size={20} />
                    }
                    func={() => { }}
                    moreClasses="my-1"
                />

                <Button
                    icon={
                        (settings.sidebarPos === "left") ?
                            <ChevronLeft
                                size={20}
                            /> :
                            <ChevronRight
                                size={20}
                            />
                    }
                    func={() => { setVisible(!isSidebarVisible) }}
                    moreClasses="my-1"
                />


            </motion.div>

            <motion.div
                initial={(settings.sidebarPos === "left") ? { left: -100 } : { right: -100 }}
                animate={(settings.sidebarPos === "left") ? { left: isSidebarVisible ? -100 : 0 } : { right: isSidebarVisible ? 10 : -100 }}
                transition={{ duration: settings.animTime, type: "spring" }}
                className="pad absolute top-[50%] translate-y-[-50%]"
            >
                <Button
                    icon={
                        (settings.sidebarPos === "left") ?
                            <ChevronRight
                                size={20}
                            /> :
                            <ChevronLeft
                                size={20}
                            />
                    }
                    func={() => { setVisible(!isSidebarVisible) }}
                />
            </motion.div>
        </>
    )
}