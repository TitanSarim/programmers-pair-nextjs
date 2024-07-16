'use server'

import { deleteRoom, getRoom } from "@/data-access/rooms"
import { getSession } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function deleteRoomAction(roomId: string){

    const session = await getSession()

    if(!session){
        throw new Error("You are not allowed to delete")
    }

    const room = await getRoom(roomId)
    if (room?.userId !== session.user.id){
        throw new Error("You are not allowed to delete")
    }

    await deleteRoom(roomId)

    revalidatePath("/tour-rooms")
}