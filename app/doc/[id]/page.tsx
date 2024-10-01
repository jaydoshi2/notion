"use client"
import React from 'react'
import Document from '@/components/ui/Document'
const DocuemntPage = ({ params: { id } }: { params: { id: string, } }) => {

    return (
        <div className='flex flex-col flex-1 min-h-screen'>
            <Document id={id}></Document>
        </div>
    )
}

export default DocuemntPage