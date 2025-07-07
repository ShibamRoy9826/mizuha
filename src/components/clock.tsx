import {Silkscreen} from "next/font/google";

const silkscreen=Silkscreen({
  weight:"400",
  variable:"--font-silkscreen",
  subsets:["latin"]
})

export default function Clock(){
    return(
        <div className={` ${silkscreen.className} absolute top-8 left-1/2 -translate-x-1/2 rounded-xl flex items-center justify-center  w-auto text-8xl p-4 text-center gap-[2px] select-none bg-[var(--tint)]`}>
            <span className="backdrop-blur-sm shadow-xl rounded-xl border-x-2 border-x-[rgba(0,0,0,0.1)]">12</span>
            <span className="backdrop-blur-sm shadow-xl rounded-xl border-x-2 border-x-[rgba(0,0,0,0.1)]">00</span>
            <span className="backdrop-blur-sm shadow-xl rounded-xl border-x-2 border-x-[rgba(0,0,0,0.1)]">PM</span>


        </div>
    );

}