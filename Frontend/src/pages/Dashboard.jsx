import { useEffect, useState } from "react";
import { useLoaderStore } from "../stores/useLoaderStore";
import { useModalStore } from "../stores/useModalStore";
import { MessageArea } from "../components/MessageArea";
import { AdministrateCodes } from "./AdministrateCodes";
import { useGetDatos } from "../stores/useGetDatos";
import { useGetCodes } from "../stores/useGetCodes";
import { useSocketStore } from "../stores/useSocketStore";

export const Dashboard = () => {

    const { socket } = useSocketStore()
    const { codes } = useGetCodes();
    const { setLoading } = useLoaderStore();
    const { setContent, changeStateModal } = useModalStore();
    const { datos } = useGetDatos();
    const [data, setData] = useState([]);
    const [respondedItems, setRespondedItems] = useState({});
    
    useEffect(() => {
        setLoading(false);
        if (datos) {
            setData(datos); 
        }
    }, [datos]);

    const updateResponseStatus = (id, responded) => {
        setData(prevData => prevData.map(item => 
            item._id === id ? { ...item, state: responded ? '🟢' : '🔴', respondido: responded ? 'Si' : 'No' } : item
        ));
        setRespondedItems(prev => ({ ...prev, [id]: responded }));
    };

    const onClickChange = (id, state,placa) => {
        navigator.clipboard.writeText(placa);
        changeStateModal(true);
        setContent(<MessageArea onSend={() => updateResponseStatus(id, true)} id={id} state={state} codes={codes} placa={placa}/>);
    };

    return (
        <div className="flex flex-col justify-start items-center min-h-screen">
            <div className="flex flex-col items-center justify-center w-8/12 mt-5">
                <table className="m-auto self-center text-center table-auto w-full h-52 overflow-auto"style={{ maxHeight: '300px', overflowY: codes.length > 5 ? 'scroll' : 'auto' }} >
                    <thead className="bg-blue-400">
                        <tr>
                            <th className="mr-10 p-2">ID</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Placa</th>
                            <th className="p-2">Opciones</th>
                        </tr>
                    </thead>
                    {data && data.length > 0 ? (
                        data.map((item) => (
                            <tbody key={item.id} className="border border-blue-800">
                                <tr className="border border-s-violet-200">
                                    <td className="p-2">{item._id}</td>
                                    <td className="p-2">{item.state}</td>
                                    <td className="p-2">{item.placa}</td>
                                    <td>
                                        <button 
                                            onClick={() => onClickChange(item._id, item.state, item.placa)}
                                            className={`bg-blue-700 text-white p-1 rounded-md hover:bg-blue-500 ${item.state === '🔴' ? 'cursor-not-allowed bg-blue-100' : ''}`}
                                            type="submit"
                                            // disabled={respondedItems[item.id]}
                                            disabled={item.state === '🔴'}
                                        >
                                            Mensaje
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        ))
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan="5" className="p-2">No hay datos disponibles</td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
            <div className="flex flex-row justify-center items-center mt-5 gap-20">
                <button className="bg-green-700 text-white p-1 rounded-md hover:bg-blue-500"
                    onClick={() => socket.emit('borra-mensajes') }
                >
                    Borrar Mensajes
                </button>
                <button className="bg-yellow-700 text-white p-1 rounded-md hover:bg-blue-500"
                    onClick={() => socket.emit('borrar-respuestas') }
                
                >
                    Borrar Respuestas
                </button>
            </div>
           
            <AdministrateCodes />
        </div>
    );
};