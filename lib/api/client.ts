import axios, { AxiosError } from "axios";
import { Car, CarsResponse, CarFilters } from "@/types/cars";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || "https://car-rental-api.goit.global",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Retry logic для API запитів
const retryRequest = async <T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    
    const axiosError = error as AxiosError;
    // Retry тільки для мережевих помилок або 5xx статусів
    if (
      axiosError.code === "ECONNABORTED" ||
      axiosError.code === "ERR_NETWORK" ||
      (axiosError.response && axiosError.response.status >= 500)
    ) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return retryRequest(fn, retries - 1, delay * 2);
    }
    
    throw error;
  }
};

export async function fetchCars(page = 1, limit = 12): Promise<Car[]> {
  return retryRequest(async () => {
    const { data } = await api.get<CarsResponse>("/cars", {
      params: { page, limit },
    });
    return data.cars;
  });
}

export async function searchCars(
  filters: CarFilters & { page?: number; limit?: number }
): Promise<CarsResponse> {
  return retryRequest(async () => {
    const { data } = await api.get<CarsResponse>("/cars", {
      params: filters,
    });
    return data;
  });
}

export async function getBrands(): Promise<string[]> {
  return retryRequest(async () => {
    const { data } = await api.get<string[]>("/brands");
    return data;
  });
}

export async function getCarById(id: string): Promise<Car> {
  return retryRequest(async () => {
    const { data } = await api.get<Car>(`/cars/${id}`);
    return data;
  });
}
