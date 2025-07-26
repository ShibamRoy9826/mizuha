import RadioBtnGroup from "../radioBtn";
import {useState} from "react";

const searchEngines=["Google","DuckDuckGo","Bing","Yahoo","Custom"]

export default function Settings(){
    const [selected,setSelected]=useState(searchEngines[0]);

    return(
        <div className="flex flex-col items-center">
            <section className="mb-6 flex flex-col items-center w-full h-full">
                <h1 className="underline bold text-2xl w-full text-center mb-4">
                    Search Engine
                </h1>

                <RadioBtnGroup
                options={searchEngines}
                vertical={false}
                selected={selected}
                setSelected={setSelected}
                />
                <div className="rounded-xl p-2 bg-[var(--tint-strong)] flex flex-row items-center justify-center mt-3 w-auto">
                    <h1 className="text-md bold p-2 mx-2 ">Custom URL:</h1>
                    <input name="customSearch" type="text" className="mx-2 p-2 w-auto h-auto outline-none border-b-1 border-b-[var(--tint-stong)]"/>
                </div>
            </section>

            <section className="flex flex-col items-center w-full h-full">
                <h1 className="underline bold text-2xl w-full text-center mb-4">
                   Widgets 
                </h1>

                <div className="grid grid-cols-4 gap-3">

                    <div className="flex flex-row items-center justify-center w-full">
                        <input type="checkbox" className="mx-2" defaultChecked/>
                        <h1>Clock</h1>
                    </div>
                    <div className="flex flex-row items-center justify-center w-full">
                        <input type="checkbox" className="mx-2" defaultChecked/>
                        <h1>Search Bar</h1>
                    </div>
                    <div className="flex flex-row items-center justify-center w-full">
                        <input type="checkbox" className="mx-2" defaultChecked/>
                        <h1>Shortcuts</h1>
                    </div>
                    <div className="flex flex-row items-center justify-center w-full">
                        <input type="checkbox" className="mx-2" defaultChecked/>
                        <h1>Music</h1>
                    </div>
                    <div className="flex flex-row items-center justify-center w-full">
                        <input type="checkbox" className="mx-2" defaultChecked/>
                        <h1>Pomodoro</h1>
                    </div>
                    <div className="flex flex-row items-center justify-center w-full">
                        <input type="checkbox" className="mx-2" defaultChecked/>
                        <h1>20-20-20 Rule</h1>
                    </div>
                    <div className="flex flex-row items-center justify-center w-full">
                        <input type="checkbox" className="mx-2" defaultChecked/>
                        <h1>Journal</h1>
                    </div>
                    <div className="flex flex-row items-center justify-center w-full">
                        <input type="checkbox" className="mx-2" defaultChecked/>
                        <h1>To-Do List</h1>
                    </div>
                </div>
            </section>


        </div>
    );
}