import React, { FormEvent, useEffect, useState, useTransition } from 'react';
import { Input } from './input';
import { Button } from './button';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import Editor from './Editor';
import useOwner from '@/lib/useOwner';
import DeleteDocument from './DeleteDocument';
import InviteUser from './InviteUser';
import ManageUsers from './ManageUser';
import Avatars from './Avatars';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from 'lucide-react';

const Document = ({ id }: { id: string }) => {
  const [input, setInput] = useState("");
  const [isUpdating, startTransition] = useTransition();
  const [data, loading, error] = useDocumentData(doc(db, "document", id));
  const isOwner = useOwner();
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    if (data) {
      setInput(data.title);
      setIsPublished(data.published || false);
    }
  }, [data]);

  const updateTitle = (e: FormEvent) => {
    e.preventDefault();

    if (input.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db, "document", id), {
          title: input,
        });
      });
    }
  };

  const publishDocument = async () => {
    startTransition(async () => {
      await updateDoc(doc(db, "document", id), {
        published: true,
      });
      setIsPublished(true);
    });
  };

  const menuOptions = (
    <>
      <form onSubmit={updateTitle} className="flex flex-col space-y-4">
        {/* Input and Update button */}
        <div className="flex items-center space-x-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow"
            placeholder="Update Title"
          />
          <Button disabled={isUpdating} type="submit">
            {isUpdating ? "Updating" : "Update"}
          </Button>
        </div>

        {/* Owner-only buttons */}
        {isOwner && (
          <>
            <div className="space-y-2 w-full">
              <Button className="w-full" onClick={publishDocument} disabled={isPublished}>
                {isPublished ? "Published" : "Publish"}
              </Button>
              <InviteUser />
              <DeleteDocument />
            </div>
          </>
        )}

        {/* User Management */}
        <ManageUsers />

        {/* Avatars */}
        <Avatars />

        {/* Published Link */}
        {isPublished && (
          <div className="mt-6 space-y-2">
            <p className="text-sm font-semibold">Published Link:</p>
            <a
              href={`/doc/${id}/published`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline break-all"
            >
              {`${typeof window !== 'undefined' ? window.location.origin : ''}/doc/published/${id}`}
            </a>
          </div>
        )}
      </form>
    </>
  );

  return (
    <div className='flex-1 h-full bg-white p-5'>
      {/* Mobile View: Sidebar with MenuIcon on the Right */}
      <div className="md:hidden flex justify-end">
        <Sheet>
          <SheetTrigger>
            <div className="md:hidden flex justify-end">
              <MenuIcon className="p-2 hover:opacity-30 rounded-lg ml-auto" size={40} />
            </div>
          </SheetTrigger>
          <SheetContent side={"right"}>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <div>
                {menuOptions}
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex max-w-6xl mx-auto justify-between pb-5">
        <form onSubmit={updateTitle} className='flex flex-1 space-x-2'>
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
          <Button disabled={isUpdating} type="submit">
            {isUpdating ? "Updating" : "Update"}
          </Button>
          {isOwner && (
            <>
              <InviteUser />
              <DeleteDocument />
              <Button onClick={publishDocument} disabled={isPublished}>
                {isPublished ? "Published" : "Publish"}
              </Button>
            </>
          )}
        </form>
      </div>

      {/* Desktop: User management */}
      <div className="hidden md:flex max-w-6xl mx-auto justify-between items-center mb-5">
        <ManageUsers />
        <Avatars />
      </div>

      {/* Editor Content */}
      <Editor />

      {/* Published Link (Only for desktop) */}
      {isPublished && (
        <div className="hidden md:block mt-4 max-w-6xl mx-auto">
          <p>Published Link:</p>
          <a href={`/doc/${id}/published`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            {`${typeof window !== 'undefined' ? window.location.origin : ''}/doc/published/${id}`}
          </a>
        </div>
      )}
    </div>
  );
};

export default Document;
