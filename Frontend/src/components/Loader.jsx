import { useState } from "react";
import { useLoaderStore } from "../stores/useLoaderStore";
import image from '../assets/img/ff.gif'

export const Loader = ({ children }) => {

    const [ text, setText ] = useState('Estamos cargando la información');
    const { isLoading } = useLoaderStore();
    if (!isLoading) return children;

    setTimeout(() => {
        setText('Ya casi terminamos...');
    }, 15000)

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-20 backdrop-blur-sm">
                {/* <div className="animate-pulse rounded-full h-32 w-32 border-2 border-cyan-400 mb-7"></div> */}
                <img src={image} alt="loading" className="w-32 h-32 mb-10" />
            <div className="container fixed z-50 ">
                <div className="progress progress-striped ">
                    <div className="progress-bar mt-44"></div>
                </div>
                <p className="mt-2 font-semibold">{text}</p>
            </div>
            </div>
        </>
    );
};
