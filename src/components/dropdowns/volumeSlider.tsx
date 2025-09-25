"use client"
import { usePlayer } from "@/contexts/player"
import React, { useState } from "react";
import Button from "../inputs/button";
import { Volume, Volume1, Volume2 } from "lucide-react";
import { AnimatePresence, motion } from 'motion/react';
import { useSettings } from "@/contexts/settingsData";

export default function VolumeSlider() {
    const [isVisible, setIsVisible] = useState(false);
    const { settings } = useSettings();
    const { volume, setVolume } = usePlayer();
    return (
        <div className="relative inline-block ">
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
                func={() => {
                    setIsVisible(!isVisible)
                }}
            />
            {
                <AnimatePresence>
                    {
                        isVisible &&
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: settings.animTime, type: "spring" }}
                            className="absolute glass p-4 rounded-xl bottom-full left-[50%] translate-x-[-50%] mb-2"
                        >
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step={0.01}
                                value={volume}
                                onChange={(e) => {
                                    setVolume(parseFloat(e.target.value));
                                }}
                                className="slider"
                                style={{
                                    writingMode: "vertical-lr",
                                    direction: "rtl",
                                    verticalAlign: "middle",
                                }}
                            />

                        </motion.div>

                    }
                </AnimatePresence>
            }
        </div>
    )
}