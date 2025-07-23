import { useState } from "react";
import RadioBtnGroup from "../radioBtn";

export default function Todo(){
    const [currentTab,setCurrentTab]=useState("Todo");

    return(
        <>
        <div className="bg-[var(--tint-strong)] rounded-xl p-2 flex flex-row items-center w-[20vw]">
            <input name="addTask" type="text" placeholder="What are you planning to do?" className="outline-none border-b-2 border-b-[var(--tint-stongest)] mx-2 field-sizing-content p-2 w-[20vw] h-auto" required/>
            
            <button className="flex flex-row items-center justify-center shadow-lg mx-2 p-2 rounded-xl hover:bg-[var(--primary)] duration-500 cursor-pointer ml-auto" style={{"border":"1px solid var(--primary)"}}>
                Add 
    <svg className="w-[1.2rem] h-[1.2rem]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="var(--fg)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M12 4V20" stroke="var(--fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </button>

        </div>

        {/* task list */}
        <div className="m-2 bg-[var(--tint)] rounded-xl p-2 flex flex-col">

            <div className="flex flex-row p-2 items-center">
                <input type="checkbox" className="mx-2"/>
                <h1 className="overflow-hidden text-center w-full select-none">Some important task</h1>
                <button className="flex flex-row items-center justify-center shadow-lg mx-2 p-2 rounded-xl hover:bg-[var(--primary)] duration-500 cursor-pointer ml-auto" style={{"border":"1px solid var(--primary)"}}>
                    <svg className="w-[1.2rem] h-[1.2rem]" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="var(--fg)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>edit_cover [#fffffffffff]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-419.000000, -359.000000)" fill="var(--fg)"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M384,209.210475 L384,219 L363,219 L363,199.42095 L373.5,199.42095 L373.5,201.378855 L365.1,201.378855 L365.1,217.042095 L381.9,217.042095 L381.9,209.210475 L384,209.210475 Z M370.35,209.51395 L378.7731,201.64513 L380.4048,203.643172 L371.88195,212.147332 L370.35,212.147332 L370.35,209.51395 Z M368.25,214.105237 L372.7818,214.105237 L383.18415,203.64513 L378.8298,199 L368.25,208.687714 L368.25,214.105237 Z" id="edit_cover-[#fffffffffff]"> </path> </g> </g> </g> </g></svg>
                </button>

                <button className="flex flex-row items-center justify-center shadow-lg mx-2 p-2 rounded-xl hover:bg-[var(--primary)] duration-500 cursor-pointer ml-auto" style={{"border":"1px solid var(--primary)"}}>
                   <svg className="w-[1.2rem] h-[1.2rem]" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="var(--fg)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-179.000000, -360.000000)" fill="var(--fg)"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M130.35,216 L132.45,216 L132.45,208 L130.35,208 L130.35,216 Z M134.55,216 L136.65,216 L136.65,208 L134.55,208 L134.55,216 Z M128.25,218 L138.75,218 L138.75,206 L128.25,206 L128.25,218 Z M130.35,204 L136.65,204 L136.65,202 L130.35,202 L130.35,204 Z M138.75,204 L138.75,200 L128.25,200 L128.25,204 L123,204 L123,206 L126.15,206 L126.15,220 L140.85,220 L140.85,206 L144,206 L144,204 L138.75,204 Z" id="delete-[#fffffffffff]"> </path> </g> </g> </g> </g></svg>
                </button>
            </div>

            {/* separator  */}
            <span className="bg-[var(--primary)] w-full h-[1px]"/>

            <div className="flex flex-row p-2 items-center">
                <input type="checkbox" className="mx-2"/>
                <h1 className="overflow-hidden text-center w-full select-none">Some important task</h1>
                <button className="flex flex-row items-center justify-center shadow-lg mx-2 p-2 rounded-xl hover:bg-[var(--primary)] duration-500 cursor-pointer ml-auto" style={{"border":"1px solid var(--primary)"}}>
                    <svg className="w-[1.2rem] h-[1.2rem]" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="var(--fg)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>edit_cover [#fffffffffff]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-419.000000, -359.000000)" fill="var(--fg)"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M384,209.210475 L384,219 L363,219 L363,199.42095 L373.5,199.42095 L373.5,201.378855 L365.1,201.378855 L365.1,217.042095 L381.9,217.042095 L381.9,209.210475 L384,209.210475 Z M370.35,209.51395 L378.7731,201.64513 L380.4048,203.643172 L371.88195,212.147332 L370.35,212.147332 L370.35,209.51395 Z M368.25,214.105237 L372.7818,214.105237 L383.18415,203.64513 L378.8298,199 L368.25,208.687714 L368.25,214.105237 Z" id="edit_cover-[#fffffffffff]"> </path> </g> </g> </g> </g></svg>
                </button>

                <button className="flex flex-row items-center justify-center shadow-lg mx-2 p-2 rounded-xl hover:bg-[var(--primary)] duration-500 cursor-pointer ml-auto" style={{"border":"1px solid var(--primary)"}}>
                   <svg className="w-[1.2rem] h-[1.2rem]" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="var(--fg)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-179.000000, -360.000000)" fill="var(--fg)"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M130.35,216 L132.45,216 L132.45,208 L130.35,208 L130.35,216 Z M134.55,216 L136.65,216 L136.65,208 L134.55,208 L134.55,216 Z M128.25,218 L138.75,218 L138.75,206 L128.25,206 L128.25,218 Z M130.35,204 L136.65,204 L136.65,202 L130.35,202 L130.35,204 Z M138.75,204 L138.75,200 L128.25,200 L128.25,204 L123,204 L123,206 L126.15,206 L126.15,220 L140.85,220 L140.85,206 L144,206 L144,204 L138.75,204 Z" id="delete-[#fffffffffff]"> </path> </g> </g> </g> </g></svg>
                </button>
            </div>

        </div>

        <div className="bg-[var(--tint)] rounded-xl p-2 flex flex-row items-center justify-evenly w-[20vw]">
            <RadioBtnGroup
            setSelected={setCurrentTab}
            selected={currentTab}
            options={["Todo","Completed"]}
            vertical={false}
            />

        </div>
        </>
    );
}