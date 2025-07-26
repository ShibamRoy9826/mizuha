"use client";
import Btn from "@/components/button";
import {useRef} from "react";
import { SearchInternet } from "../utils/fn";

export default function SearchBox(){
    const inputBox=useRef<HTMLInputElement|null>(null);

    function Search(){
        const searchTxt=inputBox.current?.value;
        let searchEngine=localStorage.getItem("search_engine");
        const searchEngineUrls=localStorage.getItem("search_engine_urls");
        const new_tab_saved=localStorage.getItem("new_tab");
        let new_tab;
        let searchEngines;

        // console.log("Here's the stuff:",searchTxt,searchEngine,searchEngineUrls);

        if(new_tab_saved){
            new_tab=JSON.parse(new_tab_saved);
        }else{
            new_tab=true;
            localStorage.setItem("new_tab",JSON.stringify(new_tab));
        }

        
        if(!searchEngine){
            localStorage.setItem("search_engine","google");
            searchEngine="google";
        }

        if(searchEngineUrls){
            searchEngines=JSON.parse(searchEngineUrls);
        }else{
            searchEngines={
                "google":"https://www.google.com/search?q=",
                "bing":"https://www.bing.com/search?q=",
                "duckduckgo":"https://duckduckgo.com/?q=",
                "yahoo":"https://search.yahoo.com/search?p="
            }
            localStorage.setItem("search_engine_urls",JSON.stringify(searchEngines));
        }
        if(searchTxt){
            SearchInternet(searchEngines[searchEngine]+encodeURIComponent(searchTxt),new_tab);
        }
    }

    function handleKeyDown(e:React.KeyboardEvent){
        if(e.key=="Enter"){
            Search();
        }
    }
    return (
        <div className="flex flex-row items-center justify-center absolute left-1/2 top-1/3 -translate-x-1/2 w-[50%] ">
        <input ref={inputBox} className="w-full bold outline-none py-2 text-center bg-[transparent] text-2xl border-b-1 border-b-[rgba(0,0,0,0.3)] focus:border-b-[white] duration-500 ease-in-out" onKeyDown={handleKeyDown}/>
        <Btn
        icon={
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="var(--fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        }
        onClick={Search}
        />

        </div>
    );
}