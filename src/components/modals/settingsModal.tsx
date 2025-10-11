import { useSettings } from "@/contexts/settingsData"
import { useRef } from "react";
import RadioBtn from "../inputs/radioBtn";
import TickBox from "../inputs/tickBox";
import HeadingText from "../containers/headings";

export default function SettingsModal() {
    const { settings, setSettings } = useSettings();

    // const [animSpeed, setAnim] = useState(settings.animTime.toString());
    // const [winSpeed, setWinSpeed] = useState(settings.windowSpeed.toString());

    const animSpeed = useRef(settings.animTime.toString());
    const winSpeed = useRef(settings.windowSpeed.toString());

    const sidebarPos = useRef(settings.sidebarPos);


    function setClockTicked(a: boolean) {
        setSettings(
            {
                ...settings,
                clockEnabled: a
            })
    }
    function setSearchTicked(a: boolean) {
        setSettings(
            {
                ...settings,
                searchEnabled: a
            })
    }

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
            console.log("Check all fields, one of them isn't a number", e)
        }
    }


    return (
        <>
            <div className="grid grid-cols-2 p-4 gap-2 ">
                <HeadingText>
                    General
                </HeadingText>

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

                <h1 className="text-center">Search Engine</h1>
                <RadioBtn
                    options={["google", "duckduckgo", "bing", "startpage"]}
                    selected={settings.searchEngine}
                    setSelected={(a: string) => {
                        setSettings(
                            {
                                ...settings,
                                searchEngine: a
                            }
                        );
                        localStorage.setItem("search_engine", a);
                    }}
                    moreClasses="m-[0.5rem]"
                />

                <HeadingText>
                    Modules
                </HeadingText>

                <h1 className="text-center">Clock Enabled</h1>
                <TickBox
                    ticked={settings.clockEnabled}
                    setTicked={setClockTicked}

                />

                <h1 className="text-center">SearchBar Enabled</h1>
                <TickBox
                    ticked={settings.searchEnabled}
                    setTicked={setSearchTicked}

                />

            </div>
        </>
    )
}