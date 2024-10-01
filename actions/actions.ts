"use server"

import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server"
// import { title } from "process";

export async function createNewDocument() {
    auth().protect()

    const { sessionClaims } = await auth();

    const docCollectionRef = adminDb.collection("document")

    const docRef = await docCollectionRef.add({
        title: "New Doc"
    })

    await adminDb.collection('users').doc(sessionClaims?.email!).collection('rooms').doc(docRef.id).set({
        userId: sessionClaims?.email!,
        role: "owner",
        createdAt: new Date(),
        roomId: docRef.id,
    })

    return {docId:docRef.id}

}

export async function deleteDocument(roomId:string){
    auth().protect()

    console.log("deleteDocument",roomId);

    try{
        await adminDb.collection("document").doc(roomId).delete();
        const query = await adminDb.collectionGroup("rooms").where("roomId","==",roomId).get()

        const batch = adminDb.batch()

        query.docs.forEach((doc)=>{
            batch.delete(doc.ref)
        });

        await batch.commit()
        await liveblocks.deleteRoom(roomId);

        return {success:true}

    }catch(error){
        console.log(error)
        return{success:false}
    }
}

export async function inviteUserToDocument(roomId:string,email:string){
    auth().protect()
    console.log("Adduser in roomId ",roomId,email)
    try{
        await adminDb.collection("users")
        .doc(email)
        .collection("rooms")
        .doc(roomId)
        .set({
            userId:email,
            role:"editor",
            createdAt:new Date(),
            roomId,
        })
        return {success:true}
    }catch(error){
        console.log(error)
        return {succes:false}
    }
    
}
export async function removeUserFromDocument(roomId:string,userId:string){
    auth().protect()
    try {
        await adminDb
        .collection("users")
        .doc(userId)
        .collection('rooms')
        .doc(roomId)
        .delete()
        return {success:true}
    } catch (error) {
        return {success:false}
    }
}
