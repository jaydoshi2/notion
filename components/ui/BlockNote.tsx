import React, { useEffect } from 'react';
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from '@blocknote/shadcn';
import { LiveblocksYjsProvider } from '@liveblocks/yjs';
import * as Y from 'yjs';
import stringToColor from "@/lib/StringToColor";

type UserInfo = 
  | { name: string; email: string; }
  | null
  | undefined;

type BlockNoteProps = {
    doc: Y.Doc;
    provider: LiveblocksYjsProvider;
    darkMode: boolean;
    readOnly: boolean;
    userInfo: UserInfo;
    initialContent: string;
};

function BlockNote({ doc, provider, darkMode, readOnly, userInfo, initialContent }: BlockNoteProps) {
    const getUserInfo = () => {
        if (!userInfo) {
            return { name: 'Anonymous', color: stringToColor('default@email.com') };
        }
        return {
            name: userInfo.name,
            color: stringToColor(userInfo.email)
        };
    };

    const { name, color } = getUserInfo();

    const editor: BlockNoteEditor = useCreateBlockNote({
        collaboration: {
            provider,
            fragment: doc.getXmlFragment("document-store"),
            user: { name, color },
        },
    });

    useEffect(() => {
        if (initialContent && editor) {
            try {
                const parsedContent = JSON.parse(initialContent);
                editor.replaceBlocks(editor.topLevelBlocks, parsedContent);
            } catch (error) {
                console.error("Error parsing initial content:", error);
            }
        }
    }, [editor, initialContent]);

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

export default BlockNote;