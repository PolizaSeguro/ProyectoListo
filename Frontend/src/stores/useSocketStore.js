import { create } from 'zustand';
import { io } from 'socket.io-client';

export const useSocketStore = create((set) => ({
    socket : io('https://proyecto-listo-2wd6.vercel.app/:3000',{
        transports: ['websocket']
    })
}));
