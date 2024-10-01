"use client"

import { db } from '@/firebase'
import { doc } from 'firebase/firestore'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore'

const SidebarOption = ({ href, id }: {
    href: string,
    id: string,
}) => {
    const [data, loading, error] = useDocumentData(doc(db, "document", id));
    const pathname = usePathname();
    const isActive = pathname === href;

    useEffect(() => {
        console.log(`SidebarOption for id ${id}:`, { data, loading, error });
    }, [id, data, loading, error]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) {
        console.log(`No data for document with id ${id}`);
        return null;
    }

    return (
        <Link href={href} className={`border p-2 rounded-md ${isActive ? "bg-gray-300 font-bold border-black" : "border-gray-400"}`}>
            <p className='truncate'>{data.title || 'Untitled'}</p>
        </Link>
    )
}

export default SidebarOption