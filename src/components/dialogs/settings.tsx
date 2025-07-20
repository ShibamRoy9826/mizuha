import RadioBtnGroup from "../radioBtn";
import {useState} from "react";

const searchEngines=["Google","DuckDuckGo","Bing","Yahoo","Custom"]

export default function Settings(){
    const [selected,setSelected]=useState(searchEngines[0]);

    return(
        <>
        <div>
            <h1 className="underline bold text-xl ">
                Search Engine
            </h1>

            <RadioBtnGroup
            options={searchEngines}
            vertical={false}
            selected={selected}
            setSelected={setSelected}
            />

            <h1 className="text-lg bold p-2 mx-2 ">Custom URL:</h1>
            <input name="customSearch mx-2 p-2 w-auto h-auto" type="text" placeholder="Custom URL here" className="outline-none border-b-2 border-b-[var(--tint-stongest)]"/>

        </div>

        </>
    );
}