"use client";

import { useEffect } from "react";
import { useFavoritesStore } from "@/lib/store/favoritesStore";
import Icon from "@/components/Icon/Icon";
import css from "./CarDetails.module.css";

interface FavoriteButtonProps {
  carId: string;
}

export default function FavoriteButton({ carId }: FavoriteButtonProps) {
  const { toggleFavorite, isFavorite, hydrated, setHydrated } =
    useFavoritesStore();

  useEffect(() => {
    if (!hydrated) setHydrated();
  }, [hydrated, setHydrated]);

  const favorite = hydrated ? isFavorite(carId) : false;

  return (
    <button
      type="button"
      className={css.favoriteBtn}
      onClick={() => toggleFavorite(carId)}
      aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Icon
        name={favorite ? "heart-filled" : "heart-outline"}
        className={css.favoriteIcon}
        width={24}
        height={24}
      />
    </button>
  );
}
