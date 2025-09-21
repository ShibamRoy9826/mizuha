'use client';
import React, { useRef, createContext, useContext, useEffect, useState } from "react";
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

type modalContextType = {
    setContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setDirection: React.Dispatch<React.SetStateAction<"left" | "right" | "up" | "down">>;
    isVisible: boolean;
}

const ModalContext = createContext<modalContextType | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
    const windowSize = useRef({ width: 0, height: 0 })
    const elementSize = useRef({ width: 0, height: 0 })
    const [content, setContent] = useState<React.ReactNode | null>(null);
    const [pos, setPos] = useState({ x: 0, y: 0 })
    const modalRef = useRef<null | HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [direction, setDirection] = useState<"left" | "right" | "up" | "down">("left");

    function updateWindowSize() {
        windowSize.current = { width: window.innerWidth, height: window.innerHeight };
    }
    useEffect(() => {
        updateWindowSize();
        window.addEventListener('resize', updateWindowSize);
        return () => window.removeEventListener('resize', updateWindowSize);
    }, [])

    useEffect(() => {
        if (!modalRef.current) return;
        elementSize.current = { width: modalRef.current.offsetWidth, height: modalRef.current.offsetHeight };
    }, [modalRef.current])

    useEffect(() => {
        elementSize.current = {
            width: modalRef.current ? modalRef.current.offsetWidth : 0,
            height: modalRef.current ? modalRef.current.offsetHeight : 0
        };
        if (isVisible) {
            console.log({
                x: (windowSize.current.width - elementSize.current.width) / 2,
                y: (windowSize.current.height - elementSize.current.height / 2)
            })
            setPos({
                x: (windowSize.current.width - elementSize.current.width) / 2,
                y: (windowSize.current.height - elementSize.current.height) / 2
            });
        }
    }, [isVisible]);

    function getInitialState(direction: "left" | "right" | "up" | "down") {
        switch (direction) {
            case "left":
                return { opacity: 0, scale: 0.5, x: "-50vw", y: "50vh" }
            case "right":
                return { opacity: 0, scale: 0.5, x: "150vw", y: "50vh" }
            case "up":
                return { opacity: 0, scale: 0.5, x: "50vw", y: "-50vh" }
            case "down":
                return { opacity: 0, scale: 0.5, x: "50vw", y: "150vh" }

        }
    }


    return (
        <ModalContext.Provider value={
            {
                setIsVisible,
                setContent,
                isVisible,
                setDirection
            }
        }>
            <AnimatePresence>
                {
                    isVisible &&
                    <motion.div
                        className='glass flex flex-col resize absolute z-10'
                        initial={
                            getInitialState(direction)
                        }
                        animate={{ opacity: 1, scale: 1, x: pos.x, y: pos.y }}
                        exit={
                            getInitialState(direction)
                        }
                        transition={{ duration: 0.3 }}
                        ref={modalRef}
                        drag
                        dragMomentum={false}
                    >
                        <div
                            className='w-full h-8 bg-[var(--bg-darkest)] inline-flex p-1 cursor-move'>
                            <div className='ml-auto flex items-center justify-center closeButton' onClick={() => setIsVisible(!isVisible)}>
                                <X size={20} />
                            </div>
                        </div>
                        <div className='p-4 flex items-center justify-center'>
                            {content}
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
            {children}
        </ModalContext.Provider>
    )
}


export function useModal() {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalContext");
    }
    return context;
}