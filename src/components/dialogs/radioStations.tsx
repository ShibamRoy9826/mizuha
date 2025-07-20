import RadioBtnGroup from "../radioBtn";
import {useState} from "react";

const radioStats=["study beats","sleep sounds","relaxing beats","jazz music","random beats"]
export default function RadioStations(){
    const [selected,setSelected]=useState(radioStats[0]);

    return(
        <>
            <RadioBtnGroup
            options={radioStats}
            vertical={true}
            selected={selected}
            setSelected={setSelected}
            />

        </>
    );
}