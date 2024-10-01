'use client'

import { usePathname } from 'next/navigation'
import Header from "@/components/ui/Header";
import Sidebar from "@/components/ui/Sidebar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname()

  if (pathname?.includes('/published')) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-4 bg-gray-100 overflow-y-auto scrollbar-hide">
          {children}
        </div>
      </div>
    </>
  )
}