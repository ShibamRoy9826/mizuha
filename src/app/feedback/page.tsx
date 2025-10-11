"use client"
import Button from "@/components/inputs/button";
import { useRef } from "react";
import { RedirectType, redirect } from "next/navigation";

export default function Feedback() {
    const emailRef = useRef<HTMLInputElement>(null);
    const messageRef = useRef<HTMLTextAreaElement>(null);

    async function handleSubmit() {
        const email = emailRef.current?.value ?? "anonymous@email.com";
        const message = messageRef.current?.value

        if (!message) {
            console.log(message);
            alert("Please enter a message before submitting....");
            return;
        }


        const res = await fetch("https://formspree.io/f/mkgqqyjk", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, message
            })
        })

        if (!res.ok) {
            alert("Failed to submit feedback, please try again!");
        } else {
            redirect("/feedback/thanks", RedirectType.replace);
        }

    }

    return (
        <div className="glass absolute left-[50%] top-[50%] 
        -translate-x-[50%] -translate-y-[50%] p-8 gap-4 flex flex-col items-center">

            <h1 className="text-center text-2xl ">Do you like this app? :3</h1>
            <p className="text-center mb-4">If you have any suggestions or found a bug that you want to report, please let me know!</p>
            <div
                className="flex flex-col items-center justify-center w-full h-full gap-4"
            >

                <label className="text-left w-full">Your Email:</label>
                <input
                    ref={emailRef}
                    placeholder="Your email (optional, so that I can reply back to you)"
                    className="w-full flex settingsField p-4 min-h-[3rem]"
                    type="email"
                    name="email"
                />

                <label className="text-left w-full">Your Message*:</label>
                <textarea
                    ref={messageRef}
                    placeholder="Tell me what you think..."
                    name="message"
                    className="settingsField p-6 min-h-[8rem] w-full flex" />

                <div className="flex items-center justify-center">
                    <Button
                        text="Submit"
                        func={() => { handleSubmit(); }}
                        moreClasses="mt-4 w-fit"
                    />
                </div>
            </div>

        </div>
    )
}