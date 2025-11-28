"use client";

import { useEffect, useState } from "react";
import { useFavoritesStore } from "@/lib/store/favoritesStore";
import { getCarById } from "@/lib/api/client";
import { Car } from "@/types/cars";
import CarsList from "@/components/CarsList/CarsList";
import CarsListSkeleton from "@/components/CarsList/CarsListSkeleton";
import Link from "next/link";
import css from "./page.module.css";

export default function FavoritesClient() {
  const { favorites } = useFavoritesStore();
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavoriteCars = async () => {
      if (favorites.length === 0) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const carsData = await Promise.all(
          favorites.map((id) => getCarById(id))
        );

        setCars(carsData);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load favorites";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoriteCars();
  }, [favorites]);

  if (isLoading) {
    return (
      <main className={css.container}>
        <h1 className={css.title}>Favorites</h1>
        <CarsListSkeleton count={favorites.length || 4} />
      </main>
    );
  }

  if (error) {
    return (
      <main className={css.container}>
        <h1 className={css.title}>Favorites</h1>
        <div className={css.error}>
          <p>Failed to load favorite cars.</p>
          <p className={css.errorDetails}>{error}</p>
        </div>
      </main>
    );
  }

  if (favorites.length === 0) {
    return (
      <main className={css.container}>
        <h1 className={css.title}>Favorites</h1>
        <div className={css.empty}>
          <p>You haven&apos;t added any cars to favorites yet.</p>
          <Link href="/catalog" className={css.catalogLink}>
            Browse Catalog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={css.container}>
      <h1 className={css.title}>Favorites</h1>
      <p className={css.count}>You have {favorites.length} favorite cars</p>
      <CarsList cars={cars} />
    </main>
  );
}
