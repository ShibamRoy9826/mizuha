"use client";
import {useEffect,useState} from "react";
// deps
import {Text} from "@tiptap/extension-text";
import {Document} from "@tiptap/extension-document";
import {ListItem} from "@tiptap/extension-list-item";
import {Paragraph} from "@tiptap/extension-paragraph";

//editor
import { useEditor, EditorContent } from '@tiptap/react';

//exts
import {Blockquote} from "@tiptap/extension-blockquote";
import {BulletList} from "@tiptap/extension-bullet-list";
import {Heading} from "@tiptap/extension-heading";
import {Bold} from "@tiptap/extension-bold";
import {Italic} from "@tiptap/extension-italic";
import {Underline} from "@tiptap/extension-underline";
import {Strike} from "@tiptap/extension-strike";


export default function Journal(){
    const editor = useEditor({
        extensions: [Strike,Blockquote,BulletList,ListItem,Heading.configure({levels: [1, 2, 3],}),Text,Document,Paragraph,Bold,Italic,Underline],
        content: "<p> Have something important that you don't want to forget?<br> Note it down here!</p>",
        immediatelyRender: false,
        injectCSS:true,
        enableInputRules:false
    })

    const [, setRefresh] = useState(false);
    useEffect(()=>{
        if (!editor) return;
        const forceUpdate = () => {
            setRefresh((r) => !r);
        }
        editor.on('selectionUpdate', forceUpdate);
        editor.on('transaction', forceUpdate);
        return () => {
            editor.off('selectionUpdate', forceUpdate);
            editor.off('transaction', forceUpdate);
        };
    },[editor]);



    return(
        <div className="flex flex-col justify-center">
        {/* <div className="w-[25vw] rounded-xl p-2 outline-none duration-500 focus:bg-[var(--tint-strong)] border-1 border-[var(--primary)] resize" contentEditable/> */}
        <div className="flex flex-row rounded-lg p-2 w-full border-[var(--primary)] items-center justify-center">
            <button
            className='flex items-center justify-center duration-500 w-[2.4rem] h-[2.4rem] border-1 border-[var(--primary)] hover:bg-[var(--primary)]'
            style={{"backgroundColor":editor?.isActive("bulletList")?"var(--primary)":"var(--tint)"}}
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            >
                <svg className="w-[1rem] h-[1rem]" viewBox="0 -4 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="var(--fg)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>bullet-list</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Icon-Set" transform="translate(-570.000000, -209.000000)" fill="#ffffff"> <path d="M597,226 L579,226 C578.447,226 578,226.448 578,227 C578,227.553 578.447,228 579,228 L597,228 C597.553,228 598,227.553 598,227 C598,226.448 597.553,226 597,226 L597,226 Z M572,209 C570.896,209 570,209.896 570,211 C570,212.104 570.896,213 572,213 C573.104,213 574,212.104 574,211 C574,209.896 573.104,209 572,209 L572,209 Z M579,212 L597,212 C597.553,212 598,211.553 598,211 C598,210.447 597.553,210 597,210 L579,210 C578.447,210 578,210.447 578,211 C578,211.553 578.447,212 579,212 L579,212 Z M597,218 L579,218 C578.447,218 578,218.448 578,219 C578,219.553 578.447,220 579,220 L597,220 C597.553,220 598,219.553 598,219 C598,218.448 597.553,218 597,218 L597,218 Z M572,217 C570.896,217 570,217.896 570,219 C570,220.104 570.896,221 572,221 C573.104,221 574,220.104 574,219 C574,217.896 573.104,217 572,217 L572,217 Z M572,225 C570.896,225 570,225.896 570,227 C570,228.104 570.896,229 572,229 C573.104,229 574,228.104 574,227 C574,225.896 573.104,225 572,225 L572,225 Z" id="bullet-list"> </path> </g> </g> </g></svg>
            </button>
            <button
            className='flex items-center justify-center duration-500 w-[2.4rem] h-[2.4rem] border-1 border-[var(--primary)] hover:bg-[var(--primary)]'
            style={{"backgroundColor":editor?.isActive("blockQuote")?"var(--primary)":"var(--tint)"}}
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
            >
                <svg className="w-[1rem] h-[1rem]" fill="var(--fg)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M.78,8.89c0-3.07,1.53-4.3,4.3-4.34L5.38,6C3.78,6.17,3,7,3.1,8.31H4.54V12H.78Zm5.9,0c0-3.07,1.53-4.3,4.3-4.34L11.28,6C9.68,6.17,8.89,7,9,8.31h1.44V12H6.68Z"></path> <path d="M16.94,15.11c0,3.07-1.53,4.3-4.3,4.34L12.35,18c1.6-.16,2.39-1,2.28-2.3H13.18V12h3.76Zm5.9,0c0,3.07-1.53,4.3-4.3,4.34L18.24,18c1.6-.16,2.39-1,2.28-2.3H19.08V12h3.76Z"></path> </g></svg>
            </button>
            <button
            className='flex items-center justify-center duration-500 w-[2.4rem] h-[2.4rem] border-1 border-[var(--primary)] hover:bg-[var(--primary)]'
            style={{"backgroundColor":editor?.isActive("bold")?"var(--primary)":"var(--tint)"}}
            onClick={() => editor?.chain().focus().toggleBold().run()}
            >
<svg className="w-[1rem] h-[1rem]" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="var(--fg)" fillRule="evenodd" d="M4 1a1 1 0 00-1 1v16a1 1 0 001 1v-1 1h8a5 5 0 001.745-9.687A5 5 0 0010 1H4zm6 8a3 3 0 100-6H5v6h5zm-5 2v6h7a3 3 0 100-6H5z"></path> </g></svg>
            </button>
            <button
            className='flex items-center justify-center duration-500 w-[2.4rem] h-[2.4rem] border-1 border-[var(--primary)] hover:bg-[var(--primary)]'
            style={{"backgroundColor":editor?.isActive("italic")?"var(--primary)":"var(--tint)"}}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            >
                <svg className="w-[1rem] h-[1rem]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 3H20M4 21H14M15 3L9 21" stroke="var(--fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </button>
            <button
            className='flex items-center justify-center duration-500 w-[2.4rem] h-[2.4rem] border-1 border-[var(--primary)] hover:bg-[var(--primary)]'
            style={{"backgroundColor":editor?.isActive("underline")?"var(--primary)":"var(--tint)"}}
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
            >
                <svg className="w-[1rem] h-[1rem]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 21H20M18 4V11C18 14.3137 15.3137 17 12 17C8.68629 17 6 14.3137 6 11V4M4 3H8M16 3H20" stroke="var(--fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </button>

            <button
            className='flex items-center justify-center duration-500 w-[2.4rem] h-[2.4rem] border-1 border-[var(--primary)] hover:bg-[var(--primary)]'
            style={{"backgroundColor":editor?.isActive("strike")?"var(--primary)":"var(--tint)"}}
            onClick={() => editor?.chain().focus().toggleStrike().run()}
            >
                <svg className="w-[1rem] h-[1rem]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path stroke="var(--fg)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 5h-7a3 3 0 0 0-3 3v1a3 3 0 0 0 3 3h7M7 19h7a3 3 0 0 0 3-3v-1M5 12h14"></path></g></svg>
            </button>

            <button
            className='flex items-center justify-center duration-500 w-[2.4rem] h-[2.4rem] border-1 border-[var(--primary)] hover:bg-[var(--primary)]'
            style={{"backgroundColor":editor?.isActive("heading")?"var(--primary)":"var(--tint)"}}
            onClick={() => editor?.chain().focus().toggleHeading({level:1}).run()}
            >
                <svg className="w-[1rem] h-[1rem]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 3V21M18 12H7M18 3V21M4 21H8M4 3H8M16 21H20M16 3H20" stroke="var(--fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </button>
        </div>

        <EditorContent className="editor-content overflow-auto w-auto h-auto rounded-xl p-2 m-2 outline-none focus:bg-[var(--tint-strong)] border-1 border-[var(--primary)] resize" editor={editor} />
        </div>
    );
}