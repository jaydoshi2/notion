import { db } from '@/firebase'
import { useUser } from '@clerk/nextjs'
import { useRoom } from '@liveblocks/react'
import { collectionGroup, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
const useOwner = () => {
  // State to track if the user is an owner
  const [isOwner, setIsOwner] = useState(false)
  
  // Get the current user from Clerk
  const { user } = useUser()
  
  // Get the current room from Liveblocks
  const room = useRoom()
  
  // Firestore query to get users in the current room
  const [usersInRoom] = useCollection(
    user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
  );

  // Effect to check if the current user is an owner whenever users in the room or user changes
  useEffect(() => {
    // Check if there are users in the room
    if (usersInRoom?.docs && usersInRoom.docs.length > 0) {
      // Filter users to find those with the role of "owner"
      const owners = usersInRoom.docs.filter(
        (doc) => doc.data().role === "owner"
      )
      
      // Check if the current user is in the list of owners
      if (
        owners.some((owner) => owner.data().userId === user?.emailAddresses[0].toString())
      ) {
        setIsOwner(true); // Set isOwner to true if the user is found among owners
      }
    };
  }, [usersInRoom, user]) // Dependencies for the effect

  return isOwner; // Return the ownership status
}

export default useOwner; // Export the custom hook
