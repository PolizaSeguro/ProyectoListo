import { create } from 'zustand';
export const useModalStore = create((set) => ({
    
    isModalOpen: false,
    content: null,
    setContent: (content) => set({ content, isModalOpen: true }),
    changeStateModal: (state) => set({ isModalOpen: state })
}));
