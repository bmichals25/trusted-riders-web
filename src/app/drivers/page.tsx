"use client";

import { useState } from "react";
import { mockDrivers } from "@/lib/mock-data";
import StatusBadge from "@/components/StatusBadge";
import { Driver, DriverStatus } from "@/types";

type FilterStatus = "All" | DriverStatus;
const FILTERS: FilterStatus[] = ["All", "Available", "OnRide", "OffDuty"];

function DriverDetailPanel({ driver }: { driver: Driver }) {
  return (
    <div className="mt-4 pt-4 border-t border-gray-700 grid grid-cols-2 gap-4 text-sm">
      <div>
        <p className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wide">Contact</p>
        <p className="text-white">{driver.email}</p>
        <a href={`tel:${driver.phone}`} className="text-blue-400 hover:text-blue-300 text-xs">
          {driver.phone}
        </a>
      </div>
      <div>
        <p className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wide">License</p>
        <p className="text-white text-xs">{driver.licenseNumber}</p>
        <p className="text-gray-400 text-xs">Exp: {driver.licenseExpiration}</p>
      </div>
      <div className="col-span-2">
        <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Vehicle Details</p>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div>
            <p className="text-gray-400">Make/Model</p>
            <p className="text-white">{driver.vehicle.year} {driver.vehicle.make} {driver.vehicle.model}</p>
          </div>
          <div>
            <p className="text-gray-400">Plate</p>
            <p className="text-white">{driver.vehicle.licensePlate}</p>
          </div>
          <div>
            <p className="text-gray-400">Inspection</p>
            <p className={driver.vehicle.inspectionStatus === "Valid" ? "text-green-400" : "text-red-400"}>
              {driver.vehicle.inspectionStatus}
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Certifications</p>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-300">Background Check</span>
            <span className={driver.backgroundCheckStatus === "Verified" ? "text-green-400" : "text-red-400"}>
              {driver.backgroundCheckStatus} · {driver.backgroundCheckDate}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Medical Transport</span>
            <span className={driver.medicalTransportCertified ? "text-green-400" : "text-red-400"}>
              {driver.medicalTransportCertified ? "Certified" : "Not certified"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">First Aid / CPR</span>
            <span className={driver.firstAidCertified ? "text-green-400" : "text-red-400"}>
              {driver.firstAidCertified
                ? `Certified · exp ${driver.firstAidExpirationDate}`
                : "Not certified"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Defensive Driving</span>
            <span className={driver.defensiveDrivingCertified ? "text-green-400" : "text-red-400"}>
              {driver.defensiveDrivingCertified
                ? `Certified · ${driver.defensiveDrivingDate}`
                : "Not certified"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DriverRow({ driver }: { driver: Driver }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setExpanded((v) => !v)}
      >
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
          {driver.firstName[0]}{driver.lastName[0]}
        </div>

        {/* Name + vehicle */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white">
            {driver.firstName} {driver.lastName}
          </p>
          <p className="text-xs text-gray-400">
            {driver.vehicle.year} {driver.vehicle.make} {driver.vehicle.model} · {driver.vehicle.licensePlate}
          </p>
        </div>

        {/* Stats */}
        <div className="hidden md:flex items-center gap-6 text-center text-xs">
          <div>
            <p className="text-white font-bold">{driver.totalRidesCompleted}</p>
            <p className="text-gray-400">Rides</p>
          </div>
          <div>
            <p className="text-white font-bold">{driver.onTimePercentage}%</p>
            <p className="text-gray-400">On Time</p>
          </div>
          {driver.averageRating && (
            <div>
              <p className="text-white font-bold">★ {driver.averageRating}</p>
              <p className="text-gray-400">Rating</p>
            </div>
          )}
        </div>

        <StatusBadge status={driver.status} size="sm" />
        <span className="text-gray-400 text-xs ml-2">{expanded ? "▲" : "▼"}</span>
      </div>

      {expanded && <DriverDetailPanel driver={driver} />}
    </div>
  );
}

export default function DriversPage() {
  const [filter, setFilter] = useState<FilterStatus>("All");
  const [search, setSearch] = useState("");

  const filtered = mockDrivers.filter((d) => {
    if (filter !== "All" && d.status !== filter) return false;
    if (search) {
      const name = `${d.firstName} ${d.lastName}`.toLowerCase();
      if (!name.includes(search.toLowerCase())) return false;
    }
    return true;
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Drivers</h1>
          <p className="text-gray-400 text-sm mt-1">{filtered.length} drivers shown</p>
        </div>
        <div className="flex gap-3 text-sm text-gray-400">
          <span>Available: <span className="text-green-400 font-semibold">{mockDrivers.filter(d => d.status === "Available").length}</span></span>
          <span>On Ride: <span className="text-blue-400 font-semibold">{mockDrivers.filter(d => d.status === "OnRide").length}</span></span>
          <span>Off Duty: <span className="text-gray-500 font-semibold">{mockDrivers.filter(d => d.status === "OffDuty").length}</span></span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-5 flex-wrap">
        <div className="flex gap-1 bg-gray-800 rounded-lg p-1 border border-gray-700">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                filter === f ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {f === "OnRide" ? "On Ride" : f === "OffDuty" ? "Off Duty" : f}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search driver..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Driver List */}
      <div className="space-y-3">
        {filtered.map((driver) => (
          <DriverRow key={driver.id} driver={driver} />
        ))}
        {filtered.length === 0 && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
            <p className="text-gray-400">No drivers match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
