"use client"
import Button from "@/components/inputs/button";
import { ArrowLeft } from "lucide-react";
import { RedirectType, redirect } from "next/navigation";

export default function NotFound404() {
    return (
        <div className="glass absolute left-[50%] top-[50%] 
        -translate-x-[50%] -translate-y-[50%] p-8 gap-4 flex flex-col items-center">

            <h1 className="text-center text-2xl ">404, Page Not found:(</h1>
            <p className="text-center">The page you&apos;re trying to access doesn&apos;t exist... are you sure that you didn&apos;t make a typo?</p>
            <Button
                icon={
                    <ArrowLeft size={20} />
                }
                text="Go back to main page"
                func={() => { redirect('/', RedirectType.replace) }}
                moreClasses="gap-4"
            />

        </div>
    )
}