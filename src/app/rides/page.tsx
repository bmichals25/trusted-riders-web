"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import RideCard from "@/components/RideCard";
import StatusBadge from "@/components/StatusBadge";
import NewRideForm from "@/components/NewRideForm";
import { mockRides, mockDrivers } from "@/lib/mock-data";
import { RideStatus } from "@/types";

type Tab = "All" | "Scheduled" | "InProgress" | "Completed";

const TABS: Tab[] = ["All", "Scheduled", "InProgress", "Completed"];

const IN_PROGRESS_STATUSES: RideStatus[] = [
  "DriverEnRoute",
  "PassengerPickedUp",
  "InTransit",
  "Arrived",
];

const COMPLETED_STATUSES: RideStatus[] = ["Completed", "Cancelled", "NoShow"];

function RidesContent() {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<Tab>("All");
  const [search, setSearch] = useState("");
  const [driverFilter, setDriverFilter] = useState("");
  const [showNewRide, setShowNewRide] = useState(false);

  const statusParam = searchParams.get("status");

  const filtered = mockRides.filter((ride) => {
    // Tab filter
    if (tab === "Scheduled" && ride.status !== "Scheduled") return false;
    if (tab === "InProgress" && !IN_PROGRESS_STATUSES.includes(ride.status)) return false;
    if (tab === "Completed" && !COMPLETED_STATUSES.includes(ride.status)) return false;

    // Status param filter (from external link)
    if (statusParam && ride.status !== statusParam) return false;

    // Search filter
    if (search) {
      const name = `${ride.passenger.firstName} ${ride.passenger.lastName}`.toLowerCase();
      const conf = ride.confirmationNumber.toLowerCase();
      if (!name.includes(search.toLowerCase()) && !conf.includes(search.toLowerCase())) return false;
    }

    // Driver filter
    if (driverFilter && ride.driver?.id !== driverFilter) return false;

    return true;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Rides</h1>
          <p className="text-gray-400 text-sm mt-1">{filtered.length} rides shown</p>
        </div>
        <button
          onClick={() => setShowNewRide(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
        >
          + New Ride
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 bg-gray-800 rounded-lg p-1 w-fit border border-gray-700">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              tab === t
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {t === "InProgress" ? "In Progress" : t}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Search passenger or confirmation #"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 max-w-sm bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <select
          value={driverFilter}
          onChange={(e) => setDriverFilter(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
        >
          <option value="">All Drivers</option>
          {mockDrivers.map((d) => (
            <option key={d.id} value={d.id}>
              {d.firstName} {d.lastName}
            </option>
          ))}
        </select>
      </div>

      {/* Ride List */}
      {filtered.length === 0 ? (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
          <p className="text-gray-400">No rides match your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((ride) => (
            <RideCard key={ride.id} ride={ride} />
          ))}
        </div>
      )}

      {/* New Ride Modal */}
      {showNewRide && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white">Create New Ride</h2>
              <button
                onClick={() => setShowNewRide(false)}
                className="text-gray-400 hover:text-white text-xl"
              >
                ×
              </button>
            </div>
            <div className="px-6 py-5">
              <NewRideForm onClose={() => setShowNewRide(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RidesPage() {
  return (
    <Suspense fallback={<div className="p-6 text-gray-400">Loading rides...</div>}>
      <RidesContent />
    </Suspense>
  );
}

// Suppress unused import warnings
const _StatusBadge = StatusBadge;
void _StatusBadge;
