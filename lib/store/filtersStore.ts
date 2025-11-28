import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CarFilters } from "@/types/cars";

interface FiltersState {
  filters: CarFilters;
  setFilter: (key: keyof CarFilters, value: string) => void;
  setFilters: (filters: CarFilters) => void;
  clearFilters: () => void;
  hasActiveFilters: () => boolean;
}

export const useFiltersStore = create<FiltersState>()(
  persist(
    (set, get) => ({
      filters: {
        brand: undefined,
        rentalPrice: undefined,
        minMileage: undefined,
        maxMileage: undefined,
      },

      setFilter: (key, value) =>
        set((state) => ({
          filters: {
            ...state.filters,
            [key]: value || undefined,
          },
        })),

      setFilters: (filters) => set({ filters }),

      clearFilters: () =>
        set({
          filters: {
            brand: undefined,
            rentalPrice: undefined,
            minMileage: undefined,
            maxMileage: undefined,
          },
        }),

      hasActiveFilters: () => {
        const { filters } = get();
        return Object.values(filters).some(
          (value) => value !== undefined && value !== ""
        );
      },
    }),
    {
      name: "car-filters-storage",
    }
  )
);
