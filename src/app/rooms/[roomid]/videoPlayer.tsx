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
    CallParticipantsList,
  } from '@stream-io/video-react-sdk';
import { useSession } from 'next-auth/react';
import { Room } from '@/db/schema';
import { generateTokenAction } from './actions';
import { useRouter } from 'next/navigation';
  
const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY as string;
  
  
export const VideoPlayer = ({room}: {room: Room}) => {

   
    const session =  useSession()

    const [client, setClient] = useState<StreamVideoClient | null>(null)
    const [call, setCall] = useState<Call| null>(null);
    const router = useRouter()

    useEffect(()=> {
        if(!room) {
            return
        }    
        if(!session.data){
            return;
        }
        const userId = session.data.user.id
        const userName = session.data.user.name
        const userImage = session.data.user.image
        const client = new StreamVideoClient({ apiKey, user:{id: userId ?? 'undefined', name:userName ?? 'undefined', image: userImage ?? 'undefined' }, tokenProvider: () => generateTokenAction(userId)});
        const call = client.call('default', room.id);
        call.join({ create: true });
        setClient(client);
        setCall(call)
        return() => {
            call.leave().then(() => {
              client.disconnectUser();
            });
        }

    }, [room, session])

    return client && call &&(
        <StreamVideo client={client}>
        <StreamTheme width="100" height="100">
            <StreamCall call={call}>
                <SpeakerLayout/>
                <CallControls onLeave={() => router.push('/')}/>
                <CallParticipantsList onClose={() => undefined}/>
            </StreamCall>
        </StreamTheme>
      </StreamVideo>
    );
  };

