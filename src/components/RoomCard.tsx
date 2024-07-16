'use client'
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
import { truncateText } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export const RoomCard = ({room}: {room: Room}) => {

    const languages = room.language.split(',').map((lang) => lang.trim());
    const router =  useRouter()
    const session = useSession()

    return (
      <Card>
        <CardHeader>
          <CardTitle>{room.name}</CardTitle>
          <CardDescription>{truncateText(room.description, 50)}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap w-full gap-3 mb-4">
              {languages.map((lang)=> (
                  <Badge key={lang} variant="outline" className="w-fit py-2 px-4 cursor-pointer" onClick={() => {router.push(`/?search=${lang}`)}} tabIndex={0} role="button">{lang}</Badge>
              ))}
          </div>
          {room.Linkedin && <Link href={room.Linkedin} className="flex items-center gap-2" target="_blank" rel="noopener noreferrer"><Linkedin size={20} /> LinkedIn</Link>}
        </CardContent>
        <CardFooter>
          {room.password ? (
            <Button asChild>
                {session.data ? (
                    <Link href={`/rooms/${room.id}`}>Join Room</Link>
                ) : (
                    <Link href={'/'}>Login To Join </Link>
                )}
            </Button>
          ) : (
            <>
                {session.data ? (
                    <Button className="flex items-center"><LockIcon size={20} className="mr-2"/> Join Room</Button>
                ):(
                    <Button className="flex items-center"><LockIcon size={20} className="mr-2"/>Login To Join</Button>
                )}
            </>
          )}
        </CardFooter>
      </Card>
    )
}