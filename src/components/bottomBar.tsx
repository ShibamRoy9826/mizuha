"use client";
import Button from "@/components/inputs/button"
import { motion } from 'motion/react';
import { ChevronDown, ChevronUp, Image, MessageSquareText, Pause, Play, Radio, Star } from "lucide-react";
import { useState } from "react";
import { useSettings } from "@/contexts/settingsData";
import { useModal } from "@/contexts/modals";
import BgModal from "./modals/bgModal";
import StationModal from "./modals/stationModal";
import CurrentSong from "./currentSong";
import { usePlayer } from "@/contexts/player";
import VolumeSlider from "./dropdowns/volumeSlider";
import { openUrl } from "@/utils/func";

export default function BottomBar() {
    const { settings } = useSettings();
    const [isBBVisible, setVisible] = useState(true);

    const { toggleModal } = useModal();
    const { playing, currSong, togglePlayback } = usePlayer();

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
                            <MessageSquareText size={20} />
                        }
                        func={() => { openUrl("/feedback") }}
                        moreClasses="mx-1"
                    />

                    <Button
                        icon={
                            <Star size={20} />
                        }
                        func={() => { openUrl("https://github.com/ShibamRoy9826/mizuha") }}
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