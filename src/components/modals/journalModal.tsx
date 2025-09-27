"use client"
import { useEffect, useState } from "react"
import { Save } from "lucide-react";
import Button from "../inputs/button";
import { Notebook, Plus } from "lucide-react";
import { AnimatePresence } from "motion/react";
import NoteMinimized from "../containers/noteMinimized";
import EditorBox from "../inputs/editor";
import { useHydratedNotes, useNotesContext } from "@/contexts/notes";


export default function JournalModal() {
    useHydratedNotes();
    const { updateItem, addItem, list } = useNotesContext();

    const [showList, setShowList] = useState(true);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState(`
        <h1>Hello there!</h1>
        <p>Have something important that you don't want to forget?
         Note it down here!</p>`
    );
    const [currIndex, setCurrIndex] = useState<null | number>(null);

    useEffect(() => {
        const data = localStorage.getItem("noteTemp");
        if (data) {
            setTitle(JSON.parse(data).title);
        }
    }, [])

    function updateNote(index: number) {
        const data = list[index];
        setTitle(data.title);
        setContent(data.text);
        setCurrIndex(index);
    }

    return (
        <div className="flex flex-col gap-2 justify-center p-4">

            <div className="flex items-center justify-center gap-4">

                <Button
                    text="Notes"
                    icon={
                        <Notebook size={20} />
                    }
                    moreClasses={`gap-2 ${showList ? 'bottomBorder' : ""}`}
                    func={() => { setShowList(true); setCurrIndex(null) }}
                />
                <Button
                    text="Add New"
                    icon={
                        <Plus size={20} />
                    }
                    moreClasses={`gap-2 ${!showList ? 'bottomBorder' : ""}`}
                    func={() => { setShowList(false) }}
                />

            </div>


            {
                showList ?
                    <div className="flex flex-col items-center p-4 bg-[var(--bg-darker)] rounded-xl row-span-3 col-span-2 overflow-y-scroll ">
                        <AnimatePresence>
                            {
                                (list.length === 0) ?
                                    <h1 className="text-center">
                                        No notes yet....
                                    </h1>
                                    :
                                    list.map((task, ind) => (
                                        <NoteMinimized index={ind} text={task} key={ind} onClick={() => { setShowList(false); updateNote(ind) }} />
                                    ))
                            }
                        </AnimatePresence>
                    </div>

                    :
                    <div className="flex flex-col items-center justify-center gap-4">

                        <p className="text-sm text-[var(--fg2)]">
                            {
                                (currIndex !== null) ?
                                    "Editing"
                                    :
                                    "New note draft"
                            }
                        </p>

                        <div className="flex flex-row items-center justify-center gap-4 w-full">
                            <h1>Title:</h1>
                            <input value={title} onChange={(e) => { setTitle(e.target.value) }} type="text" placeholder="Title of the note goes here.." className="bold settingsField p-4 w-full h-[3rem]" />
                        </div>

                        <EditorBox currIndex={currIndex} title={title} content={content} onChange={setContent} />

                        <Button
                            text="Save"
                            func={() => {
                                (currIndex === null) ? addItem(title ?? "Couldn't fetch title", content) :
                                    updateItem(currIndex, title ?? "Couldn't fetch title", content);
                                console.log("Trying to save:", title ?? "Couldn't fetch title", content)
                            }}
                            moreClasses="gap-2 mt-2"
                            icon={
                                <Save size={20} />
                            }
                        />

                    </div>

            }
        </div>
    )

}
