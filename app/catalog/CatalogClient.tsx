"use client";

import { useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { searchCars } from "@/lib/api/client";
import { useCarsStore } from "@/lib/store/carsStore";
import { useFiltersStore } from "@/lib/store/filtersStore";
import CarsList from "@/components/CarsList/CarsList";
import CarsListSkeleton from "@/components/CarsList/CarsListSkeleton";
import Filters from "@/components/Filters/Filters";
import css from "./page.module.css";

interface Props {
  brands: string[];
}

export default function CatalogClient({ brands }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    cars,
    setCars,
    appendCars,
    setTotalCars,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    isLoading,
    setLoading,
    error,
    setError,
    reset,
  } = useCarsStore();

  const { filters, setFilters } = useFiltersStore();

  const urlFilters = useMemo(() => {
    const brand = searchParams.get("brand") || undefined;
    const rentalPrice = searchParams.get("rentalPrice") || undefined;
    const minMileage = searchParams.get("minMileage") || undefined;
    const maxMileage = searchParams.get("maxMileage") || undefined;
    return { brand, rentalPrice, minMileage, maxMileage };
  }, [searchParams]);

  useEffect(() => {
    setFilters(urlFilters);
  }, [urlFilters, setFilters]);

  useEffect(() => {
    const fetchFirstPage = async () => {
      try {
        setLoading(true);
        setError(null);
        reset();

        const data = await searchCars({
          ...urlFilters,
          page: 1,
          limit: 12,
        });

        setCars(data.cars);
        setTotalCars(data.totalCars);
        setTotalPages(data.totalPages);
        setCurrentPage(1);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load cars";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchFirstPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      if (filters.rentalPrice) {
        const pricePerHour = filters.rentalPrice;
        if (car.rentalPrice !== pricePerHour) {
          return false;
        }
      }

      if (filters.minMileage) {
        const minKm = parseInt(filters.minMileage);
        const carMileage =
          typeof car.mileage === "string" ? parseInt(car.mileage) : car.mileage;
        if (carMileage < minKm) {
          return false;
        }
      }

      if (filters.maxMileage) {
        const maxKm = parseInt(filters.maxMileage);
        const carMileage =
          typeof car.mileage === "string" ? parseInt(car.mileage) : car.mileage;
        if (carMileage > maxKm) {
          return false;
        }
      }

      return true;
    });
  }, [cars, filters]);

  const canLoadMore = currentPage < totalPages && !isLoading;

  const handleLoadMore = async () => {
    if (!canLoadMore) return;
    try {
      setLoading(true);
      setError(null);
      const nextPage = currentPage + 1;

      const data = await searchCars({
        ...urlFilters,
        page: nextPage,
        limit: 12,
      });

      appendCars(data.cars);
      setTotalCars(data.totalCars);
      setTotalPages(data.totalPages);
      setCurrentPage(nextPage);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load more cars";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (next: {
    brand?: string;
    rentalPrice?: string;
    minMileage?: string;
    maxMileage?: string;
  }) => {
    const params = new URLSearchParams();
    if (next.brand) params.set("brand", next.brand);
    if (next.rentalPrice) params.set("rentalPrice", next.rentalPrice);
    if (next.minMileage) params.set("minMileage", next.minMileage);
    if (next.maxMileage) params.set("maxMileage", next.maxMileage);

    router.push(`/catalog?${params.toString()}`, { scroll: false });
  };

  return (
    <main className={css.container}>
      <h1 className={css.title}>Car Catalog</h1>

      <Filters brands={brands} onApply={applyFilters} />

      {isLoading && cars.length === 0 ? (
        <CarsListSkeleton count={12} />
      ) : error ? (
        <div className={css.error}>
          <p>Не вдалося завантажити авто.</p>
          <p className={css.errorDetails}>{error}</p>
        </div>
      ) : filteredCars.length === 0 ? (
        <div className={css.error}>
          <p>Авто за вашими фільтрами не знайдено.</p>
        </div>
      ) : (
        <>
          <CarsList cars={filteredCars} />

          {canLoadMore && (
            <div className={css.loadMoreWrap}>
              <button
                className={css.loadMoreBtn}
                onClick={handleLoadMore}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
