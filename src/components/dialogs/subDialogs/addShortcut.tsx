import SubDialog from "./subDialog";

interface Props{
    isVisible:boolean,
    setIsVisible:(b:boolean)=>void;
}
export default function AddShortcut({isVisible,setIsVisible}:Props){
    return(
        <SubDialog
        isVisible={isVisible}
        title="Add a new shortcut"
        children={
            <h1>You can add a new shortcut with this!</h1>
        }
        setIsVisible={setIsVisible}
        />

    );
}