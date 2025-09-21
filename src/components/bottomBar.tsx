"use client";
import Button from "@/components/inputs/button"
import { motion } from 'motion/react';
import { AudioWaveform, ChevronDown, ChevronUp, Image, Pause, Play, Radio } from "lucide-react";
import { useState } from "react";
import { useSettings } from "@/contexts/settingsData";
import { useModal } from "@/contexts/modals";
import BgModal from "./modals/bgModal";
import StationModal from "./modals/stationModal";
import SfxModal from "./modals/sfxModal";

export default function BottomBar() {
    const { settings } = useSettings();
    const [isBBVisible, setVisible] = useState(true);
    const [paused, setPaused] = useState(true);

    const { setContent, setIsVisible, isVisible, setDirection } = useModal();

    function toggleBgModal() {
        console.log("toggleBgModal ran");
        setDirection("down");
        setContent(BgModal);
        setIsVisible(!isVisible);
    }

    function toggleStation() {
        setDirection("down");
        setContent(StationModal);
        setIsVisible(!isVisible);
    }

    function toggleSfx() {
        setDirection("down");
        setContent(SfxModal);
        setIsVisible(!isVisible);
    }

    return (
        <>
            <motion.div
                initial={{ bottom: -150 }}
                animate={{ bottom: isBBVisible ? 10 : -150 }}
                transition={{ duration: settings.animTime, type: "spring" }}
                className="flex flex-row p-6 absolute glass w-[80%] h-auto left-[50%] translate-x-[-50%]">
                <Button
                    icon={
                        paused ?
                            <Pause
                                size={20}
                            /> :
                            <Play
                                size={20}
                            />
                    }
                    func={() => { setPaused(!paused) }}
                />

                <div className="gap-4 ml-auto">

                    <Button
                        icon={
                            <Image size={20} />
                        }
                        func={() => { toggleBgModal() }}
                        moreClasses="mx-1"
                    />
                    <Button
                        icon={
                            <AudioWaveform size={20} />
                        }
                        func={() => { toggleSfx() }}
                        moreClasses="mx-1"
                    />
                    <Button
                        icon={
                            <Radio size={20} />
                        }
                        func={() => { toggleStation() }}
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