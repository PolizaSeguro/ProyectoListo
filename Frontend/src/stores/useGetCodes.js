import { useEffect, useState } from 'react';
import { useSocketStore } from './useSocketStore';

export const useGetCodes = () => {
    const [codes, setCodes] = useState([]);
    const { socket } = useSocketStore();

    useEffect(() => {

        // Fetch initial data
        socket.on('initialData', (initialCodes) => {
            setCodes(initialCodes);
        });

        // Handle code added
        socket.on('codeAdded', (code) => {
            setCodes((prevCodes) => [...prevCodes, code]);
        });

        // Handle code updated
        socket.on('codeUpdated', (updatedCode) => {
            setCodes((prevCodes) => prevCodes.map(code => code._id === updatedCode._id ? updatedCode : code));
        });

        return () => {
            socket.off('initialData');
            socket.off('codeAdded');
            socket.off('codeUpdated');
        };
    }, []);

    return { codes };
};