import React, { useEffect, useState } from "react";
import Button from "./button";
// deps
import { Text } from "@tiptap/extension-text";
import { Document } from "@tiptap/extension-document";
import { ListItem } from "@tiptap/extension-list-item";
import { Paragraph } from "@tiptap/extension-paragraph";

//editor
import { useEditor, EditorContent } from '@tiptap/react';

//exts
import { Blockquote } from "@tiptap/extension-blockquote";
import { BulletList } from "@tiptap/extension-bullet-list";
import { Heading } from "@tiptap/extension-heading";
import { Bold } from "@tiptap/extension-bold";
import { Italic } from "@tiptap/extension-italic";
import { Underline } from "@tiptap/extension-underline";
import { Strike } from "@tiptap/extension-strike";
import { BoldIcon, Heading1, ItalicIcon, List, Quote, StrikethroughIcon, UnderlineIcon } from "lucide-react";
import { useNotesContext } from "@/contexts/notes";

interface Props {
    currIndex: number | null;
    content: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
    title: string;
}

export default function EditorBox({ currIndex, title, content, onChange }: Props) {
    const { updateItem, list } = useNotesContext();

    const editor = useEditor({
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        onBlur: ({ editor }) => {
            const html = editor.getHTML();
            if (currIndex !== null) {
                updateItem(currIndex, title, content);
                console.log();
            } else {
                // for new note
                localStorage.setItem("noteTemp", JSON.stringify({ title: title, text: html }));
            }
        },
        editorProps: {
            attributes: {
                class: 'focus:outline-none',
            },
        },
        extensions: [Strike,
            Blockquote.configure({
                HTMLAttributes: {
                    class: "bg-[var(--bg-darker)] p-2 rounded-md"
                }
            }),
            BulletList.configure({
                HTMLAttributes: {
                    class: "ml-4"
                }
            }),
            ListItem.configure({
                HTMLAttributes: {
                    class: "bulletListItem"
                }
            }),
            Heading.configure({
                levels: [1, 2, 3],
                HTMLAttributes: {
                    class: "text-3xl"
                }
            },
            ),
            Text,
            Document,
            Paragraph,
            Bold,
            Italic,
            Underline],
        content: content,
        immediatelyRender: false,
        injectCSS: true,
        enableInputRules: false
    })

    const [, setRefresh] = useState(false);

    useEffect(() => {
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
    }, [editor]);

    useEffect(() => {
        if (currIndex !== null) {
            const data = list[currIndex];

            if (data && editor) {
                editor.commands.setContent(data.text);
            }
        } else {
            const data = localStorage.getItem("noteTemp");
            if (data && editor) {
                editor.commands.setContent(JSON.parse(data).text);
            }
        }
    }, [editor])


    return (
        <div className="w-full h-full flex flex-col items-center p-4 bg-[var(--bg-darker)] rounded-xl row-span-3 col-span-2 overflow-y-scroll ">

            <div className="flex flex-row rounded-lg p-2 w-full border-[var(--primary)] items-center justify-center gap-1">
                <Button
                    func={() => editor?.chain().focus().toggleBulletList().run()}
                    icon={
                        <List size={20} />
                    }
                    active={editor?.isActive("bulletList")}
                />

                <Button
                    func={() => editor?.chain().focus().toggleBlockquote().run()}
                    icon={
                        <Quote size={20} />
                    }
                    active={editor?.isActive("blockquote")}
                />

                <Button
                    func={() => editor?.chain().focus().toggleBold().run()}
                    icon={
                        <BoldIcon size={20} />
                    }
                    active={editor?.isActive("bold")}
                />

                <Button
                    func={() => editor?.chain().focus().toggleItalic().run()}
                    icon={
                        <ItalicIcon size={20} />
                    }
                    active={editor?.isActive("italic")}
                />

                <Button
                    func={() => editor?.chain().focus().toggleUnderline().run()}
                    icon={
                        <UnderlineIcon size={20} />
                    }
                    active={editor?.isActive("underline")}
                />

                <Button
                    func={() => editor?.chain().focus().toggleStrike().run()}
                    icon={
                        <StrikethroughIcon size={20} />
                    }
                    active={editor?.isActive("strike")}
                />

                <Button
                    func={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                    icon={
                        <Heading1 size={20} />
                    }
                    active={editor?.isActive("heading")}
                />
            </div>

            <div className="w-full border-1 border-[var(--bg-darker)] resize">
                <EditorContent
                    className="
                editorContent
                min-h-[15vh]
     rounded-xl p-2 m-2 
     "
                    editor={editor} />

            </div>

        </div>
    )
}