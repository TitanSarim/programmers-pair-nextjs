import { getRoom } from "@/data-access/rooms"
import {Linkedin } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { VideoPlayer } from "./videoPlayer"

export default async function RoomPage(props: {params: {roomid: string}}){

    const roomId = props.params.roomid

    const room = await getRoom(roomId)

    if(!room){
        return <div>No room found with this ID</div>
    }

    const languages = room.language.split(',').map((lang) => lang.trim());

    return(
        <div className="relative mt-10 w-[100%] flex flex-wrap items-start justify-center gap-8">
            <div className="w-[80%] bg-card text-card-foreground border border-slate-300 min-h-[70vh] rounded-lg dark:border-slate-800">
                <VideoPlayer room={room} />
            </div>
            <div className="w-[16%] bg-card text-card-foreground border border-slate-300 h-[100%] rounded-lg px-4 py-4 flex flex-col gap-6 dark:border-slate-800">
                <h1 className="dark:text-gray-200 text-black-800">Topic: {room?.name}</h1>
                <div className="flex flex-col gap-2 ">
                    <p className="text-gray-400">Description:</p>
                    <span className="text-gray-400 text-sm">{room?.description}</span>
                    
                    <div className="flex flex-wrap w-full gap-3 mt-4">
                        {languages.map((lang)=> (
                            <Badge key={lang} variant="outline" className="w-fit py-2 px-4">{lang}</Badge>
                        ))}
                    </div>

                    {room?.Linkedin && 
                        <Link href={room?.Linkedin} className="flex items-center gap-2 mt-2" target="_blank" rel="noopener noreferrer">
                            <Linkedin size={20} /> LinkedIn
                        </Link>
                    }
                </div>
            </div>
        </div>
    )

}