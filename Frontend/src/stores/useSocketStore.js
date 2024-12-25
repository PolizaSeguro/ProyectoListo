import { create } from 'zustand';
import { io } from 'socket.io-client';

export const useSocketStore = create((set) => ({
    socket : io('https://proyecto-listo.vercel.app/',{
        transports: ['websocket']
    })
}));
