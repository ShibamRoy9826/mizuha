"use client";
import Button from "@/components/inputs/button"
import { motion } from 'motion/react';
import { useState } from "react";
import { useSettings } from "@/contexts/settingsData";
import { ChevronRight, ChevronLeft, Settings, ClipboardList, Clock } from "lucide-react";
import { useModal } from "@/contexts/modals";
import SettingsModal from "./modals/settingsModal";
import JournalModal from "./modals/journalModal";
import TodoList from "./modals/todo";

export default function SideBar() {
    const { settings } = useSettings();
    const [isSidebarVisible, setVisible] = useState(true);
    const { setContent, setIsVisible, isVisible, setDirection, setTitle } = useModal();

    function toggleModal(title: string, content: React.ReactNode) {
        setTitle(title);
        setDirection(settings.sidebarPos);
        setContent(content);
        setIsVisible(!isVisible);
    }

    return (
        <>
            <motion.div
                initial={(settings.sidebarPos === "left") ? { left: "-10vw" } : { left: "110vw" }}
                animate={(settings.sidebarPos === "left") ? { left: isSidebarVisible ? 10 : "-10vw" } : { left: isSidebarVisible ? "95vw" : "110vw" }}
                transition={{ duration: settings.animTime, type: "spring" }}
                className="p-4 flex flex-col absolute glass h-auto w-fit top-[50%] translate-y-[-50%]">
                <Button
                    icon={
                        <Settings size={20} />
                    }
                    func={() => { toggleModal("Settings", <SettingsModal />) }}
                    moreClasses="my-1"
                />


                <Button
                    icon={
                        <ClipboardList size={20} />
                    }
                    func={() => { toggleModal("Journal", <JournalModal />) }}
                    moreClasses="my-1"
                />
                <Button
                    icon={
                        <Clock size={20} />
                    }
                    func={() => { toggleModal("To-do/Pomodoro", <TodoList />) }}
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
                initial={(settings.sidebarPos === "left") ? { left: "-10vw" } : { left: "110vw" }}
                animate={(settings.sidebarPos === "left") ? { left: isSidebarVisible ? "-10vw" : 0 } : { left: isSidebarVisible ? "110vw" : "95vw" }}
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