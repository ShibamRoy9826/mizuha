import { useSettings } from "@/contexts/settingsData"
import { useState, useRef } from "react";
import RadioBtn from "../inputs/radioBtn";

export default function SettingsModal() {
    const { settings, setSettings } = useSettings();

    // const [animSpeed, setAnim] = useState(settings.animTime.toString());
    // const [winSpeed, setWinSpeed] = useState(settings.windowSpeed.toString());

    const animSpeed = useRef(settings.animTime.toString());
    const winSpeed = useRef(settings.windowSpeed.toString());

    const sidebarPos = useRef(settings.sidebarPos);

    function saveSettings() {
        try {
            const parsedAnimSpeed = parseFloat(animSpeed.current);
            const parsedWinSpeed = parseFloat(winSpeed.current);

            if (typeof parsedAnimSpeed === "number" &&
                typeof parsedWinSpeed === "number"
            ) {
                console.log(sidebarPos);
                setSettings({
                    ...settings,
                    animTime: parsedAnimSpeed,
                    windowSpeed: parsedWinSpeed,
                    sidebarPos: sidebarPos.current
                }
                )
            } else {
                console.log("Invalid settings");
                console.log("typeof animSpeed", typeof animSpeed);
                console.log("typeof winSpeed", typeof winSpeed);
            }
        } catch (e) {
            console.log("Check all fields, one of them isn't a number")
        }
    }


    return (
        <>
            <div className="grid grid-cols-2 p-4 gap-2 ">
                <h1 className="heading underline col-span-2 w-full ">
                    General
                </h1>

                <h1 className="text-center">Animation speed(seconds)</h1>
                <input type="number" value={animSpeed.current} onChange={(e) => { animSpeed.current = e.target.value; saveSettings() }} className="settingsField" />

                <h1 className="text-center">Window speed(seconds)</h1>
                <input type="number" value={winSpeed.current} onChange={(e) => { winSpeed.current = e.target.value; saveSettings() }} className="settingsField" />

                <h1 className="text-center">Sidebar position</h1>
                <RadioBtn
                    options={["left", "right"]}
                    selected={sidebarPos.current}
                    setSelected={(a: string) => { sidebarPos.current = a; saveSettings() }}
                    moreClasses="m-4"
                />

                {/* <h1 className="heading underline col-span-2">
                    Modules
                </h1> */}




            </div>
        </>
    )
}