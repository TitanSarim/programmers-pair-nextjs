"use server";

import { db } from "@/db";
import { room } from "@/db/schema";
import { eq, ilike, like } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { unstable_noStore } from "next/cache";

export async function getRooms(search: string | undefined){
    unstable_noStore()

    const trimmedSearch = search?.trim();
    console.log("trimmedSearch", trimmedSearch)
    const where = search ? ilike(room.language, `%${trimmedSearch}`) : undefined;

    const rooms = await db.query.room.findMany({
        where
    });
    return rooms
}

export async function getRoom(roomId: string){
    unstable_noStore()

    return await db.query.room.findFirst({
        where: eq(room.id, roomId)
    })
}

export async function GetUserRooms() {

    const session = await getSession()

    if(!session){
        throw new Error("you must be logged in to delete your account");
    }

    const rooms =  await db.query.room.findMany({
        where: eq(room.userId, session?.user.id) 
    });

    return rooms
}


export async function deleteRoom(roomId: string) {
    await db.delete(room).where(eq(room.id, roomId))
}