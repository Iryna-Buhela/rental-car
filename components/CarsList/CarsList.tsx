import { Car } from "@/types/cars";
import CarCard from "../CarCard/CarCard";
import css from "./CarsList.module.css";

interface CarsListProps {
  cars: Car[];
}

export default function CarsList({ cars }: CarsListProps) {
  const list = Array.isArray(cars) ? cars : [];

  if (list.length === 0) {
    return (
      <p className={css.noResults}>
        No cars found. Try adjusting your filters.
      </p>
    );
  }

  return (
    <ul className={css.grid}>
      {list.map((car, index) => (
        <li key={car.id} className={css.item}>
          <CarCard car={car} priority={index < 4} />
        </li>
      ))}
    </ul>
  );
}
