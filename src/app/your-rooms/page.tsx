
import { Button } from '@/components/ui/button';
import { GetUserRooms } from '@/data-access/rooms';
import Link from "next/link";
import { UserRoomCard } from './RoomCard';
import { unstable_noStore } from 'next/cache';


export default async function YourRoomsPage() {

  unstable_noStore()
  const rooms = await GetUserRooms()

  return (
    <main className="flex flex-col items-center justify-between p-24">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-4xl">Your Rooms</h1>
          <Button asChild><Link href="/create-room">Create Room</Link></Button>
        </div>

        <div className="flex flex-wrap w-full mt-12 gap-12">
        {rooms?.map((room) =>(
            <UserRoomCard key={room.id} room={room}/>
        ))}
        </div>
    </main>
  );
}
