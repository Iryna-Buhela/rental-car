export const generateCarId = (
  brand: string,
  model: string,
  year: number
): string => {
  const brandCode = brand.substring(0, 3).toLowerCase();
  const modelCode = model.substring(0, 3).toLowerCase();
  const yearCode = year.toString().slice(-2);

  return `${brandCode}-${modelCode}-${yearCode}`;
};

export const generateUniqueCarId = (
  brand: string,
  model: string,
  year: number,
  index?: number
): string => {
  const baseId = generateCarId(brand, model, year);
  return index ? `${baseId}-${index}` : baseId;
};
