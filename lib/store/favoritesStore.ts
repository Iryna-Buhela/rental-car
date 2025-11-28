import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface FavoritesStore {
  favorites: string[];
  hydrated: boolean;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  setHydrated: () => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      hydrated: false,

      addFavorite: (id) => {
        set((state) => ({
          favorites: [...state.favorites, id],
        }));
      },

      removeFavorite: (id) => {
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav !== id),
        }));
      },

      toggleFavorite: (id) => {
        const state = get();
        if (state.isFavorite(id)) {
          state.removeFavorite(id);
        } else {
          state.addFavorite(id);
        }
      },

      isFavorite: (id) => {
        const favs = get().favorites;
        return Array.isArray(favs) && favs.includes(id);
      },

      setHydrated: () => {
        set({ hydrated: true });
      },
    }),
    {
      name: "favorites-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
