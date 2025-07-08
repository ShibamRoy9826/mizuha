"use client";
import Dialog from "@/components/dialog";

interface Props{
    dialogName:string|null,
    toggleBg:()=>void,
    toggleSettings:()=>void,
    togglePomodoro:()=>void,
    toggleEye:()=>void,
    toggleTodo:()=>void,
    toggleJournal:()=>void,

}

export default function DialogContainer({dialogName,toggleBg,togglePomodoro,toggleSettings,toggleEye, toggleTodo,toggleJournal}:Props){

    return (
    <>

        {/*Bottom bar dialogs -----------------------------------*/}
        <Dialog
        id="bg"
        visibleWindow={dialogName}
        title="Backgrounds"
        width="auto"
        height="auto"
        closeFunc={toggleBg}
        positionX={1300}
        positionY={400}
        >
        <h1>
            This is gonna contain all the backgrounds
        </h1>
        </Dialog>


        {/* Sidebar dialogs ----------------------------------------- */}

        <Dialog
        id="settings"
        visibleWindow={dialogName}
        title="Settings"
        width="auto"
        height="auto"
        closeFunc={toggleSettings}
        positionX={80}
        positionY={200}
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
        positionX={80}
        positionY={250}
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
        positionX={80}
        positionY={300}
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
        positionX={80}
        positionY={350}
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
        positionX={80}
        positionY={400}
        >
        <h1>
            This is the dialog box for the Journal
        </h1>
        </Dialog>

    </>

    );
    
}