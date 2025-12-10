"use client";

import Link from "next/link";
import Image from "next/image";
import css from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={css.hero}>
      <Image
        src="/img/hero/hero.png"
        alt="Rental cars"
        fill
        priority
        className={css.heroImage}
        sizes="100vw"
        quality={90}
      />
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
