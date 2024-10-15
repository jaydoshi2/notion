import React, { useEffect, useState } from 'react';
import { useRoom } from '@liveblocks/react';
import * as Y from 'yjs';
import { LiveblocksYjsProvider } from '@liveblocks/yjs';
import { Button } from './button';
import { MoonIcon, SunIcon } from 'lucide-react';
import BlockNote from './BlockNote';
import TranslateDocument from "./TranslateDocument";
import { useUser } from '@clerk/nextjs';

interface ReadOnlyEditorProps {
  readOnly?: boolean;
  documentTitle?: string;
  documentId: string;
  documentContent: string;
}

function ReadOnlyEditor({ readOnly = true, documentTitle, documentId, documentContent }: ReadOnlyEditorProps) {
    const room = useRoom();
    const [doc, setDoc] = useState<Y.Doc | null>(null);
    const [provider, setProvider] = useState<LiveblocksYjsProvider | null>(null);
    const [darkMode, setDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useUser();

    useEffect(() => {
        let yDoc: Y.Doc | null = null;
        let yProvider: LiveblocksYjsProvider | null = null;

        const initializeRoom = async () => {
            setIsLoading(true);
            if (room) {
                yDoc = new Y.Doc();
                yProvider = new LiveblocksYjsProvider(room, yDoc);
                setDoc(yDoc);
                setProvider(yProvider);
            }
            setIsLoading(false);
        };

        initializeRoom();

        return () => {
            yDoc?.destroy();
            yProvider?.destroy();
        };
    }, [room]);

    if (isLoading) {
        return <div>Loading document...</div>;
    }

    if (!doc || !provider || !room) {
        return <div>Unable to load the document. Please try again later.</div>;
    }

    const style = `hover:text-white ${
        darkMode
            ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700"
            : "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"
    }`;

    const userInfo = user 
        ? { 
            name: user.fullName || user.username || 'Anonymous', 
            email: user.primaryEmailAddress?.emailAddress || 'anonymous@example.com'
          }
        : null;

    return (
        <div className="max-w-6xl mx-auto">
            {documentTitle && <h1 className="text-3xl font-bold mb-5">{documentTitle}</h1>}
            <div className="flex items-center gap-2 justify-end mb-10">
                <TranslateDocument doc={doc} />
                <Button className={style} onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? <SunIcon /> : <MoonIcon />}
                </Button>
            </div>
            <BlockNote 
                doc={doc} 
                provider={provider} 
                darkMode={darkMode} 
                readOnly={readOnly} 
                userInfo={userInfo}
                initialContent={documentContent}
            />
        </div>
    );
}

export default ReadOnlyEditor;