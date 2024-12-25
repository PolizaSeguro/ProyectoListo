import { create } from 'zustand';

const getAuth = () => {
    const isAuth = sessionStorage.getItem('isAuth');
    return isAuth ? JSON.parse(isAuth) : false;
};

export const useAuthStore = create((set) => ({
    isAuth: getAuth(),
    // setAuth: (isAuth) => {
    //     set({ isAuth });
    //     sessionStorage.setItem('isAuth', isAuth.toString());
    // }
}));
