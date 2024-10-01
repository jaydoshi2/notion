"use client"
import { useRouter } from "next/navigation"; // Change to 'next/navigation' for Next.js 13
import { Button } from "./button";
import React, { useTransition } from 'react'
import { createNewDocument } from "@/actions/actions";

const NewDocumentButton = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreateDocument = async () => {
    console.log("handleCreateDocument called");
    startTransition(async () => {
      
      const { docId } = await createNewDocument();
      router.push(`/doc/${docId}`);
    });
  };

  return (
    <Button onClick={handleCreateDocument} disabled={isPending}>
      {isPending ? "Creating...." : "New Document Button"}
    </Button>
  );
};

export default NewDocumentButton;
