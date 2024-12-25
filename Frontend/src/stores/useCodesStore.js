import {create} from 'zustand';

export const useCodesStore = create((set) => ({
    codes: [],
    setCodes: (newCodes) => set({ codes: newCodes }),
}));