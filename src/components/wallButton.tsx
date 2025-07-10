"use client";
import Image from "next/image";
import {useState,useEffect} from "react";

interface Props{
    name:string,
    source:string,
    current:string,
    onClick:()=>void
}
export default function WallButton({current,name,source,onClick}:Props){
    const [selected,setSelected]=useState(false);

    useEffect(()=>{
        if(current==source){
            setSelected(true);
        }else{
            setSelected(false);
            // console.log("this ran!!");
        }
    },[current])


    return (

                <div className="w-32 h-32 duration-500 hover:shadow-[0_4px_20px_var(--primary)] hover:border-2 hover:border-[var(--fg)] relative rounded-xl overflow-hidden" style={{"border":selected?"2px solid var(--primary)":"1px solid rgba(255,255,255,0.2)"}} onClick={onClick}>
                    <Image
                    src={source}
                    alt={name}
                    fill
                    />
                </div>
    );
}