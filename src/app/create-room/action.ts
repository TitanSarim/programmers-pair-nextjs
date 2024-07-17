"use server";

import { createRoom } from '@/data-access/rooms';
import { db } from '@/db';
import { room, Room } from '@/db/schema';
import { revalidatePath } from 'next/cache';


export async function createRoomAction(roomData: Omit<Room, "id">) {
    
    await createRoom(roomData)

    revalidatePath("/")
}