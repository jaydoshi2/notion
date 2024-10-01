"use client"
import React, { useEffect, useState } from 'react'
import NewDocumentButton from './NewDocumentButton'
import { useCollection } from 'react-firebase-hooks/firestore'

import { MenuIcon } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { collectionGroup, query, where } from 'firebase/firestore'
import { db } from '@/firebase'
import { DocumentData } from 'firebase-admin/firestore'
import SidebarOption from './SidebarOption'

interface RoomDocument extends DocumentData {
    createdAt: string;
    role: 'owner' | 'editor'
    roomId: string,
    userId: string,
}

const Sidebar = () => {
    const { user } = useUser()
    const [data, loading, error] = useCollection(
        user && (
            query(collectionGroup(db, 'rooms'), where('userId', '==', user.emailAddresses[0].emailAddress))
        )
    );
    const [groupedData, setGroupedData] = useState<{
        owner: RoomDocument[],
        editor: RoomDocument[]
    }>({
        owner: [],
        editor: [],
    });

    useEffect(() => {
        if (!data) return;
        console.log("Raw data:", data.docs.map(doc => doc.data()));
        
        const grouped = data.docs.reduce<{
            owner: RoomDocument[]
            editor: RoomDocument[]
        }>(
            (acc, curr) => {
                const roomData = curr.data() as RoomDocument;
                if (roomData.role === 'owner') {
                    acc.owner.push({ id: curr.id, ...roomData })
                } else {
                    acc.editor.push({ id: curr.id, ...roomData })
                }
                return acc
            }, {
            owner: [],
            editor: [],
        }
        )
        setGroupedData(grouped);
        console.log("Grouped data:", grouped);
    }, [data])

    const menuOptions = (
        <>
            <NewDocumentButton />

            <div className='flex py-4 flex-col space-y-4 md:max-w-36'>
                {/* MY DOCUMENTS */}
                {groupedData.owner.length == 0 ? (
                    <h2 className='text-gray-500 font-semibold text-sm'> NO DOCUMENT FOUND </h2>
                ) : (
                    <>
                        <h2 className="text-gray-500 font-semibold text-sm"> MY DOCUMENTS</h2>
                        {groupedData.owner.map((doc) => (
                            <SidebarOption key={doc.roomId} id={doc.id} href={`/doc/${doc.id}`} />
                        ))}
                    </>
                )}
            </div>

            {/* Shared With Me */}
            <div className='flex py-4 flex-col space-y-4 md:max-w-36'>
                {groupedData.editor.length > 0 && (
                    <>
                        <h2 className="text-gray-500 font-semibold text-sm">SHARED WITH ME</h2>
                        {groupedData.editor.map((doc) => (
                            <SidebarOption key={doc.roomId} id={doc.id} href={`/doc/${doc.id}`} />
                        ))}
                    </>
                )}
            </div>
        </>
    );

    return (
        <div className='p-2 md:p-5 bg-gray-200 relative'>
            {/* This part will show on small screens (mobile view) */}

            {/* This part will show on medium screens and larger */}
            <div className='hidden md:block'>
                {menuOptions}
            </div>
        </div>
    )
}

export default Sidebar