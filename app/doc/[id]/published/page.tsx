'use client'

import { useParams } from 'next/navigation'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import ReadOnlyEditor from '@/components/ui/ReadOnlyEditor'
import { useUser } from '@clerk/nextjs'

const PublishedDocument = () => {
  const params = useParams()
  const id = params?.id as string
  const [error, setError] = useState<string | null>(null)
  const [documentData, setDocumentData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { isLoaded, isSignedIn, user } = useUser()

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const docRef = doc(getFirestore(), "documents", id)
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          const data = docSnap.data()
          if (data.published || (isSignedIn && data.userId === user?.id)) {
            setDocumentData(data)
          } else {
            setError("This document is not published or you don't have permission to view it.")
          }
        } else {
          setError("Document not found")
        }
      } catch (err) {
        console.error("Error fetching document:", err)
        setError("An error occurred while fetching the document")
      } finally {
        setLoading(false)
      }
    }

    if (isLoaded) {
      fetchDocument()
    }
  }, [id, isLoaded, isSignedIn, user])

  if (!isLoaded || loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  if (!documentData) return <div>No document data available</div>

  return (
    <div className="max-w-6xl mx-auto p-5">
      <ReadOnlyEditor documentId={id} documentTitle={documentData.title} documentContent={documentData.content} readOnly={true} />
    </div>
  )
}

export default PublishedDocument