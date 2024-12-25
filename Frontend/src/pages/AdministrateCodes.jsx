import React, { useEffect, useState } from 'react';
import { useLoaderStore } from '../stores/useLoaderStore';
import { useGetCodes } from '../stores/useGetCodes';
import { useSocketStore } from '../stores/useSocketStore';

export const AdministrateCodes = () => {
    
    const { socket } = useSocketStore();
    const [newCode, setNewCode] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const { setLoading } = useLoaderStore();
    const { codes } = useGetCodes();
    
    useEffect(() => {
        setLoading(false);
    }, []);
    
    const handleAddCode = () => {
        if (newCode.trim() !== '' && newTitle.trim() !== '') {

            const newCodeObj = { title: newTitle, code: newCode, active: true };
            socket.emit('addCode', newCodeObj);
            setNewCode('');
            setNewTitle('');
        }
    };

    const handleCopyCode = (code) => {
        navigator.clipboard.writeText(code);
    };

    return (
        <div className='p-4'>
            <div className='mt-4 flex flex-col sm:flex-row items-center'>
                <input 
                    type='text' 
                    placeholder='Add new title' 
                    className='border rounded px-2 py-1 flex-grow mb-2 sm:mb-0 sm:mr-2'
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
                <input 
                    type='text' 
                    placeholder='Add new code' 
                    className='border rounded px-2 py-1 flex-grow mb-2 sm:mb-0 sm:mr-2'
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                /> 
                <button 
                    onClick={handleAddCode}
                    className='px-2 py-1 bg-blue-500 text-white rounded'
                >
                    Agregar Código
                </button>
            </div>
            <div className='mt-4 overflow-x-auto' style={{ maxHeight: '400px', overflowY: codes.length > 5 ? 'scroll' : 'auto' }}>
                <table className='table-auto w-full'>
                    <thead>
                        <tr className='bg-blue-500 text-white'>
                            <th className='border px-2 py-1 sm:px-4 sm:py-2'>ID</th>
                            <th className='border px-2 py-1 sm:px-4 sm:py-2'>Precio</th>
                            <th className='border px-2 py-1 sm:px-4 sm:py-2'>Link</th>
                            <th className='border px-2 py-1 sm:px-4 sm:py-2'>Activar</th>
                            <th className='border px-2 py-1 sm:px-4 sm:py-2'>Desactivar</th>
                            <th className='border px-2 py-1 sm:px-4 sm:py-2'>Copiar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {codes.map((code, index) => (
                            <tr key={code._id} className={code.active ? '' : 'bg-gray-300'}>
                                <td className='border px-2 py-1 sm:px-4 sm:py-2'>{code._id}</td>
                                <td className='border px-2 py-1 sm:px-4 sm:py-2'>
                                    <input 
                                        type='text' 
                                        value={code.title} 
                                        onChange={(e) => {
                                            const updatedCode = { ...codes[index], title: e.target.value };
                                            socket.emit('updateCode', updatedCode);
                                        }}
                                        className='border rounded px-2 py-1 w-full'
                                        disabled={code.active}
                                    />
                                </td>
                                <td className='border px-2 py-1 sm:px-4 sm:py-2'>
                                    <input 
                                        type='text' 
                                        value={code.code} 
                                        onChange={(e) => {
                                            const updatedCode = { ...codes[index], code: e.target.value };
                                            socket.emit('updateCode', updatedCode);
                                        }}
                                        className='border rounded px-2 py-1 w-full'
                                        disabled={code.active}
                                    />
                                </td>
                              
                                <td className='border px-2 py-1 sm:px-4 sm:py-2'>
                                    <button 
                                        onClick={() => {
                                            const updatedCode = { ...codes[index], active: true };
                                            socket.emit('updateCode', updatedCode);
                                        }}
                                        className={`px-2 py-1 rounded ${code.active ? 'bg-green-500' : 'bg-gray-500'}`}
                                        disabled={code.active}
                                    >
                                        Activar
                                    </button>
                                </td>
                                <td className='border px-2 py-1 sm:px-4 sm:py-2'>
                                    <button 
                                        onClick={() => {
                                            const updatedCode = { ...codes[index], active: false };
                                            socket.emit('updateCode', updatedCode);
                                        }}
                                        className={`px-2 py-1 rounded ${!code.active ? 'bg-red-500' : 'bg-gray-500'}`}
                                        disabled={!code.active}
                                    >
                                        Desactivar
                                    </button>
                                </td>
                                <td className='border px-2 py-1 sm:px-4 sm:py-2'>
                                    <button 
                                        onClick={() => handleCopyCode(code.code)}
                                        className='px-2 py-1 bg-yellow-500 text-white rounded'
                                    >
                                        Copiar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};