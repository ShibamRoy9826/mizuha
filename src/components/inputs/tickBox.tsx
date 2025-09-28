import { Square, SquareCheck } from "lucide-react"
import React, { useState } from "react";

interface Props {
    ticked: boolean;
    setTicked: (a: boolean) => void;
}
export default function TickBox({ ticked, setTicked }: Props) {

    return (
        <div
            className="flex items-center justify-center cursor-pointer"
            onClick={() => { setTicked(!ticked); }}>
            {
                ticked ?
                    <SquareCheck size={25} /> :
                    <Square size={25} />
            }
        </div>
    )
}