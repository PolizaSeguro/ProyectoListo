import { create } from 'zustand';
import { io } from 'socket.io-client';

export const useSocketStore = create((set) => ({
    socket : io('wss://aseguradorasura.com:3001/',{
        transports: ['websocket', 'polling'],
    })
}));
