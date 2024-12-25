import { useState, useEffect } from 'react';
import { useSocketStore } from '../stores/useSocketStore';

export const useGetBuyMessage = (placa) => {
  const [messageBuy, setMessageBuy] = useState([]);
  const { socket } = useSocketStore();

  useEffect(() => {
      
      socket.emit('fetch-message-by-plate', placa);

      socket.on('initial-message', (placa) => {
        setMessageBuy(placa);
      })

      socket.on('addMessageBuy', (messageBuy) => {
        console.log(messageBuy)
        setMessageBuy((prevMessageBuy) => [...prevMessageBuy, messageBuy]);
      });

      socket.on('actualiza-message', (updateMessageBuy) => {
        setMessageBuy((prevMessageBuy) =>
          prevMessageBuy.map((messageBuy) =>
            messageBuy._id === updateMessageBuy._id ? updateMessageBuy : messageBuy
          )
        );
      });

      socket.on('messageBuyAdded', (messageBuy) => {
        setMessageBuy((prevMessageBuy) => [...prevMessageBuy, messageBuy]);
      }); 

      return () => {
        socket.off('initial-message');
        socket.off('addMessageBuy');
        socket.off('actualiza-message');
      };
    }, [socket]);


  return { messageBuy };
};