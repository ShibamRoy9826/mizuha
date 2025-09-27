"use client";
import { create } from 'zustand';
import { note } from "@/utils/type";
import { useEffect } from 'react';


interface NotesContext {
    list: note[],
    temp: note,
    setTemp: (a: note) => void;
    addItem: (title: string, text: string) => void;
    removeItem: (index: number) => void;
    updateItem: (index: number, text: string, title: string) => void;
    setList: (newList: note[]) => void;
    clear: () => void;
}


export const useNotesContext = create<NotesContext>((set, get) => ({
    temp: { title: "", text: "" },
    setTemp: (a: note) => { set({ temp: a }) },
    list: [],
    addItem: (title: string, text: string) => {
        const newElement = { title: title, text: text } as note;
        const newNotes: note[] = [...get().list, newElement];
        set({ list: newNotes });

        if (typeof window !== "undefined") {
            localStorage.setItem("notes", JSON.stringify(newNotes));
        }
    },
    removeItem: (index: number) => {
        const newNotes = get().list.filter((_, i) => i !== index);

        set({ list: newNotes });
        if (typeof window !== "undefined") {
            localStorage.setItem("notes", JSON.stringify(newNotes));
        }
    },
    updateItem: (index: number, title: string, text: string) => {
        const newNotes: note[] = get().list.map((item, i) => (i === index ? { text: text, title: title } as note : item));

        set({ list: newNotes });
        if (typeof window !== "undefined") {
            localStorage.setItem("notes", JSON.stringify(newNotes));
        }
    },

    setList: (newList: note[]) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("notes", JSON.stringify(newList));
        }
        set({ list: newList });
    },
    clear: () => {
        set({ list: [] });
        localStorage.setItem("notes", "[]");
    }

}))


export function useHydratedNotes() {
    const setList = useNotesContext((s) => s.setList);
    useEffect(() => {
        if (typeof window == "undefined") return;
        const data = localStorage.getItem("notes");
        if (data) {
            setList(JSON.parse(data));
        }
    }, [setList])
}