import { getBrands } from "@/lib/api/server";
import CatalogClient from "./CatalogClient";

export default async function CatalogPage() {
  const brands = await getBrands();

  return <CatalogClient brands={brands} />;
}
