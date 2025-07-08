import {useState} from "react";
import { Direction, getTrackBackground, Range } from "react-range";

interface Props{
    bottom:string,
    left:string,
    isVisible:boolean
}

export default function VolumeControl({isVisible,bottom,left}:Props){
    const [values, setValues] = useState([50]);
    return(
        <div className="rounded-xl bg-[var(--tint-strong)] p-4 absolute backdrop-blur-sm shadow-lg " style={{display:isVisible?"flex":"none",'bottom':bottom,'left':left}}>
            <Range
                step={1}
                min={0}
                max={100}
                values={values}
                direction={Direction.Up}
                onChange={(values) => setValues(values)}
                renderTrack={({ props, children }) => (
                    <div
                    {...props}
                    style={{
                        ...props.style,
                        height: "8rem",
                        width: "4px",
                        background:getTrackBackground({
                            values:values,
                            colors:["var(--fg)","var(--tint-strongest)"],
                            min:0,
                            max:100,
                            direction:Direction.Up,

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
                    style={{
                        ...props.style,
                        height: "15px",
                        width: "15px",
                        backgroundColor: "white",
                        borderRadius:"50%",
                        boxShadow:"0 0 30px 5px #000000"
                    }}
                    />
                )}
                
                />
        </div>
    );
}