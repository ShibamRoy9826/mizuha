export default function EyeRule(){
    return (
        <>
        <div className="flex flex-col w-full items-center justify-center">
            <h1 className="text-center text-2xl w-full">
            00:00
            </h1>
            <div className="items-center justify-center w-full flex flex-row my-2">

            <button className="w-auto flex flex-row shadow-lg mx-2 p-2 rounded-xl hover:bg-[var(--primary)] duration-500 cursor-pointer" style={{"border":"1px solid var(--primary)"}}>
                Start 
                <svg viewBox="-3 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="var(--fg)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>play</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" > <g id="Icon-Set-Filled" transform="translate(-419.000000, -571.000000)" fill="var(--fg)"> <path d="M440.415,583.554 L421.418,571.311 C420.291,570.704 419,570.767 419,572.946 L419,597.054 C419,599.046 420.385,599.36 421.418,598.689 L440.415,586.446 C441.197,585.647 441.197,584.353 440.415,583.554" id="play"> </path> </g> </g> </g></svg>
            </button>
            <button className="shadow-lg mx-2 p-2 rounded-xl hover:bg-[var(--primary)] duration-500 cursor-pointer" style={{"border":"1px solid var(--primary)"}}>
                End
            </button>
            </div>
        </div >
        </>

    );
}