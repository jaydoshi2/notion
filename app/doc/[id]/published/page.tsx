'use client'

import { useParams } from 'next/navigation'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { doc } from 'firebase/firestore'
import { db } from '@/firebase'
import ReadOnlyEditor from '@/components/ui/ReadOnlyEditor'

const PublishedDocument = () => {
  const params = useParams()
  const id = params?.id as string

  const documentRef = doc(db, "document", id)

  const [data, loading, error] = useDocumentData(documentRef)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!data || !data.published) return <div>This document is not published</div>

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">{data.title}</h1>
      <ReadOnlyEditor />
    </div>
  )
}

// Bypass the default layout
PublishedDocument.getLayout = function getLayout(page: React.ReactNode) {
  return page // Directly return the page without wrapping it in a layout
}

export default PublishedDocument
