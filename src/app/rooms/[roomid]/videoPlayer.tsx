'use client'

import '@stream-io/video-react-sdk/dist/css/styles.css';
import { useEffect, useState } from 'react';
import {
    CallControls,
    StreamCall,
    StreamTheme,
    StreamVideo,
    SpeakerLayout,
    StreamVideoClient,
    Call,
  } from '@stream-io/video-react-sdk';
import { useSession } from 'next-auth/react';
import { Room } from '@/db/schema';
  
  const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY as string;
//   const token = process.env.NEXT_SECRET_GET_STREAM_API_KEY as string;
  const token = ""
  
  
export const VideoPlayer = ({room}: {room: Room}) => {

   
    const session =  useSession()

    const [client, setClient] = useState<StreamVideoClient | null>(null)
    const [call, setCall] = useState<Call| null>(null)

    useEffect(()=> {
        if(!room) {
            return
        }    
        if(!session || !session.data || !session.data.user){
            return;
        }
        const userId = session.data.user.id
        const client = new StreamVideoClient({ apiKey, user:{id: userId}, token });
        const call = client.call('default', room.id);
        call.join({ create: true });
        setClient(client);
        setCall(call)
        return() => {
            call.leave();
            client.disconnectUser();
        }

    }, [room, session])

    return client && call &&(
        <StreamVideo client={client}>
        <StreamTheme width="100" height="100">
            <StreamCall call={call}>
                <SpeakerLayout/>
                <CallControls/>
            </StreamCall>
        </StreamTheme>
      </StreamVideo>
    );
  };

