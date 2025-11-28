export type IconName =
  | "calendar"
  | "car"
  | "check-circle"
  | "down"
  | "fuel-pump"
  | "gear"
  | "heart-filled"
  | "heart-outline"
  | "location"
  | "logo"
  | "up";

interface IconProps {
  name: IconName;
  width?: number;
  height?: number;
  className?: string;
}

export default function Icon({
  name,
  width = 24,
  height = 24,
  className,
}: IconProps) {
  return (
    <svg width={width} height={height} className={className}>
      <use href={`/icons/sprite.svg#icon-${name}`} />
    </svg>
  );
}
