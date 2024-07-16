'use server' 

import {StreamChat} from 'stream-chat';

export async function generateTokenAction(userId: string) {


    const api_key = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY as string;
    const api_secret= process.env.NEXT_SECRET_GET_STREAM_API_KEY as string;

    const serverClient = StreamChat.getInstance(api_key, api_secret)

    const token  = serverClient.createToken(userId)

    return token
}