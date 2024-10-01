"use client";
import React from 'react';
import { ClientSideSuspense, RoomProvider as RoomProviderWrapper } from '@liveblocks/react';
import LoadingSpinner from './LoadingSpinner';
import LiveCursorProvider from './LiveCursorProvider';

interface RoomProviderProps {
  roomId: string;
  children: React.ReactNode;
}

const RoomProvider = ({ roomId, children }: RoomProviderProps) => {
  return (
    <RoomProviderWrapper id={roomId} initialPresence={{ cursor: null }}>

      <ClientSideSuspense fallback={<LoadingSpinner />}>
        <LiveCursorProvider>    {children} </LiveCursorProvider>
      </ClientSideSuspense>

    </RoomProviderWrapper>
  );
};

export default RoomProvider;
