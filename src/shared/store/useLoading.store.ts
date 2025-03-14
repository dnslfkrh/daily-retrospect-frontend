import { create } from "zustand";

interface LoadingState {
  isLoading: boolean;
  startLoading: () => void;
  endLoading: () => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  startLoading: () => set({ isLoading: true }),
  endLoading: () => set({ isLoading: false }),
}));
