import React, { useEffect, useState } from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import BreadCrumbs from './BreadCrumbs'
import { MenuIcon } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import NewDocumentButton from './NewDocumentButton'
import { useUser } from '@clerk/nextjs'
import { collectionGroup, query, where } from 'firebase/firestore'
import { db } from '@/firebase'
import { DocumentData } from 'firebase-admin/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import SidebarOption from './SidebarOption'
interface RoomDocument extends DocumentData {
  createdAt: string;
  role: 'owner' | 'editor'
  roomId: string,
  userId: string,
}
const Header = () => {

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

    <>
      <header className="flex items-center justify-between p-4 sm:p-6 text-black bg-white shadow-md">
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <MenuIcon className='p-2 hover:opacity-30 rounded-lg' size={40} />
            </SheetTrigger>
            <SheetContent side={"left"}>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <div>
                  {menuOptions}
                </div>

              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex items-center space-x-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Notion-logo.svg/100px-Notion-logo.svg.png"
            alt="Notion Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 transition-colors duration-300 select-none"
          />
          <h1 className="text-lg sm:text-2xl font-semibold">Notion</h1>
          <div className="hidden md:block">
            <BreadCrumbs />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <SignedIn>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </header>
    </>
  )
}

export default Header
