"use server";

import { editRoom, getRoom } from '@/data-access/rooms';
import { db } from '@/db';
import { room, Room } from '@/db/schema';
import { getSession } from '@/lib/auth';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';
import {redirect} from 'next/navigation'

export async function editRoomAction(roomData: Room) {

    const session = await getSession()

    console.log("roomData", roomData.id);
    const room =  await getRoom(roomData.id);
    console.log("Room", room)


    if(room?.userId !== session?.user.id){
        throw new Error("You are not allowed to edit")
    }

    await editRoom(roomData)
    revalidatePath("/your-rooms")
    revalidatePath(`/edit-room/${roomData.id}`)
    redirect('/your-rooms')
}