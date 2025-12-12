import Image from "next/image";
import type { Car } from "@/types/cars";
import { formatMileage } from "@/lib/utils/formatMileage";
import { generateCarId } from "@/lib/utils/generateCarId";
import RentForm from "@/components/RentForm/RentForm";
import Icon from "@/components/Icon/Icon";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import ShareButton from "@/components/ShareButton/ShareButton";
import css from "./CarDetails.module.css";

interface CarDetailsProps {
  car: Car;
}

export default function CarDetails({ car }: CarDetailsProps) {
  const carName = `${car.brand} ${car.model}, ${car.year}`;
  const shortId = generateCarId(car.brand, car.model, car.year);

  const addressParts = car.address.split(",").map((part) => part.trim());
  const cityCountry =
    addressParts.length >= 2 ? addressParts.slice(-2).join(", ") : car.address;

  const carType =
    car.type.charAt(0).toUpperCase() + car.type.slice(1).toLowerCase();

  const accessoriesAndFunctionalities = [
    ...(car.accessories ?? []),
    ...(car.functionalities ?? []),
  ];

  const conditions = car.rentalConditions ?? [];

  return (
    <>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", marginTop: "96px" }}>
        <Breadcrumbs
          items={[
            { label: "Catalog", href: "/catalog" },
            { label: carName, href: `/catalog/${car.id}` },
          ]}
        />
      </div>
      <section className={css.container}>
        <aside className={css.sidebar}>
        <div className={css.imageWrapper}>
          <Image
            src={car.img}
            alt={carName}
            fill
            className={css.image}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 640px"
          />
        </div>

        <RentForm carId={car.id} carName={carName} />
      </aside>
      <div className={css.infoColumn}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", flexWrap: "wrap" }}>
          <h1 className={css.title}>
            {car.brand} {car.model}, {car.year}
            <span className={css.carId}>id: {shortId}</span>
          </h1>
          <ShareButton 
            title={carName}
            text={`Check out this ${carName} for rent!`}
          />
        </div>

        <div className={css.metaRow}>
          <span className={css.metaItem}>
            <Icon
              name="location"
              width={16}
              height={16}
              className={css.metaIcon}
            />
            {cityCountry}
          </span>
          <span className={css.metaItem}>
            Mileage: {formatMileage(car.mileage)}
          </span>
        </div>

        <div className={css.priceBlock}>
          <span className={css.priceLabel}></span>
          <span className={css.price}>${car.rentalPrice}</span>
        </div>

        <p className={css.description}>{car.description}</p>

        {conditions.length > 0 && (
          <div className={css.block}>
            <h2 className={css.blockTitle}>Rental Conditions</h2>
            <ul className={css.list}>
              {conditions.map((cond, i) => (
                <li key={i} className={css.listItem}>
                  <Icon
                    name="check-circle"
                    width={16}
                    height={16}
                    className={css.listIcon}
                  />
                  <span className={css.listText}>{cond}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={css.block}>
          <h2 className={css.blockTitle}>Car Specifications</h2>
          <ul className={css.list}>
            <li className={css.listItem}>
              <Icon
                name="calendar"
                width={16}
                height={16}
                className={css.listIcon}
              />
              <span className={css.listText}>
                <span className={css.listLabel}>Year:</span> {car.year}
              </span>
            </li>

            <li className={css.listItem}>
              <Icon
                name="car"
                width={16}
                height={16}
                className={css.listIcon}
              />
              <span className={css.listText}>
                <span className={css.listLabel}>Type:</span> {carType}
              </span>
            </li>

            <li className={css.listItem}>
              <Icon
                name="fuel-pump"
                width={16}
                height={16}
                className={css.listIcon}
              />
              <span className={css.listText}>
                <span className={css.listLabel}>Fuel consumption:</span>{" "}
                {car.fuelConsumption}
              </span>
            </li>

            <li className={css.listItem}>
              <Icon
                name="gear"
                width={16}
                height={16}
                className={css.listIcon}
              />
              <span className={css.listText}>
                <span className={css.listLabel}>Engine size:</span>{" "}
                {car.engineSize}
              </span>
            </li>
          </ul>
        </div>

        {accessoriesAndFunctionalities.length > 0 && (
          <div className={css.block}>
            <h2 className={css.blockTitle}>Accessories and functionalities</h2>
            <ul className={css.list}>
              {accessoriesAndFunctionalities.map((item, i) => (
                <li key={i} className={css.listItem}>
                  <Icon
                    name="check-circle"
                    width={16}
                    height={16}
                    className={css.listIcon}
                  />
                  <span className={css.listText}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
    </>
  );
}
