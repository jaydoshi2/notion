import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";

import { useRoom, useSelf } from '@liveblocks/react';
import * as Y from 'yjs';
import { LiveblocksYjsProvider } from '@liveblocks/yjs';
import { Button } from './button';
import { MoonIcon, SunIcon } from 'lucide-react';
import { BlockNoteView } from '@blocknote/shadcn';
import React, { useEffect, useState } from 'react';
import stringToColor from "@/lib/StringToColor";
import TranslateDocument from "./TranslateDocument";

type EditorProps = {
    doc: Y.Doc;
    provider: LiveblocksYjsProvider;
    darkMode: boolean;
    readOnly: boolean;
};

function BlockNote({ doc, provider, darkMode, readOnly }: EditorProps) {
    const userInfo = useSelf((me) => me.info);

    console.log("User Info in BlockNote:", userInfo);
    console.log("user Name ", userInfo?.name || "Anonymous")

    const editor: BlockNoteEditor = useCreateBlockNote({
        collaboration: {
            provider,
            fragment: doc.getXmlFragment("document-store"),
            user: {
                name: userInfo?.name || 'Anonymous',
                color: stringToColor(userInfo?.email || 'default@email.com'),
            },
        },
    });

    return (
        <div className="relative max-w-6xl mx-auto">
            <BlockNoteView
                className="min-h-screen w-full text-left pl-1"
                editor={editor}
                theme={darkMode ? "dark" : "light"}
                editable={!readOnly}
            />
        </div>
    );
}

function ReadOnlyEditor({  readOnly = true }) {
    const room = useRoom();
    const [doc, setDoc] = useState<Y.Doc | null>(null);
    const [provider, setProvider] = useState<LiveblocksYjsProvider | null>(null);
    const [darkMode, setDarkMode] = useState(false);
    const userInfo = useSelf((me) => me.info);

    useEffect(() => {
        if (room) {
            const yDoc = new Y.Doc();
            const yProvider = new LiveblocksYjsProvider(room, yDoc);
            setDoc(yDoc);
            setProvider(yProvider);

            return () => {
                yDoc?.destroy();
                yProvider?.destroy();
            };
        }
    }, [room]);

    console.log("Room:", room);
    console.log("User Info in ReadOnlyEditor:", userInfo);

    if (!doc || !provider || !room || !userInfo) {
        return <div>Loading...</div>;
    }

    const style = `hover:text-white ${darkMode
        ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700"
        : "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"
        }`;

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 justify-end mb-10">
                {/* Dark Mode Toggle */}

                <TranslateDocument doc={doc} />

                <Button className={style} onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? <SunIcon /> : <MoonIcon />}
                </Button>
            </div>
            <BlockNote doc={doc} provider={provider} darkMode={darkMode} readOnly = {readOnly} />
        </div>
    );
}

export default ReadOnlyEditor;

