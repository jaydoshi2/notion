import React, { useEffect, useState } from 'react';
import { useRoom, useSelf } from '@liveblocks/react';
import * as Y from 'yjs';
import { LiveblocksYjsProvider } from '@liveblocks/yjs';
import { Button } from './button';
import { MoonIcon, SunIcon } from 'lucide-react';
import BlockNote from './BlockNote'; // Assuming you've separated BlockNote into its own component
import TranslateDocument from "./TranslateDocument";

function ReadOnlyEditor({ readOnly = true }) {
    const room = useRoom();
    const [doc, setDoc] = useState<Y.Doc | null>(null);
    const [provider, setProvider] = useState<LiveblocksYjsProvider | null>(null);
    const [darkMode, setDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const userInfo = useSelf((me) => me.info);

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

    return (
        <div className="max-w-6xl mx-auto">
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
                userInfo={userInfo || { name: 'Anonymous', color: '#000000' }}
            />
        </div>
    );
}

export default ReadOnlyEditor;