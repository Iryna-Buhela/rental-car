"use client";

import Link from "next/link";
import css from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={css.hero}>
      <div className={css.overlay} />

      <div className={css.content}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <p className={css.subtitle}>
          Reliable and budget-friendly rentals for any journey
        </p>

        <Link href="/catalog" className={css.button}>
          View Catalog
        </Link>
      </div>
    </section>
  );
}
