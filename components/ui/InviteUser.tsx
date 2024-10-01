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
import { deleteDocument, inviteUserToDocument } from '@/actions/actions'
import { toast } from 'sonner'
import { Input } from './input'

function InviteUser() {
    const [isOpen, setIsOpen] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [email,setEmail] = useState("")
    const pathname = usePathname()
    const router = useRouter()
    const handleInvite = (e:FormEvent) => {
        e.preventDefault()
        setIsPending(true)
        
        const roomId = pathname.split("/").pop()
        if(!roomId) return;
        startTransition(async()=>{
            const {success} = await inviteUserToDocument(roomId,email);

            if(success){
                setIsOpen(false)
                setEmail('')
                toast.success("User Added to Document Successfully")
            }else{
                toast.error("Falied to Add in the room!.. ")
            }
            
        })
        // Add your delete logic here
        // Once complete, you can close the dialog and reset isPending
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant="outline">
                <DialogTrigger>Invite</DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invite User to collborate?</DialogTitle>
                    <DialogDescription>
                        Enter the email of the user you want to invite
                    </DialogDescription>
                </DialogHeader>
            <form className='flex gap-2' onSubmit={handleInvite}>
                <Input type='email' placeholder='Email' className='w-full' value={email} onChange ={(e)=>setEmail(e.target.value)}/>
                <Button type='submit'disabled={!email ||isPending} >
                    {isPending? "Inviting...":"Invite"}
                </Button>
            </form>
            </DialogContent>
        </Dialog>
    )
}

export default InviteUser