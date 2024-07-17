'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Room } from "@/db/schema";
import { Linkedin, LockIcon, Pencil, Trash } from "lucide-react";
import { truncateText } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { deleteRoomAction } from "./actions";


export const UserRoomCard = ({room}: {room: Room}) => {

    const languages = room.language.split(',').map((lang) => lang.trim());

    return (
      <Card>
        <CardHeader>
          <div className="flex flex-row-reverse justify-between items-center">
            <Button size="icon" variant="outline" asChild>
              <Link href={`/edit-room/${room.id}`}><Pencil color="tomato"/></Link>
            </Button>
            <CardTitle>{truncateText(room.name, 40)}</CardTitle>
          </div>
          <CardDescription>{truncateText(room.description, 50)}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap w-full gap-3 mb-4">
              {languages.map((lang)=> (
                  <Badge key={lang} variant="outline" className="w-fit py-2 px-4 cursor-pointer"  tabIndex={0} role="button">{lang}</Badge>
              ))}
          </div>
          {room.Linkedin && <Link href={room.Linkedin} className="flex items-center gap-2" target="_blank" rel="noopener noreferrer"><Linkedin size={20} /> LinkedIn</Link>}
        </CardContent>
        <CardFooter>
          {room.isPrivate === 'Public' ? (
            <div className="flex flex-row gap-4">
              <Button asChild>
                <Link href={`/rooms/${room.id}`}>Join Room</Link>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant='secondary'>
                    <Trash color="red"/>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your room
                      and remove your data associated with it.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => {deleteRoomAction(room.id)}}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ) : (
            <div className="flex flex-row gap-4">
              <Button className="flex items-center"><LockIcon size={20} className="mr-2"/> Join Room</Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant='secondary'>
                    <Trash color="tomato"/>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account
                      and remove your data associated with it.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => {deleteRoomAction(room.id)}}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </CardFooter>

        

      </Card>
    )
}