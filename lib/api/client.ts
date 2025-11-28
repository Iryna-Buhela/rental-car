import axios from "axios";
import { Car, CarsResponse, CarFilters } from "@/types/cars";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || "https://car-rental-api.goit.global",
  timeout: 10000,
});

export async function fetchCars(page = 1, limit = 12): Promise<Car[]> {
  const { data } = await api.get<CarsResponse>("/cars", {
    params: { page, limit },
  });
  return data.cars;
}

export async function searchCars(
  filters: CarFilters & { page?: number; limit?: number }
): Promise<CarsResponse> {
  const { data } = await api.get<CarsResponse>("/cars", {
    params: filters,
  });
  return data;
}

export async function getBrands(): Promise<string[]> {
  const { data } = await api.get<string[]>("/brands");
  return data;
}

export async function getCarById(id: string): Promise<Car> {
  const { data } = await api.get<Car>(`/cars/${id}`);
  return data;
}
