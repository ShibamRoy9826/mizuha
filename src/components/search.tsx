import Btn from "@/components/button";


export default function SearchBox(){
    return (
        <div className="flex flex-row items-center justify-center absolute left-1/2 top-1/3 -translate-x-1/2 w-[50%] ">
        <input className="w-full bold outline-none py-2 text-center bg-[transparent] text-2xl border-b-1 border-b-[rgba(0,0,0,0.3)] focus:border-b-[white] duration-500 ease-in-out" />
        <Btn
        icon={
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="var(--fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        }
        />

        </div>
    );
}