"use client";

import { RideStatus, DriverStatus, ChaperoneStatus } from "@/types";

type AnyStatus = RideStatus | DriverStatus | ChaperoneStatus;

const STATUS_CONFIG: Record<string, { label: string; classes: string }> = {
  // Ride statuses
  Scheduled: { label: "Scheduled", classes: "bg-gray-700 text-gray-200" },
  DriverEnRoute: { label: "Driver En Route", classes: "bg-yellow-700 text-yellow-100" },
  PassengerPickedUp: { label: "Passenger Picked Up", classes: "bg-blue-700 text-blue-100" },
  InTransit: { label: "In Transit", classes: "bg-blue-600 text-blue-100" },
  Arrived: { label: "Arrived", classes: "bg-green-700 text-green-100" },
  Completed: { label: "Completed", classes: "bg-gray-600 text-gray-200" },
  Cancelled: { label: "Cancelled", classes: "bg-red-700 text-red-100" },
  NoShow: { label: "No Show", classes: "bg-orange-700 text-orange-100" },
  // Driver statuses
  Available: { label: "Available", classes: "bg-green-700 text-green-100" },
  OnRide: { label: "On Ride", classes: "bg-blue-700 text-blue-100" },
  OffDuty: { label: "Off Duty", classes: "bg-gray-700 text-gray-300" },
  // Chaperone statuses
  OnAssignment: { label: "On Assignment", classes: "bg-blue-700 text-blue-100" },
};

interface Props {
  status: AnyStatus;
  size?: "sm" | "md";
}

export default function StatusBadge({ status, size = "md" }: Props) {
  const config = STATUS_CONFIG[status] ?? { label: status, classes: "bg-gray-700 text-gray-200" };
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs";

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${sizeClasses} ${config.classes}`}>
      {config.label}
    </span>
  );
}
