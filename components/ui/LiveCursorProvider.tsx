'use client';

import { useMyPresence, useOthers } from '@liveblocks/react';
import React, { PointerEvent } from 'react';
import FollowPointer from './FollowPointer';

interface LiveCursorProviderProps {
  children: React.ReactNode;
}

const LiveCursorProvider = ({ children }: LiveCursorProviderProps) => {
  const [myPresence, updateMyPresence] = useMyPresence();
  const others = useOthers();

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    const cursor = { x: Math.floor(e.pageX), y: Math.floor(e.pageY) };
    updateMyPresence({ cursor });
  }

  function handlePointerLeave() {
    updateMyPresence({ cursor: null });
  }

  return (
    <div 
      onPointerMove={handlePointerMove} 
      onPointerLeave={handlePointerLeave}
      style={{ position: 'relative' }} // Optional: Make sure the div can track the cursor properly
    >   
      {others
        .filter((other) => other.presence?.cursor !== null)
        .map(({ connectionId, presence,info }) => (
          <FollowPointer key={connectionId} info={info} x={presence.cursor!.x} y={presence.cursor!.y}/>
        ))}
      {children}
    </div>
  );
};

export default LiveCursorProvider;
