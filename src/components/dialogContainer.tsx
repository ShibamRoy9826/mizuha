"use client";
import Dialog from "@/components/dialog";
import WallButton from "./wallButton";
import {useEffect, useState} from "react";

interface Props{
    dialogName:string|null,
    toggleBg:()=>void,
    toggleSettings:()=>void,
    togglePomodoro:()=>void,
    toggleEye:()=>void,
    toggleTodo:()=>void,
    toggleJournal:()=>void,
    onChange:()=>void,
    posArray:{"settings":number[],"eye":number[],"todo":number[],"journal":number[],"pomo":number[],"bg":number[]}
}

export default function DialogContainer({posArray,onChange,dialogName,toggleBg,togglePomodoro,toggleSettings,toggleEye, toggleTodo,toggleJournal}:Props){

    const [wallName,setWall]=useState("videos/cozy-room.mp4");
    
    useEffect(()=>{
        if(wallName!==""){
            localStorage.setItem("wallSource",wallName);
            // console.log("wallpaper changed to:",wallName);
            onChange();
        }else{
            const w=localStorage.getItem("wallSource");
            if(w){
                setWall(w);
                onChange();
        }else{
                // console.log("wallpaper changed to:",wallName);
            }
        }
    },[wallName])


    return (
    <>
        {/*Bottom bar dialogs -----------------------------------*/}
        <Dialog
        id="bg"
        visibleWindow={dialogName}
        title="Backgrounds"
        width="40vw"
        height="50vh"
        closeFunc={toggleBg}
        positionX={posArray['bg'][0]}
        positionY={posArray['bg'][1]}
        useHW={true}
        >
            <div className="w-full h-full grid grid-cols-4 gap-4 overflow-y-scroll">
                <WallButton
                name="Cozy room"
                source="/wall-thumbnails/cozy-room.jpg"
                current={wallName}
                onClick={()=>{setWall("/videos/cozy-room.mp4")}}
                />
                <WallButton
                name="Evening Chill"
                source="/wall-thumbnails/evening-chill.jpg"
                current={wallName}
                onClick={()=>{setWall("/videos/evening-chill.mp4")}}
                />
                <WallButton
                name="Retro room"
                source="/wall-thumbnails/retro-room.jpg"
                current={wallName}
                onClick={()=>{setWall("/videos/retro-room.mp4")}}
                />
            </div>
        </Dialog>


        {/* Sidebar dialogs ----------------------------------------- */}

        <Dialog
        id="settings"
        visibleWindow={dialogName}
        title="Settings"
        width="auto"
        height="auto"
        closeFunc={toggleSettings}
        positionX={posArray['settings'][0]+60}
        positionY={posArray['settings'][1]}
        >
        <h1>
            This is the dialog box for settings
        </h1>

        </Dialog>

        <Dialog
        id="pomodoro"
        visibleWindow={dialogName}
        title="Pomdoro"
        width="auto"
        height="auto"
        closeFunc={togglePomodoro}
        positionX={posArray['pomo'][0]+60}
        positionY={posArray['pomo'][1]}
        >
        <h1>
            This is the dialog box for the pomodoro timer
        </h1>

        </Dialog>


        <Dialog
        id="eyeWindow"
        visibleWindow={dialogName}
        title="20-20-20 rule"
        width="auto"
        height="auto"
        closeFunc={toggleEye}
        positionX={posArray['eye'][0]+60}
        positionY={posArray['eye'][1]}
        >
        <h1>
            This is the dialog box for the 20-20-20 rule timer
        </h1>
        </Dialog>

        <Dialog
        id="todo"
        visibleWindow={dialogName}
        title="To-do"
        width="auto"
        height="auto"
        closeFunc={toggleTodo}
        positionX={posArray['todo'][0]+60}
        positionY={posArray['todo'][1]}
        >
        <h1>
            This is the dialog box for the Todo list 
        </h1>
        </Dialog>

        <Dialog
        id="journal"
        visibleWindow={dialogName}
        title="Journal"
        width="auto"
        height="auto"
        closeFunc={toggleJournal}
        positionX={posArray['journal'][0]+60}
        positionY={posArray['journal'][1]}
        >
        <h1>
            This is the dialog box for the Journal
        </h1>
        </Dialog>

    </>

    );
    
}