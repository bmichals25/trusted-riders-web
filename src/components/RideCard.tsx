"use client";

import Link from "next/link";
import { Ride } from "@/types";
import StatusBadge from "./StatusBadge";

interface Props {
  ride: Ride;
}

function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function shortAddress(address: string): string {
  return address.split(",")[0];
}

export default function RideCard({ ride }: Props) {
  return (
    <Link
      href={`/rides/${ride.id}`}
      className="block bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-blue-500 hover:bg-gray-750 transition-colors"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="font-semibold text-white text-sm">
            {ride.passenger.firstName} {ride.passenger.lastName}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">{ride.confirmationNumber}</p>
        </div>
        <StatusBadge status={ride.status} size="sm" />
      </div>

      <div className="space-y-1.5 mb-3">
        <div className="flex items-start gap-2 text-xs text-gray-300">
          <span className="text-green-400 mt-0.5 shrink-0">↑</span>
          <span className="truncate">{shortAddress(ride.pickupAddress)}</span>
        </div>
        <div className="flex items-start gap-2 text-xs text-gray-300">
          <span className="text-red-400 mt-0.5 shrink-0">↓</span>
          <span className="truncate">{shortAddress(ride.dropoffAddress)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-3">
          <span>{formatTime(ride.pickupTime)}</span>
          {ride.driver && (
            <span className="text-gray-500">
              {ride.driver.firstName} {ride.driver.lastName}
            </span>
          )}
        </div>
        <span className="text-gray-500">{ride.estimatedDistance} mi</span>
      </div>
    </Link>
  );
}
