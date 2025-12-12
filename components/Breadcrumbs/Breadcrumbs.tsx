"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./Breadcrumbs.module.css";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const pathname = usePathname();

  if (items.length === 0) return null;

  return (
    <nav className={css.breadcrumbs} aria-label="Breadcrumb">
      <ol className={css.list}>
        <li className={css.item}>
          <Link href="/" className={css.link}>
            Home
          </Link>
          <span className={css.separator}>/</span>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isActive = pathname === item.href;

          return (
            <li key={item.href} className={css.item}>
              {isLast || isActive ? (
                <span className={css.current} aria-current="page">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link href={item.href} className={css.link}>
                    {item.label}
                  </Link>
                  <span className={css.separator}>/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
