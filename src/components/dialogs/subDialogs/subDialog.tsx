interface Props{
    isVisible:boolean,
    children:React.ReactNode,
    title:string,
    setIsVisible:(b:boolean)=>void
}

export default function SubDialog({setIsVisible,isVisible,children,title}:Props){
    return (
        <div className="w-[20vw] h-[40vh] rounded-xl bg-[var(--tint)] hover:bg-[var(--tint-strong)] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" style={{"display":isVisible?"flex":"none"}}>
                <div className="flex flex-row w-full border-b-1 border-b-[rgba(255,255,255,0.2)] cursor-grab active:cursor-grabbing select-none mb-2">
                    <h1 className="mr-auto ml-2 mt-2 mb-2 text-left pointer-events-none font-bold">{title}</h1>
                    <button className="mb-2 mt-2 mr-2 ml-auto w-6 h-6 cursor-pointer rounded-full duration-500 hover:bg-[#d20f39] active:bg-[#f38ba8] flex items-center justify-center" onClick={()=>{setIsVisible(!isVisible)}}> 
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_SM"> <path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="var(--fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
                    </button>
                </div>
                <div className="flex flex-col items-center justify-center">
                    {children}
                </div>

        </div>
    );
} 