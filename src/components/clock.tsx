"use client";
import {Silkscreen} from "next/font/google";
import {useState, useEffect} from "react";

const silkscreen=Silkscreen({
  weight:"400",
  variable:"--font-silkscreen",
  subsets:["latin"]
})

export default function Clock(){
    const [seconds,setSeconds]=useState("00");
    const [minutes,setMinutes]=useState("00");
    const [hours,setHours]=useState("12");
    const [ampm,setAmPm]=useState("PM");
    
    const [time, setTime]=useState(new Date());

    useEffect(() => {
        const timer=setInterval(() => setTime(new Date()), 1000);
        const hrs=time.getHours()

        setSeconds(time.getSeconds().toString().padStart(2,'0'));
        setMinutes(time.getMinutes().toString().padStart(2,'0'));
        setHours(hrs.toString().padStart(2,'0'));

        if(hrs<12){
            setAmPm("AM");
        }else if(hrs==12){
            setAmPm("PM");
        }
        else{
            setHours((hrs-12).toString().padStart(2,'0'));
            setAmPm("PM")
        }
        return ()=>clearInterval(timer); 
    }, []);

    return(
        <div className={` ${silkscreen.className} absolute top-8 left-1/2 -translate-x-1/2 rounded-xl flex items-center justify-center  w-auto text-8xl p-4 text-center gap-[2px] select-none bg-[var(--tint)]`}>
            <span className="backdrop-blur-sm shadow-xl rounded-xl border-x-2 border-x-[rgba(0,0,0,0.1)]">{hours}</span>
            <span className="backdrop-blur-sm shadow-xl rounded-xl border-x-2 border-x-[rgba(0,0,0,0.1)]">{minutes}</span>
            <span className="backdrop-blur-sm shadow-xl rounded-xl border-x-2 border-x-[rgba(0,0,0,0.1)]">{ampm}</span>


        </div>
    );

}