"use client";
import Button from "@/components/inputs/button"
import { motion } from 'motion/react';
import { AudioWaveform, ChevronDown, ChevronUp, Image, Pause, Play, Radio, Volume, Volume1, Volume2 } from "lucide-react";
import { useState } from "react";
import { useSettings } from "@/contexts/settingsData";
import { useModal } from "@/contexts/modals";
import BgModal from "./modals/bgModal";
import StationModal from "./modals/stationModal";
import SfxModal from "./modals/sfxModal";
import CurrentSong from "./currentSong";
import { usePlayer } from "@/contexts/player";

export default function BottomBar() {
    const { settings } = useSettings();
    const [isBBVisible, setVisible] = useState(true);

    const { setTitle, setContent, setIsVisible, isVisible, setDirection } = useModal();
    const { playing, volume, currSong, togglePlayback, setVolume, setCurrSong } = usePlayer();

    function toggleBgModal() {
        setTitle("Backgrounds");
        setDirection("down");
        setContent(<BgModal />);
        setIsVisible(!isVisible);
    }

    function toggleStation() {
        setTitle("Stations");
        setDirection("down");
        setContent(<StationModal />);
        setIsVisible(!isVisible);
    }

    function toggleSfx() {
        setTitle("Sounds Effects");
        setDirection("down");
        setContent(<SfxModal />);
        setIsVisible(!isVisible);
    }

    return (
        <>
            <motion.div
                initial={{ bottom: -150 }}
                animate={{ bottom: isBBVisible ? 10 : -150 }}
                transition={{ duration: settings.animTime, type: "spring" }}
                className="flex flex-row p-6 absolute glass w-[80%] h-auto left-[50%] translate-x-[-50%] justify-center">
                <div className="w-2rem flex flex-row items-center justify-center gap-8">
                    {/* <CurrentSong
                        name={currSong.title}
                        image={currSong.image}
                        artists={currSong.artists}
                    /> */}
                    <div className="flex flex-row items-center justify-center gap-4">
                        <Button
                            icon={
                                playing ?
                                    <Play
                                        size={20}
                                    /> :
                                    <Pause
                                        size={20}
                                    />
                            }
                            func={() => { togglePlayback(!playing) }}
                        />

                        <Button
                            icon={
                                (volume <= 0.3) ?
                                    <Volume
                                        size={20}
                                    /> :
                                    (volume <= 0.7) ?
                                        <Volume1 size={20} /> :
                                        <Volume2 size={20} />
                            }
                            func={() => { }}
                        />
                    </div>
                </div>

                <div className="gap-2 ml-auto flex items-center">

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