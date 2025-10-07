"use client";
import Button from "@/components/inputs/button"
import { motion } from 'motion/react';
import { AudioWaveform, ChevronDown, ChevronUp, Image, Pause, Play, Radio } from "lucide-react";
import { useState } from "react";
import { useSettings } from "@/contexts/settingsData";
import { useModal } from "@/contexts/modals";
import BgModal from "./modals/bgModal";
import StationModal from "./modals/stationModal";
import CurrentSong from "./currentSong";
import { usePlayer } from "@/contexts/player";
import VolumeSlider from "./dropdowns/volumeSlider";

export default function BottomBar() {
    const { settings } = useSettings();
    const [isBBVisible, setVisible] = useState(true);

    const { currTitle, setTitle, setContent, setIsVisible, isVisible, setDirection } = useModal();
    const { playing, currSong, togglePlayback } = usePlayer();

    function toggleModal(title: string, content: React.ReactNode) {
        setTitle(title);
        setDirection(settings.sidebarPos);
        setContent(content);
        if (title !== currTitle && isVisible) {
            setIsVisible(true);
        } else {
            setIsVisible(!isVisible);
        }
    }

    return (
        <>
            <motion.div
                initial={{ bottom: -150 }}
                animate={{ bottom: isBBVisible ? 10 : -150 }}
                transition={{ duration: settings.animTime, type: "spring" }}
                className="flex flex-row p-6 absolute glass w-[80%] h-auto left-[50%] translate-x-[-50%] justify-center">
                <div className="w-2rem flex flex-row items-center justify-center gap-8">
                    <CurrentSong
                        name={currSong?.title ?? ""}
                        image={currSong?.image ?? "/defaultSong.jpeg"}
                        artists={currSong?.artists ?? ""}
                    />
                    <div className="flex flex-row items-center justify-center gap-4">
                        <Button
                            icon={
                                playing ?
                                    <Pause
                                        size={20}
                                    /> :
                                    <Play
                                        size={20}
                                    />
                            }
                            func={() => { togglePlayback(!playing) }}
                        />

                        <VolumeSlider />

                    </div>
                </div>

                <div className="gap-2 ml-auto flex items-center">

                    <Button
                        icon={
                            <Image size={20} />
                        }
                        func={() => { toggleModal("Backgrounds", <BgModal />) }}
                        moreClasses="mx-1"
                    />

                    <Button
                        icon={
                            <Radio size={20} />
                        }
                        func={() => { toggleModal("Stations", <StationModal />) }}
                        moreClasses="mx-1"
                    />
                    <Button
                        icon={
                            <ChevronDown
                                size={20}
                            />
                        }
                        func={() => { setVisible(!isBBVisible) }}
                        moreClasses="mx-1"
                    />
                </div>
            </motion.div>

            <motion.div
                initial={{ bottom: 150 }}
                animate={{ bottom: isBBVisible ? -150 : 0 }}
                transition={{ duration: settings.animTime, type: "spring" }}
                className="pad absolute left-[50%] translate-x-[-50%]"
            >
                <Button
                    icon={
                        <ChevronUp
                            size={20}
                        />
                    }
                    func={() => { setVisible(!isBBVisible) }}
                />
            </motion.div>
        </>
    )
}