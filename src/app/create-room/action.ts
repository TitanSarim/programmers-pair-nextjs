"use server";

import { db } from '@/db';
import { room, Room } from '@/db/schema';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';


export async function createRoomAction(roomData: Omit<Room, "id">) {
    
    const password = roomData.password;
    let hashedPassword = null
    if(password){
        hashedPassword = await bcrypt.hash(password, 10);
    }else{
        hashedPassword = ""
    }

    await db.insert(room).values({ ...roomData, password: hashedPassword, userId: roomData.userId });

    revalidatePath("/")
}