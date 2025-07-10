"use client";
import {useEffect,useRef} from "react";

interface Props{
    bgPath:string
}

function Bg({bgPath}:Props){
    const videoRef=useRef<HTMLVideoElement>(null);

    useEffect(()=>{
        if(videoRef.current){
            videoRef.current.load();
        }
    },[bgPath]);

    return (
        <div className="w-full h-full  fixed z-[-1] overflow-hidden">
            <video className="w-full h-full object-cover"
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            >
            <source src={bgPath} type="video/mp4"/>
            Your browser does not support the video tag.
            </video> 
        </div>
    );
}

export default Bg;