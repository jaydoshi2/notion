"use client"

import React, { FormEvent, startTransition, useState } from 'react'
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
import { deleteDocument, inviteUserToDocument, removeUserFromDocument } from '@/actions/actions'
import { toast } from 'sonner'
import { Input } from './input'
import { useUser } from '@clerk/nextjs'
import { useRoom } from '@liveblocks/react'
import useOwner from '@/lib/useOwner'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collectionGroup, query, where } from 'firebase/firestore'
import { db } from '@/firebase'

function ManageUsers() {
    const { user } = useUser()
    const isOwner = useOwner()
    const room = useRoom()
    const [isOpen, setIsOpen] = useState(false)
    const [isPending, setIsPending] = useState(false)


    const [usersInRoom] = useCollection(user && query(collectionGroup(db, 'rooms'), where("roomId", "==", room.id)))
    console.log("USERS IN ROOMS", usersInRoom)
    const [pendingUser, setPendingUser] = useState<string | null>(null);

    const handleDelete = async (userId: string) => {
        setPendingUser(userId);
        startTransition(async () => {
            if (!user) return;
            const { success } = await removeUserFromDocument(room.id, userId);
            if (success) {
                toast.success("User removed from document");
            } else {
                toast.error("Failed to remove user");
            }
            setPendingUser(null);
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant="outline">
                <DialogTrigger>Users ({usersInRoom?.docs.length}) </DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invite User to collborate?</DialogTitle>
                    <DialogDescription>
                        Enter the email of the user you want to invite
                    </DialogDescription>
                </DialogHeader>
                <hr className='m' />
                <div className=''>
                    {usersInRoom?.docs.map((doc) => (
                        <div key={doc.data().userId} className="flex items-center justify-between">
                            <p className='font-light'>
                                {doc.data().userId === user?.emailAddresses[0].toString()
                                    ? `You ${doc.data().userId}` : doc.data().userId}
                            </p>
                            <div className='flex items-center gap-2'>
                                <Button variant="outline">{doc.data().role}</Button>
                                {isOwner &&
                                    doc.data().userId !== user?.emailAddresses[0].toString()
                                    && (
                                        <Button
                                            variant="destructive"
                                            onClick={() => handleDelete(doc.data().userId)}
                                            disabled={pendingUser === doc.data().userId}
                                            size='sm'
                                        >
                                            {pendingUser === doc.data().userId ? "Pending..." : "X"}
                                        </Button>

                                    )
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ManageUsers