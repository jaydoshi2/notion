"use client";
import React from 'react';
import {LiveblocksProvider} from '@liveblocks/react'
interface LiveBlocksProviderProps {
  children: React.ReactNode;
}
console.log(process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_URL)
function LiveBlocksProvider({ children }: LiveBlocksProviderProps) {
  if (!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_URL) {
    throw new Error("NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_URL is not set");
  }

  return <LiveblocksProvider throttle={16} authEndpoint={"/auth-endpoint"}>
    {children}
    </LiveblocksProvider>;
}

export default LiveBlocksProvider;
