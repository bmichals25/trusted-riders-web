import { mockRides, getRideById } from "@/lib/mock-data";
import RideDetailClient from "./RideDetailClient";

export function generateStaticParams() {
  return mockRides.map((ride) => ({ id: ride.id }));
}

interface Props {
  params: Promise<{ id: string }>;
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
