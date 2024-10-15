import { useRoom, useSelf } from '@liveblocks/react';
import * as Y from 'yjs';
import { LiveblocksYjsProvider } from '@liveblocks/yjs';
import { Button } from './button';
import { MoonIcon, SunIcon } from 'lucide-react';
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from '@blocknote/shadcn';
import React, { useEffect, useState } from 'react';
import stringToColor from "@/lib/StringToColor";
import TranslateDocument from "./TranslateDocument";

type EditorProps = {
  doc: Y.Doc;
  provider: LiveblocksYjsProvider;
  darkMode: boolean;
  readOnly: boolean;
  documentTitle: string;
};

function BlockNote({ doc, provider, darkMode, readOnly, documentTitle }: EditorProps) {
  const userInfo = useSelf((me) => me?.info || { name: 'Anonymous', email: 'anonymous@example.com' });

  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,
      fragment: doc.getXmlFragment("document-store"),
      user: {
        name: userInfo.name,
        color: stringToColor(userInfo.email),
      },
    },
  });

  return (
    <div className="relative max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold">{documentTitle}</h2>
      <BlockNoteView
        className="min-h-screen w-full text-left pl-1"
        editor={editor}
        theme={darkMode ? "dark" : "light"}
        editable={!readOnly}
      />
    </div>
  );
}

function ReadOnlyEditor({ readOnly = true, documentTitle }: { readOnly?: boolean, documentTitle: string }) {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc | null>(null);
  const [provider, setProvider] = useState<LiveblocksYjsProvider | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const userInfo = useSelf((me) => me?.info || { name: 'Anonymous', email: 'anonymous@example.com' });

  useEffect(() => {
    if (room) {
      const yDoc = new Y.Doc();
      const yProvider = new LiveblocksYjsProvider(room, yDoc);
      setDoc(yDoc);
      setProvider(yProvider);

      return () => {
        yDoc.destroy();
        yProvider.destroy();
      };
    }
  }, [room]);

  if (!doc || !provider || !room) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-2 justify-end mb-10">
        <TranslateDocument doc={doc} />
        <Button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>
      <BlockNote doc={doc} provider={provider} darkMode={darkMode} readOnly={readOnly} documentTitle={documentTitle} />
    </div>
  );
}

export default ReadOnlyEditor;