"use client";
import {useState,useRef,useEffect} from "react";
import { Direction, getTrackBackground, Range } from "react-range";

interface Props{
    isVisible:boolean,
    toggleVisible:()=>void
}

export default function VolumeControl({toggleVisible,isVisible}:Props){
    const [values, setValues] = useState([50]);

    const volRef=useRef<HTMLDivElement|null>(null);

    useEffect(()=>{
        if(isVisible && volRef.current){
            volRef.current.focus();
        }
    },[isVisible])
    return(
        <div ref={volRef} tabIndex={0} onBlur={toggleVisible} className="z-4 absolute rounded-xl bg-[var(--tint-strong)] p-4 backdrop-blur-sm shadow-lg " style={{display:isVisible?"flex":"none",'top':"-16vh",'left':"0px"}} id="volumeSlider">
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
                    // ref={volRef}
                    className="focus:outline-0 focus:border-none"
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