import React, { useState, useEffect } from 'react';
import { useModalStore } from '../stores/useModalStore';
import { Controller, useForm } from 'react-hook-form';
import { useSocketStore } from '../stores/useSocketStore';

export const MessageArea = ({ id: ide, state: status, codes, placa: datoPlaca }) => {
    const {socket} = useSocketStore();
    const { changeStateModal } = useModalStore();
    const [selectedCodeId, setSelectedCodeId] = useState('');
    const { handleSubmit, register, formState: { errors }, control } = useForm();
    // Función que se ejecuta al enviar el formulario
    const onSubmitButton = (data) => {
        const selectedCode = codes.find(code => code._id === selectedCodeId);
        if (!selectedCode) {
            alert('Seleccione un valor');
            return;
        }
        // Emitir evento 'addMessageBuy' con los datos del mensaje
        socket.emit('addMessageBuy', {
            message: data.message,
            title: selectedCode.title,
            value: selectedCode.code,
            placa: datoPlaca,
        });

        // Emitir evento 'actualiza-datos' con los datos actualizados
        socket.emit('actualiza-datos', {
            _id: ide,
            state: '🔴',
            placa: '',
          
        });
        changeStateModal(false);
    };
    return (
        <div className='flex flex-col justify-center text-center m-auto items-center p-4'>
            <form className='flex flex-col justify-center text-center m-auto items-center p-4' onSubmit={handleSubmit(onSubmitButton)}>
                <h1 className='text-2xl mb-2 font-bold'>Mensaje</h1>
                <select
                    value={selectedCodeId}
                    onChange={(e) => setSelectedCodeId(e.target.value)}
                    className='border-2 border-gray-400 rounded-lg p-2 m-2'
                >
                    <option value='' >Seleccione un valor</option>
                    {codes.map(code => (
                        <option key={code._id} value={code._id}>{code.title}</option>
                    ))}
                </select>
                <Controller
                    name='message'
                    control={control}
                    rules={{ required: 'Campo requerido' }}
                    render={({ field }) => (
                        <textarea
                            {...field}
                            cols={30}
                            rows={5}
                            // maxLength={100}
                            className='border-2 border-gray-400 rounded-lg p-2 m-2 resize-none h-[230px]'
                        />
                    )}
                />
                <button
                    className='bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 w-3/6 items-center'
                    type='submit'
                >
                    Enviar
                </button>
            </form>
        </div>
    );
};