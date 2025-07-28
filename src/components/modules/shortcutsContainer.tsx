import Shortcut from "@/components/modules/shortcut";
import {useEffect, useState} from "react";
import AddShortcut from "../dialogs/subDialogs/addShortcut";


interface ShortcutData{
    id:number,
    name:string,
    iconPath:string,
    url:string
}

export default function ShortcutsContainer(){
    const [shortcuts,setShortcuts]=useState<ShortcutData[]>([
                {id:0,name:"Youtube",iconPath:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png",url:"https://youtube.com/"},
                {id:1,name:"Google",iconPath:"/images/img.jpg",url:"google.com"},
                {id:2,name:"Amazon",iconPath:"/images/img.jpg",url:"amazon.in"},
                {id:3,name:"Whatsapp",iconPath:"/images/img.jpg",url:"web.whatsapp.com"}

            ]);
    const [showAddShortcut,setShowShortcut]=useState(false);
    


    // function removeArr(arr:ShortcutData[], id:number) {
    //     const index=arr.findIndex(item => item.id === id);
    //     const copy=[...arr];
    //     if (index > -1) copy.splice(index, 1);
    //     return copy;
    // }


    // function newShortcut(){
    //     const url="https://www.google.com/";
    //     const name="https://www.google.com/";
    //     const iconPath="/images/img.jpg";

    //     setShortcuts([
    //         ...shortcuts,
    //         {
    //             id:Date.now(),
    //             name:name,
    //             iconPath:iconPath,
    //             url:url
    //         }]
    //     )
    //     localStorage.setItem("shortcuts",JSON.stringify(shortcuts));
    // }

    // function removeShortcut(id:number){
    //     let sh=removeArr(shortcuts,id);
    //     setShortcuts(sh);
    // }

    useEffect(()=>{
        const shortcutsData=localStorage.getItem("shortcuts");
        const defaultShortcuts=[
            {id:0,name:"Youtube",iconPath:"/images/img.jpg",url:"https://youtube.com/"},
            {id:1,name:"Google",iconPath:"/images/img.jpg",url:"https://google.com/"},
            {id:2,name:"Amazon",iconPath:"/images/img.jpg",url:"https://amazon.in/"},
            {id:3,name:"Whatsapp",iconPath:"/images/img.jpg",url:"https://web.whatsapp.com/"}
        ]
        if(shortcutsData){
            console.log("Found shortcuts in local storage! :",JSON.stringify(shortcutsData));
            if(shortcutsData=="[]"){
                setShortcuts(defaultShortcuts);
                localStorage.setItem("shortcuts",JSON.stringify(defaultShortcuts));
            }else{
                console.log(shortcutsData);
                // setShortcuts(JSON.parse(shortcutsData));
                localStorage.setItem("shortcuts",JSON.stringify(defaultShortcuts));
                setShortcuts(defaultShortcuts);
            }

        }else{
            setShortcuts(defaultShortcuts);
            localStorage.setItem("shortcuts",JSON.stringify(defaultShortcuts));
        }

    },[])

    return (
        <>
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 grid grid-cols-5 grid-row-2 gap-2 w-auto h-[5vw]">
            {
                shortcuts.map((e)=>(
                    <Shortcut
                    key={e.id}
                    id={e.id}
                    name={e.name}
                    // iconPath={e.iconPath}
                    iconPath={`https://www.google.com/s2/favicons?sz=64&domain=${e.url}`}
                    url={e.url}
                    />
                ))
            }
            <div className="group flex items-center justify-center rounded-xl  w-auto h-auto duration-500" onClick={()=>{setShowShortcut(!showAddShortcut)}}>
                <div className="flex items-center justify-center p-3 bg-[var(--tint-strong)] duration-500 group-hover:bg-[var(--tint-strongest)] rounded-full w-full h-auto">
                    <svg className="w-[4rem] h-[4rem]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M12 4V20" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                </div>
            </div>
        </div>
        <AddShortcut
        isVisible={showAddShortcut}
        setIsVisible={setShowShortcut}
        />
        </>
    );
}