import { create } from 'zustand';
import { io } from 'socket.io-client';

export const useSocketStore = create((set) => ({
    socket : io('https://backend-proyecto-five.vercel.app',{
        transports: ['websocket']
    })
}));
