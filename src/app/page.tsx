import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getRooms } from "@/data-access/rooms";
import SearchBar from "@/components/SearchBar";
import { RoomCard } from "@/components/RoomCard";
import { unstable_noStore } from "next/cache";
import { getSession } from "@/lib/auth";



export default async function Home({searchParams}:{searchParams:{search: string}}) {


  unstable_noStore()
  const rooms = await getRooms(searchParams.search);
  const session = await getSession()

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-4xl">Find Your Dev</h1>
        <div className="flex flex-row gap-4">
          {session && (
            <Button asChild><Link href="/your-rooms">Your Rooms</Link></Button>
          )}
          <Button asChild><Link href="/create-room">Create Room</Link></Button>
        </div>
      </div>
      <div className="w-[100%] mt-12">
        <SearchBar/>
      </div>
      <div className="flex flex-wrap w-full mt-12 gap-12">
        {rooms?.map((room) =>(
            <RoomCard key={room.id} room={room}/>
        ))}
      </div>
    </main>
  );
}
