"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useFavoritesStore } from "@/lib/store/favoritesStore";
import type { Car } from "@/types/cars";
import Icon from "@/components/Icon/Icon";
import { formatMileage } from "@/lib/utils/formatMileage";
import css from "./CarCard.module.css";

interface CarCardProps {
  car: Car;
  priority?: boolean;
}

export default function CarCard({ car, priority = false }: CarCardProps) {
  const { toggleFavorite, isFavorite, hydrated, setHydrated } =
    useFavoritesStore();

  useEffect(() => {
    if (!hydrated) {
      setHydrated();
    }
  }, [hydrated, setHydrated]);

  const favorite = hydrated ? isFavorite(car.id) : false;

  const title = `${car.brand} ${car.model}, ${car.year ?? ""}`.trim();

  const addressParts = car.address.split(",").map((part) => part.trim());
  const country = addressParts[addressParts.length - 1];
  const city = addressParts[addressParts.length - 2] ?? "";

  return (
    <article className={css.card}>
      <Link
        href={`/catalog/${car.id}`}
        className={css.stretchedLink}
        aria-label={`View ${title}`}
      />

      <div className={css.imageWrapper}>
        <Image
          src={car.img}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={css.image}
          priority={priority}
        />

        <button
          type="button"
          className={css.favoriteBtn}
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(car.id);
          }}
          data-favorite={favorite}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Icon
            name={favorite ? "heart-filled" : "heart-outline"}
            width={18}
            height={18}
          />
        </button>
      </div>

      <div className={css.content}>
        <div className={css.headerRow}>
          <h3 className={css.title}>
            {car.brand} <span className={css.model}>{car.model}</span>,{" "}
            {car.year}
          </h3>

          <p className={css.price}>${Number(car.rentalPrice)}</p>
        </div>

        <ul className={css.details}>
          {city && <li>{city}</li>}
          {country && <li>{country}</li>}
          <li>{car.rentalCompany}</li>
          <li>{car.type}</li>
          <li>{formatMileage(car.mileage)}</li>
        </ul>

        <div className={css.actions}>
          <Link href={`/catalog/${car.id}`} className={css.detailsBtn}>
            Read more
          </Link>
        </div>
      </div>
    </article>
  );
}
