import { getCarById } from "@/lib/api/server";
import CarDetails from "@/components/CarDetails/CarDetails";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const car = await getCarById(id);
    return {
      title: `${car.brand} ${car.model} - Car Rental`,
      description: car.description,
    };
  } catch {
    return {
      title: "Car Not Found",
    };
  }
}

export default async function CarDetailsPage({ params }: PageProps) {
  const { id } = await params;

  try {
    const car = await getCarById(id);
    return <CarDetails car={car} />;
  } catch {
    notFound();
  }
}
