"use client";

import { Driver } from "@/types";
import StatusBadge from "./StatusBadge";

interface Props {
  driver: Driver;
}

function cert(certified: boolean, expiry?: string | null): React.ReactNode {
  if (!certified) return <span className="text-red-400">Not certified</span>;
  return (
    <span className="text-green-400">
      Certified{expiry ? ` · exp ${expiry}` : ""}
    </span>
  );
}

export default function DriverCard({ driver }: Props) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {driver.firstName[0]}{driver.lastName[0]}
          </div>
          <div>
            <p className="font-semibold text-white">
              {driver.firstName} {driver.lastName}
            </p>
            <p className="text-xs text-gray-400">{driver.phone}</p>
          </div>
        </div>
        <StatusBadge status={driver.status} size="sm" />
      </div>

      {/* Vehicle */}
      <div className="bg-gray-750 rounded-lg p-3 mb-4 border border-gray-600">
        <p className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wide">Vehicle</p>
        <p className="text-sm text-white font-medium">
          {driver.vehicle.year} {driver.vehicle.make} {driver.vehicle.model}
        </p>
        <p className="text-xs text-gray-400">{driver.vehicle.licensePlate}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4 text-center">
        <div>
          <p className="text-lg font-bold text-white">{driver.totalRidesCompleted}</p>
          <p className="text-xs text-gray-400">Total Rides</p>
        </div>
        <div>
          <p className="text-lg font-bold text-white">{driver.onTimePercentage}%</p>
          <p className="text-xs text-gray-400">On Time</p>
        </div>
        <div>
          <p className="text-lg font-bold text-white">
            {driver.averageRating ? driver.averageRating.toFixed(1) : "—"}
          </p>
          <p className="text-xs text-gray-400">Rating</p>
        </div>
      </div>

      {/* Certifications */}
      <div className="space-y-1 text-xs">
        <p className="text-gray-400 font-medium uppercase tracking-wide mb-2">Certifications</p>
        <div className="flex justify-between">
          <span className="text-gray-300">First Aid / CPR</span>
          {cert(driver.firstAidCertified, driver.firstAidExpirationDate)}
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">Defensive Driving</span>
          {cert(driver.defensiveDrivingCertified)}
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">Medical Transport</span>
          {cert(driver.medicalTransportCertified)}
        </div>
      </div>
    </div>
  );
}
