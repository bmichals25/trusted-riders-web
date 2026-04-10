"use client";

import { RideTimelineEvent } from "@/types";

const STATUS_LABEL: Record<string, string> = {
  Scheduled: "Ride Scheduled",
  DriverEnRoute: "Driver En Route",
  PassengerPickedUp: "Passenger Picked Up",
  InTransit: "In Transit",
  Arrived: "Arrived at Destination",
  Completed: "Ride Completed",
  Cancelled: "Ride Cancelled",
  NoShow: "No Show",
};

const STATUS_COLOR: Record<string, string> = {
  Scheduled: "bg-gray-500",
  DriverEnRoute: "bg-yellow-500",
  PassengerPickedUp: "bg-blue-500",
  InTransit: "bg-blue-400",
  Arrived: "bg-green-500",
  Completed: "bg-gray-400",
  Cancelled: "bg-red-500",
  NoShow: "bg-orange-500",
};

interface Props {
  events: RideTimelineEvent[];
}

function formatDateTime(isoString: string): string {
  return new Date(isoString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function RideTimeline({ events }: Props) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-700" />
      <div className="space-y-5">
        {events.map((event, i) => (
          <div key={i} className="flex gap-4 relative">
            <div
              className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center z-10 ${STATUS_COLOR[event.status] ?? "bg-gray-500"}`}
            >
              <span className="w-2 h-2 rounded-full bg-white/80" />
            </div>
            <div className="flex-1 pb-1">
              <p className="text-sm font-medium text-white">
                {STATUS_LABEL[event.status] ?? event.status}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {formatDateTime(event.timestamp)} · {event.changedBy}
              </p>
              {event.note && (
                <p className="text-xs text-gray-300 mt-1 italic">{event.note}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
