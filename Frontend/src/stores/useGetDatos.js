import { useEffect, useState } from 'react';
import { useSocketStore } from './useSocketStore';

export const useGetDatos = () => {
    const [datos, setDatos] = useState([]);
    const { socket } = useSocketStore();
    useEffect(() => {
        // Fetch initial data
        socket.on('initial-datos', (initialDatos) => {
            setDatos(initialDatos);
        });

        // Handle code added
        socket.on('register-data', (dato) => {
            setDatos((prevDatos) => [...prevDatos, dato]);
        });

        // Handle code updated
        socket.on('actualiza-datos', (updatedDato) => {
            console.log(updatedDato)
            setDatos((prevDatos) => prevDatos.map(dato => dato._id === updatedDato._id ? updatedDato : dato));
        });
        
        // Handle code deleted
        socket.on('elimina-datos', (deletedDatoId) => {
            setDatos((prevDatos) => prevDatos.filter(dato => dato._id !== deletedDatoId));
        });

        return () => {
            socket.off('initial-datos');
            socket.off('register-data');
            socket.off('actualiza-datos');
            socket.off('elimina-datos');
        };
    }, [socket,datos]);

    return { datos, socket };
};