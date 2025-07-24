"use client";
import Dialog from "@/components/dialog";
import WallButton from "./wallButton";
import {useEffect, useState} from "react";
import Settings from "./dialogs/settings";
import RadioStations from "./dialogs/radioStations";
import SFX from "./dialogs/sfx";
import EyeRule from "./dialogs/eyeRule";
import Todo from "./dialogs/todo";
import Journal from "./dialogs/journal";

interface Props{
    dialogName:string|null,
    toggleBg:()=>void,
    toggleSettings:()=>void,
    togglePomodoro:()=>void,
    toggleEye:()=>void,
    toggleTodo:()=>void,
    toggleJournal:()=>void,
    toggleEffects:()=>void,
    toggleStations:()=>void,
    onChange:()=>void,
    posArray:{"settings":number[],"eye":number[],"todo":number[],"journal":number[],"pomo":number[],"bg":number[],"effects":number[],"stations":number[]}
}

export default function DialogContainer({posArray,onChange,dialogName,toggleBg,togglePomodoro,toggleSettings,toggleEye, toggleTodo,toggleJournal,toggleEffects,toggleStations}:Props){

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
            <Settings/>
        </Dialog>

        <Dialog
        id="pomodoro"
        visibleWindow={dialogName}
        title="Pomodoro"
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
            <EyeRule/>
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
            <Todo/>
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
            <Journal/>
        </Dialog>

        <Dialog
        id="stations"
        visibleWindow={dialogName}
        title="Radio Stations"
        width="auto"
        height="auto"
        closeFunc={toggleStations}
        positionX={posArray['stations'][0]}
        positionY={posArray['stations'][1]}
        useHW={true}
        >
            <RadioStations/>
        </Dialog>

        <Dialog
        id="effects"
        visibleWindow={dialogName}
        title="Sound Effects"
        width="auto"
        height="auto"
        closeFunc={toggleEffects}
        positionX={posArray['effects'][0]}
        positionY={posArray['effects'][1]}
        useHW={true}
        >
            <SFX/>
        </Dialog>

    </>

    );
    
}