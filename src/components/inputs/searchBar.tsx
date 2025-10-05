'use client';
import { useSettings } from '@/contexts/settingsData';
import { AnimatePresence, motion } from 'motion/react';
import Button from './button';
import { Search, SearchIcon } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { SearchNow } from '@/utils/func';

export default function SearchBar() {

    const { settings } = useSettings();
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputFocused, setInputFocused] = useState(false);

    const [suggestions, setSuggestions] = useState<string[]>([
    ])

    function onQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value);
    }

    function onKeydown(e: React.KeyboardEvent) {
        if (e.key === "Enter") {
            SearchNow(query);
        } else {
            setInputFocused(true);
            getSuggestions(query);
        }
    }

    function focusBinding(evt: KeyboardEvent) {
        if (evt.key == "k" && evt.ctrlKey) {
            inputRef.current?.focus()
        }
    }
    async function sleep(duration: number) {
        return new Promise(resolve => setTimeout(resolve, duration * 1000));
    }

    async function getSuggestions(query: string) {
        await sleep(0.5);
        const res = await fetch(`/api/search/${encodeURIComponent(query)}`)
        const data = (await res.json());
        setSuggestions(data[1]);
    }

    useEffect(() => {
        document.addEventListener('keydown', focusBinding);

        return () => {
            document.removeEventListener('keydown', focusBinding);
        };
    }, []);

    if (settings.searchEnabled) {
        return (
            <div className='flex flex-row absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] items-center z-2'>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "60vw" }}
                    transition={{ duration: settings.animTime }}
                    whileFocus={{ width: "70vw" }}
                >
                    <div className='flex flex-col relative'>

                        <input
                            autoFocus
                            ref={inputRef}
                            onFocus={() => { setInputFocused(true) }}
                            onBlur={() => { setInputFocused(false) }}
                            onChange={onQueryChange}
                            onKeyDown={onKeydown}
                            className='glass p-4 inputBox w-full h-full border-none outline-none text-center' placeholder='Search something here...' />
                        <AnimatePresence>
                            {
                                suggestions.length != 0 && inputFocused ?
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        transition={{ duration: settings.animTime, type: "spring" }}
                                        className="absolute top-full w-full glass mt-2 rounded-2xl flex flex-col 
                                        overflow-x-hidden overflow-y-scroll max-h-[25vh]">
                                        {
                                            suggestions.map((item, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => { setQuery(item); SearchNow(item); console.log("called") }}
                                                    className='flex flex-row px-8 duration-200 hover:bg-[var(--bg-darkest)] 
                                                    cursor-pointer p-1 border-1 border-[var(--bg-darker)]
                                                    '>
                                                    <SearchIcon size={18} />
                                                    <h1 className='ml-8 flex text-center w-full'>
                                                        {item}
                                                    </h1>
                                                </div>
                                            ))
                                        }
                                    </motion.div> : null
                            }
                        </AnimatePresence>

                    </div>
                </motion.div>
                <Button
                    icon={
                        <Search size={30} />
                    }
                    func={() => { SearchNow(query) }}
                    moreClasses="ml-4 p-3"
                />
            </div>

        )

    }
}