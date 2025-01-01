import { create } from 'zustand';
import { io } from 'socket.io-client';

export const useSocketStore = create((set) => ({
    socket : io('http://147.93.40.118:4000',{
        transports: ['websocket'],
    })
}));
