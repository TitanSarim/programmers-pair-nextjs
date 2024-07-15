import { Button } from "@/components/ui/button";
import { db } from "@/db";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Room } from "@/db/schema";
import { Linkedin, LockIcon } from "lucide-react";
import { getRooms } from "@/data-access/rooms";
import { truncateText } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";


function RoomCard({room}: {room: Room}){

  const languages = room.language.split(',').map((lang) => lang.trim());


  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{truncateText(room.description, 50)}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap w-full gap-3 mb-4">
            {languages.map((lang)=> (
                <Badge key={lang} variant="outline" className="w-fit py-2 px-4">{lang}</Badge>
            ))}
        </div>
        {room.Linkedin && <Link href={room.Linkedin} className="flex items-center gap-2" target="_blank" rel="noopener noreferrer"><Linkedin size={20} /> LinkedIn</Link>}
      </CardContent>
      <CardFooter>
        {room.password ? (
          <Button asChild>
            <Link href={`/rooms/${room.id}`}>Join Room</Link>
          </Button>
        ) : (
          <Button className="flex items-center"><LockIcon size={20} className="mr-2"/> Join Room</Button>
        )}
      </CardFooter>
    </Card>
  )
}


export default async function Home() {

  const rooms = await getRooms();


  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-4xl">Find Your Dev</h1>
        <Button asChild><Link href="/create-room">Create Room</Link></Button>
      </div>
      <div className="flex flex-wrap w-full mt-12 gap-12">
        {rooms?.map((room) =>(
            <RoomCard key={room.id} room={room}/>
        ))}
      </div>
    </main>
  );
}
