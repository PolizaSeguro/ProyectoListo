import { create } from 'zustand';

export const useLoaderStore = create((set) => ({
    isLoading: true,
    setLoading: (value) => set({ isLoading: value })
}))