"use client"
import Image from "next/image";
import {useEffect} from "react";

interface Props{
    name:string,
    iconPath:string,
    url:string
}


export default function Shortcut({name,iconPath,url}:Props){
    function redirect(){

        window.open(url,"");
    }

    return(
        <div className="group relative flex flex-col items-center justify-center cursor-pointer w-auto duration-500 hover:backdrop-blur-sm hover:shadow-lg hover:bg-[var(--tint-strong)] p-4 rounded-xl" >
        
        <div className="opacity-0  hover:bg-[var(--tint)] hover:shadow-lg group-hover:opacity-100 duration-500 z-2 absolute right-2 top-2 flex items-center justify-center w-6 h-6 p-[4px] rounded-full">
           <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="var(--fg)" className="bi bi-three-dots-vertical"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path> </g></svg> 
        </div>
        <div className="relative w-16 h-16 overflow-hidden rounded-xl mb-1" onClick={redirect}>
            <Image
            src={iconPath}
            alt={name}
            className="select-none shadow-2xl"
            fill
            />
        </div>
        <p className="text-center" onClick={redirect}>{name}</p>
        </div>
    );

}