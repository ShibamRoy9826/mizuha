import { usePlayer } from "@/contexts/player";
import { motion } from 'motion/react';
import { useSettings } from "@/contexts/settingsData";
import { useEffect } from "react";

export default function StationModal() {
    const { stations, currStation, setCurrStation } = usePlayer();
    const { settings } = useSettings();

    useEffect(() => {
        console.log("Current station set to : ", currStation);
    }, [currStation])
    return (
        <div className="w-full h-full min-h-64 flex justify-center">

            <div className="w-full h-full flex flex-col items-center gap-2 overflow-y-scroll p-2">
                {
                    stations.map((opt) => (
                        (opt.id === currStation?.id) ?
                            <motion.div
                                key={opt.id}
                                whileHover={{ scale: 1.05, backgroundColor: "var(--bg-darker)" }}
                                onClick={() => setCurrStation(opt)}
                                transition={{ duration: settings.animTime, type: "spring" }}
                                className="cursor-pointer rounded-xl p-2 w-[90%] bold selectedItem">
                                <h1 className="text-center bold text-sm">
                                    {opt.name}
                                </h1>
                            </motion.div> :
                            <motion.div
                                key={opt.id}
                                whileHover={{ scale: 1.05, backgroundColor: "var(--bg-darker)" }}
                                onClick={() => setCurrStation(opt)}
                                transition={{ duration: settings.animTime, type: "spring" }}
                                className="cursor-pointer rounded-xl p-2 w-[90%]">
                                <h1 className="text-center text-sm">
                                    {opt.name}
                                </h1>
                            </motion.div>

                    ))
                }
            </div>
        </div>
    )
}