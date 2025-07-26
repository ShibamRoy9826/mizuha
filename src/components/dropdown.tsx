"use client";
import {useRef,useEffect} from "react";
interface Props{
    options:string[],
    isVisible:boolean,
    toggleIsVisible:()=>void

}
export default function Dropdown({isVisible,toggleIsVisible,options}:Props){

    const dropdownRef=useRef<HTMLDivElement|null>(null);

    useEffect(()=>{
        if(isVisible && dropdownRef.current){
            dropdownRef.current.focus();
        }
    },[isVisible])

    return(
        <div onBlur={toggleIsVisible} ref={dropdownRef} className="overflow-hidden z-10 w-auto absolute flex flex-col rounded-xl " style={{"left":"-30%"}}>
            {options.map((e,index)=>(
                <div key={index} className="bg-[var(--tint-strong)] w-full h-auto hover:bg-[var(--primary)] p-2 " style={{"display":isVisible?"block":"none"}}>
                    <h1 className="text-sm select-none">{e}</h1>
                </div>
            ))}
        </div>
    );
}