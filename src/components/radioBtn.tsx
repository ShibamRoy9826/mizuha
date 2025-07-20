import { useState } from "react";

interface Props{
   options:string[],
   vertical:boolean,
   selected:string,
   setSelected:(txt:string)=>void

}

export default function RadioBtnGroup({setSelected,selected,options,vertical}:Props){

    return (
        <div className="flex rounded-xl  p-2" style={{"flexDirection":vertical?"column":"row"}}>
             {options.map((txt, index) => (
                <button key={index} className="mx-2 p-2 rounded-md hover:bg-[var(--primary)] duration-500 cursor-pointer" onClick={()=>{setSelected(txt)}} style={{"background":(txt==selected)?"var(--primary)":"var(--tint)"}}>
                    {txt}
                </button>
            ))}
        </div>
    );
}