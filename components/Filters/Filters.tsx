"use client";

import { useEffect, useState } from "react";
import { useFiltersStore } from "@/lib/store/filtersStore";
import css from "./Filters.module.css";

interface FiltersProps {
  brands: string[];
  onApply?: (filters: {
    brand?: string;
    rentalPrice?: string;
    minMileage?: string;
    maxMileage?: string;
  }) => void;
}

const PRICES = [
  { label: "$30", value: "30" },
  { label: "$40", value: "40" },
  { label: "$50", value: "50" },
  { label: "$60", value: "60" },
  { label: "$70", value: "70" },
  { label: "$80", value: "80" },
];

export default function Filters({ brands, onApply }: FiltersProps) {
  const { filters, setFilters } = useFiltersStore();
  const [hydrated, setHydrated] = useState(false);

  const [brand, setBrand] = useState<string>("");
  const [rentalPrice, setRentalPrice] = useState<string>("");
  const [minMileage, setMinMileage] = useState<string>("");
  const [maxMileage, setMaxMileage] = useState<string>("");

  useEffect(() => {
    setHydrated(true);
    setBrand(filters.brand || "");
    setRentalPrice(filters.rentalPrice || "");
    setMinMileage(filters.minMileage || "");
    setMaxMileage(filters.maxMileage || "");
  }, [filters]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const minKm = minMileage ? parseInt(minMileage) : undefined;
    const maxKm = maxMileage ? parseInt(maxMileage) : undefined;

    if (minKm !== undefined && maxKm !== undefined && minKm > maxKm) {
      alert("From km must be less than To km");
      return;
    }

    const next = {
      brand: brand || undefined,
      rentalPrice: rentalPrice || undefined,
      minMileage: minMileage || undefined,
      maxMileage: maxMileage || undefined,
    };

    setFilters(next);
    onApply?.(next);
  };

  if (!hydrated) {
    return null;
  }

  return (
    <form className={css.filters} onSubmit={handleSubmit}>
      <div className={css.row}>
        <label className={css.field}>
          <span className={css.label}>Car brand</span>
          <select
            className={css.select}
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          >
            <option value="" disabled>
              Choose a brand
            </option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>

        <label className={css.field}>
          <span className={css.label}>Price / 1 hour</span>
          <select
            className={css.select}
            value={rentalPrice}
            onChange={(e) => setRentalPrice(e.target.value)}
          >
            <option value="" disabled>
              Choose a price
            </option>
            {PRICES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </label>

        <label className={css.field}>
          <span className={css.label}>Car mileage / km</span>
          <div className={css.inputGroup}>
            <input
              type="number"
              className={css.input}
              placeholder="From"
              value={minMileage}
              onChange={(e) => setMinMileage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "-" || e.key === "e" || e.key === "E") {
                  e.preventDefault();
                }
              }}
              min={0}
              step={100}
            />
            <input
              type="number"
              className={css.input}
              placeholder="To"
              value={maxMileage}
              onChange={(e) => setMaxMileage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "-" || e.key === "e" || e.key === "E") {
                  e.preventDefault();
                }
              }}
              min={0}
              step={100}
            />
          </div>
        </label>
      </div>

      <div className={css.buttonGroup}>
        <button type="submit" className={css.searchBtn}>
          Search
        </button>
      </div>
    </form>
  );
}
