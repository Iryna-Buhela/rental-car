import axios from "axios";
import { Car, CarsResponse } from "@/types/cars";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || "https://car-rental-api.goit.global",
  timeout: 10000,
});

export async function getCars(page = 1, limit = 12): Promise<Car[]> {
  try {
    const { data } = await api.get<CarsResponse>("/cars", {
      params: { page, limit },
    });
    return data.cars;
  } catch (error) {
    console.error("Failed to fetch cars:", error);
    throw new Error("Failed to fetch cars");
  }
}

export async function getCarById(id: string): Promise<Car> {
  try {
    const { data } = await api.get<Car>(`/cars/${id}`);
    return data;
  } catch (error) {
    console.error("Failed to fetch car:", error);
    throw new Error("Car not found");
  }
}

export async function getTotalCarsCount(): Promise<number> {
  try {
    const { data } = await api.get<CarsResponse>("/cars", {
      params: { page: 1, limit: 1 },
    });
    return data.totalCars;
  } catch (error) {
    console.error("Failed to fetch total count:", error);
    return 0;
  }
}

export async function getBrands(): Promise<string[]> {
  try {
    const { data } = await api.get<string[]>("/brands");
    return data;
  } catch (error) {
    console.error("Failed to fetch brands:", error);
    return [];
  }
}

export async function searchCars(filters: {
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
  page?: number;
  limit?: number;
}): Promise<CarsResponse> {
  try {
    const { data } = await api.get<CarsResponse>("/cars", {
      params: filters,
    });
    return data;
  } catch (error) {
    console.error("Failed to search cars:", error);
    throw new Error("Search failed");
  }
}
