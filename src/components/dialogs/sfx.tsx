import {useState} from "react";
import { getTrackBackground, Range } from "react-range";

export default function SFX(){
    const [values, setValues] = useState({
        "Rain":0,
        "Crickets":0,
        "Campfire":0,
        "Keyboard":0
    });

    const handleChange = (key:string, newValue:number[]) => {
    setValues((prev) => ({
      ...prev,
      [key]: newValue[0], 
    }));
  };

    return(
        <>
        {
            Object.entries(values).map(([key,val])=>(
                <div key={key} className="flex flex-col my-2">
                    <div className="flex flex-row items-evenly">
                        <h1 className="text-lg m-2">{key}</h1>
                        <h1 className="ml-auto text-sm m-2">{[val]}%</h1>
                    </div>


                <Range
                    step={1}
                    min={0}
                    max={100}
                    values={[val]}
                    onChange={(newValue) => handleChange(key,newValue)}
                    renderTrack={({ props, children }) => (
                        <div
                        {...props}
                        style={{
                            ...props.style,
                            height: "4px",
                            width: "10rem",
                            background:getTrackBackground({
                                values:[val],
                                colors:["var(--fg)","var(--tint-strongest)"],
                                min:0,
                                max:100,
                            })
                        }}
                        >
                        {children}
                        </div>
                    )}
                    renderThumb={({ props }) => (
                        <div
                        {...props}
                        key={props.key}
                        className="focus:outline-0 focus:border-none"
                        style={{
                            ...props.style,
                            height: "15px",
                            width: "15px",
                            backgroundColor: "var(--fg)",
                            borderRadius:"50%",
                            boxShadow:"0 0 30px 5px #000000"
                        }}
                        /> // closing div
                    )}
                    /> 
                </div>
                ))
            }
   
        </>
    );
}