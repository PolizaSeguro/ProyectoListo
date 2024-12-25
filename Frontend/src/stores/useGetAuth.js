import { useEffect, useState } from 'react';
import { useSocketStore } from './useSocketStore';

export const useGetAuth = () => {
    const [auth, setAuth] = useState(false);

    const { socket } = useSocketStore();

    useEffect(() => {
        // Manejar el inicio de sesión
        socket.on('inicio-sesion', (isAuthenticated) => {
            setAuth(isAuthenticated);
        });

        return () => {
            socket.off('inicio-sesion');
        };
    }, []);

    return { auth, socket };
};