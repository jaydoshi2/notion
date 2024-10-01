"use client"

import React, { startTransition, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Button } from './button'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { deleteDocument } from '@/actions/actions'
import { toast } from 'sonner'

function DeleteDocument() {
    const [isOpen, setIsOpen] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const pathname = usePathname()
    const router = useRouter()
    const handleDelete = () => {
        setIsPending(true)
        const roomId = pathname.split('/').pop();
        if(!roomId) return;
        startTransition(async()=>{
            const {success} = await deleteDocument(roomId);

            if(success){
                setIsOpen(false)
                router.replace('/');
                toast.success("Room Deleted Successfully")
            }else{
                toast.error("Falied to delete room!.. ")
            }
            
        })
        // Add your delete logic here
        // Once complete, you can close the dialog and reset isPending
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant="destructive">
                <DialogTrigger>Delete</DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure you want to Delete?</DialogTitle>
                    <DialogDescription>
                        This will delete the document and all its contents, removing all
                        
                        users from the document.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end gap-2">
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isPending}
                    >
                        {isPending ? "Deleting..." : "Delete"}
                    </Button>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteDocument