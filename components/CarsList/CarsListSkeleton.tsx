import css from "./CarsList.module.css";

interface CarsListSkeletonProps {
  count?: number;
}

export default function CarsListSkeleton({
  count = 12,
}: CarsListSkeletonProps) {
  return (
    <div className={css.grid}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={css.skeletonCard}>
          <div className={css.skeletonImage} />
          <div className={css.skeletonContent}>
            <div className={css.skeletonTitle} />
            <div className={css.skeletonText} />
            <div className={css.skeletonText} />
          </div>
        </div>
      ))}
    </div>
  );
}
