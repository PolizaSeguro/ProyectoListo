import { create } from 'zustand';
import { io } from 'socket.io-client';

export const useSocketStore = create((set) => {
    const isProduction = window.location.protocol === 'https:';
    const socketUrl = isProduction ? 'wss://147.93.40.118:4000' : 'ws://147.93.40.118:4000';

    return {
        socket: io(socketUrl, {
            transports: ['websocket'],
        }),
    };
});
