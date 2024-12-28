import { create } from 'zustand';
import { io } from 'socket.io-client';

export const useSocketStore = create((set) => ({
    socket : io('https://147.93.40.118:3000',{
        transports: ['websocket']
    })
}));
