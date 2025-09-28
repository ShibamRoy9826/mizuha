'use client';
import { useSettings } from '@/contexts/settingsData';
import { motion } from 'motion/react';
import Button from './button';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { SearchNow } from '@/utils/func';

export default function SearchBar() {

    const { settings } = useSettings();
    const [query, setQuery] = useState("");

    function onQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value);
    }

    function onKeydown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            SearchNow(query);
        }
    }

    if (settings.searchEnabled) {
        return (
            <div className='flex flex-row absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] items-center z-2'>

                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "60vw" }}
                    transition={{ duration: settings.animTime }}
                    whileFocus={{ width: "70vw" }}
                >
                    <input
                        onChange={onQueryChange}
                        onKeyDown={onKeydown}
                        className='glass p-4 inputBox w-full h-full border-none outline-none text-center' placeholder='Search something here...' />
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