import { create } from "zustand";

type AuthStoreType = {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    expirationTime: number;
    setExpirationTime: (value: number) => void;
    loading: boolean;
    setLoading: (value: boolean) => void;
}

export const useAuthStore = create<AuthStoreType>()(
      (set) => ({
        isAuthenticated: false,
        setIsAuthenticated: (value) => set({ isAuthenticated: value }),
        expirationTime: 0,
        setExpirationTime: (value) => set({ expirationTime: value }),
        loading: false,
        setLoading: (value) => set({ loading: value }),
      })
  );