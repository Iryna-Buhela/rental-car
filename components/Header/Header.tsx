"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import css from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isCatalog = pathname === "/catalog";

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/" aria-label="Home" className={css.logo}>
          <Image
            src="/icons/Logo.svg"
            alt="Logo"
            width={104}
            height={16}
            priority
          />
        </Link>

        <nav className={css.nav}>
          <Link href="/" className={isHome ? css.activeLink : css.link}>
            Home
          </Link>
          <Link
            href="/catalog"
            className={isCatalog ? css.activeLink : css.link}
          >
            Catalog
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
