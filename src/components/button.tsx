"use client"
import React,{useEffect} from "react";

interface Props{
  icon: React.ReactNode,
  onClick?: () => void,
};

export default function Btn({ icon, onClick }: Props) {
    return (
        <div className="shadow-sm shadow-[rgba(0,0,0,0.1)] rounded-xl w-[2.5rem] h-[2.5rem] backdrop-blur-lg ease-in-out duration-500  hover:bg-[#ffffff22] p-[0.6rem] bg-[rgba(0,0,0,0.1)]" onClick={onClick}>
            <button className="w-full h-full ">
                {icon}
            </button>
        </div>
    );
}
