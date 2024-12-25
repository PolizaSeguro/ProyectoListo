import React from 'react';
import { useModalStore } from '../stores/useModalStore';

export const ModalCustom = () => {
    const { isModalOpen, content } = useModalStore();

    if (!isModalOpen) return null;

    return (
        <div className="fixed z-50 inset-0 overflow-y-auto backdrop-blur-sm flex items-center justify-center" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className=" inset-0 bg-gray-500 backdrop-blur-md bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle m-auto sm:max-w-lg sm:w-full">
                {content}
            </div>
        </div>
    );
};