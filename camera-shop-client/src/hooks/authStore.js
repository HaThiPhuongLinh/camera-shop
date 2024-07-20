import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      userId: null,
      cartId: null,
      totalItems: 0,
      totalPrice: 0,
      login: (userId, cartId, totalItems, totalPrice) => set({ userId, cartId, totalItems, totalPrice }),
      logout: () => set({ userId: null, cartId: null, totalItems: 0, totalPrice: 0 }),
      updateTotalItems: (totalItems) => set({ totalItems }),
      updateTotalPrice: (totalPrice) => set({ totalPrice }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;
