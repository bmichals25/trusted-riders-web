import type { Metadata } from "next";
import { mockRides, getRideById } from "@/lib/mock-data";
import RideDetailClient from "./RideDetailClient";

export function generateStaticParams() {
  return mockRides.map((ride) => ({ id: ride.id }));
}

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const ride = getRideById(id);
  if (!ride) return { title: "Ride Not Found" };
  return {
    title: `${ride.confirmationNumber} · ${ride.passenger.firstName} ${ride.passenger.lastName}`,
  };
}

export default async function RideDetailPage({ params }: Props) {
  const { id } = await params;
  const ride = getRideById(id);

  if (!ride) {
    return (
      <div className="p-6">
        <p className="text-gray-400">Ride not found.</p>
      </div>
    );
  }

  return <RideDetailClient ride={ride} />;
}
