"use client";
import React,{useRef,useState,useEffect} from "react";

interface Props{
    id:string,
    visibleWindow:string|null,
    title:string,
    children:React.ReactNode,
    positionX?:number,
    positionY?:number,
    width:string,
    height:string
    closeFunc:()=>void
}


export default function Dialog({id,closeFunc,visibleWindow,title,children,positionX,positionY,width,height}:Props){
    const isVisible=(visibleWindow==id);
    const dialogRef=useRef<HTMLDivElement>(null);
    const [pos, setPos] = useState({x:positionX,y:positionY});
    const [dragging, setDragging] = useState(false);
    const offset = useRef({x:0,y:0});

    useEffect(()=>{
        const mouseMoveIn=(e:MouseEvent)=>{
            if(dragging){
                setPos({
                    x:e.clientX-offset.current.x,
                    y:e.clientY-offset.current.y,
                })
                console.log("X",e.clientX);
                console.log("Y",e.clientY);
                console.log("Xoffset",offset.current.x);
                console.log("Yoffset",offset.current.y);
            }
        };

        const mouseMoveOut=()=>{
            setDragging(false)
        };

        document.addEventListener("mousemove",mouseMoveIn);
        document.addEventListener("mouseup",mouseMoveOut);
        return ()=>{
            document.removeEventListener("mousemove",mouseMoveIn);
            document.removeEventListener("mouseup",mouseMoveOut);
        }
    },[dragging])

    const MouseDown=(e:React.MouseEvent<HTMLDivElement>)=>{
        if(dialogRef.current){
            const rect=dialogRef.current.getBoundingClientRect()
            offset.current={
                x:e.clientX-rect.left,
                y:e.clientY-rect.top,
            }
            console.log("rectLeft - ",rect.left);
            console.log("rectTop - ",rect.top);
        };
        setDragging(true);
    }

    return (
        <div ref={dialogRef} className="rounded-xl backdrop-blur-sm border-1 border-[rgba(255,255,255,0.2)]  flex absolute z-3 bg-[var(--tint-strong)] hover:bg-[var(--tint-strongest)] shadow-lg transition-colors duration-500 ease-in-out" style={{display: isVisible?"flex":"none",width:width,height:height,left:pos.x,top:pos.y}}>
            <div className="relative w-full flex flex-col items-center justify-center">

                {/* titlebar */}
                <div className="flex flex-row w-full h-auto border-b-1 border-b-[rgba(255,255,255,0.2)] cursor-grab active:cursor-grabbing select-none" onMouseDown={MouseDown}>
                    <h1 className="mr-auto ml-2 mt-2 mb-2 text-left pointer-events-none"><b>{title}</b></h1>
                    <button className="mb-2 mt-2 mr-2 ml-auto w-6 h-6 cursor-pointer rounded-full duration-500 hover:bg-[#d20f39] active:bg-[#f38ba8] flex items-center justify-center" onClick={closeFunc}> 
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_SM"> <path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="var(--fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
                    </button>
                </div>

                {/* main content */}
                <div className="w-full h-full p-8">
                    {children}
                </div>
            </div>


        </div>

    );
}