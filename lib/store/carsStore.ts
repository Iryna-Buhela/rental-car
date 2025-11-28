import { create } from "zustand";
import { Car } from "@/types/cars";

interface CarsState {
  cars: Car[];
  totalCars: number;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;

  setCars: (cars: Car[]) => void;
  appendCars: (cars: Car[]) => void;
  setTotalCars: (total: number) => void;
  setCurrentPage: (page: number) => void;
  setTotalPages: (pages: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useCarsStore = create<CarsState>((set) => ({
  cars: [],
  totalCars: 0,
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  error: null,

  setCars: (cars) => set({ cars }),

  appendCars: (newCars) =>
    set((state) => ({
      cars: [...state.cars, ...newCars],
    })),

  setTotalCars: (total) => set({ totalCars: total }),

  setCurrentPage: (page) => set({ currentPage: page }),

  setTotalPages: (pages) => set({ totalPages: pages }),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  reset: () =>
    set({
      cars: [],
      totalCars: 0,
      currentPage: 1,
      totalPages: 1,
      isLoading: false,
      error: null,
    }),
}));
