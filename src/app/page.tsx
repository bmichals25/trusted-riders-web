"use client";

import { useState } from "react";
import Link from "next/link";
import StatCard from "@/components/StatCard";
import RideCard from "@/components/RideCard";
import StatusBadge from "@/components/StatusBadge";
import NewRideForm from "@/components/NewRideForm";
import {
  mockRides,
  mockDrivers,
  mockChaperones,
  getActiveRides,
  getUpcomingRides,
} from "@/lib/mock-data";

function formatTime(isoString: string) {
  return new Date(isoString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function Dashboard() {
  const [showNewRide, setShowNewRide] = useState(false);

  const activeRides = getActiveRides();
  const upcomingRides = getUpcomingRides();
  const availableDrivers = mockDrivers.filter((d) => d.status === "Available");
  const availableChaperones = mockChaperones.filter((c) => c.status === "Available");

  const todaysRides = mockRides.filter((r) =>
    r.pickupTime.startsWith("2026-04-09")
  );
  const completedToday = todaysRides.filter((r) => r.status === "Completed");
  const onTimeCount = completedToday.filter((r) => {
    if (!r.actualArrivalTime) return false;
    return new Date(r.actualArrivalTime) <= new Date(r.estimatedArrivalTime);
  }).length;
  const onTimeRate =
    completedToday.length > 0
      ? Math.round((onTimeCount / completedToday.length) * 100)
      : 94;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Operations Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">
            Thursday, April 9, 2026
          </p>
        </div>
        <button
          onClick={() => setShowNewRide(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
        >
          + New Ride
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Active Rides"
          value={activeRides.length}
          subtitle="Currently in progress"
          color="blue"
          icon={<span className="text-lg">🚐</span>}
        />
        <StatCard
          title="Available Drivers"
          value={availableDrivers.length}
          subtitle={`${mockDrivers.filter(d => d.status === "OnRide").length} on ride`}
          color="green"
          icon={<span className="text-lg">👤</span>}
        />
        <StatCard
          title="Available Chaperones"
          value={availableChaperones.length}
          subtitle={`${mockChaperones.filter(c => c.status === "OnAssignment").length} on assignment`}
          color="purple"
          icon={<span className="text-lg">🏥</span>}
        />
        <StatCard
          title="On-Time Rate"
          value={`${onTimeRate}%`}
          subtitle="Today&apos;s performance"
          color="yellow"
          icon={<span className="text-lg">⏱</span>}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Rides */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Active Rides</h2>
            <Link href="/rides" className="text-sm text-blue-400 hover:text-blue-300">
              View all →
            </Link>
          </div>

          {activeRides.length === 0 ? (
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 text-center">
              <p className="text-gray-400">No active rides right now.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeRides.map((ride) => (
                <RideCard key={ride.id} ride={ride} />
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Schedule */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Today&apos;s Schedule</h2>
            <span className="text-sm text-gray-400">{upcomingRides.length} upcoming</span>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
            {upcomingRides.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-400">No upcoming rides scheduled.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-700">
                {upcomingRides.map((ride) => (
                  <Link
                    key={ride.id}
                    href={`/rides/${ride.id}`}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-gray-800 transition-colors"
                  >
                    <div className="text-sm text-gray-300 w-16 shrink-0 font-mono">
                      {formatTime(ride.pickupTime)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {ride.passenger.firstName} {ride.passenger.lastName}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {ride.pickupAddress.split(",")[0]} → {ride.dropoffAddress.split(",")[0]}
                      </p>
                    </div>
                    <StatusBadge status={ride.status} size="sm" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Alerts */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-white mb-3">Alerts</h2>
            <div className="space-y-2">
              <div className="bg-yellow-900/30 border border-yellow-800 rounded-lg px-4 py-3 flex items-start gap-3">
                <span className="text-yellow-400 mt-0.5">⚠</span>
                <div>
                  <p className="text-sm text-yellow-200 font-medium">Driver Vehicle Inspection Expired</p>
                  <p className="text-xs text-yellow-400">James Rivera · TR-5529 — Schedule inspection</p>
                </div>
              </div>
              <div className="bg-blue-900/30 border border-blue-800 rounded-lg px-4 py-3 flex items-start gap-3">
                <span className="text-blue-400 mt-0.5">ℹ</span>
                <div>
                  <p className="text-sm text-blue-200 font-medium">Ride TR-20260409-003 has no chaperone</p>
                  <p className="text-xs text-blue-400">Dorothy Ramirez · Dementia patient — consider reassignment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
