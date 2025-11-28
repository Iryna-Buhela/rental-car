export const formatMileage = (value: number | string): string => {
  const num = typeof value === "string" ? Number(value) : value;

  if (isNaN(num)) {
    return String(value);
  }
  const formatted = num.toLocaleString("en-US").replace(/,/g, " ");

  return `${formatted} km`;
};
