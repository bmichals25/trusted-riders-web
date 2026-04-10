"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { mockRides } from "@/lib/mock-data";
import StatusBadge from "@/components/StatusBadge";
import { RideStatus } from "@/types";

type SortKey = "date" | "passenger" | "driver";
type SortDir = "asc" | "desc";

const HISTORY_STATUSES: RideStatus[] = ["Completed", "Cancelled", "NoShow"];

function formatDate(isoString: string) {
  return new Date(isoString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(isoString: string) {
  return new Date(isoString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

interface SortHeaderProps {
  label: string;
  col: SortKey;
  sortKey: SortKey;
  sortDir: SortDir;
  onToggle: (col: SortKey) => void;
}

function SortHeader({ label, col, sortKey, sortDir, onToggle }: SortHeaderProps) {
  return (
    <button
      onClick={() => onToggle(col)}
      className="flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-white transition-colors"
    >
      {label}
      {sortKey === col && (
        <span className="text-blue-400">{sortDir === "desc" ? "↓" : "↑"}</span>
      )}
    </button>
  );
}

function HistoryContent() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | RideStatus>("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const historyRides = mockRides.filter((r) =>
    HISTORY_STATUSES.includes(r.status)
  );

  const filtered = historyRides.filter((r) => {
    if (statusFilter !== "All" && r.status !== statusFilter) return false;
    if (search) {
      const name = `${r.passenger.firstName} ${r.passenger.lastName}`.toLowerCase();
      const conf = r.confirmationNumber.toLowerCase();
      const driver = r.driver
        ? `${r.driver.firstName} ${r.driver.lastName}`.toLowerCase()
        : "";
      if (
        !name.includes(search.toLowerCase()) &&
        !conf.includes(search.toLowerCase()) &&
        !driver.includes(search.toLowerCase())
      )
        return false;
    }
    if (dateFrom && r.pickupTime < dateFrom) return false;
    if (dateTo && r.pickupTime > dateTo + "T23:59:59") return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    let cmp = 0;
    if (sortKey === "date") cmp = a.pickupTime.localeCompare(b.pickupTime);
    if (sortKey === "passenger")
      cmp = `${a.passenger.lastName}${a.passenger.firstName}`.localeCompare(
        `${b.passenger.lastName}${b.passenger.firstName}`
      );
    if (sortKey === "driver")
      cmp = (a.driver?.lastName ?? "").localeCompare(b.driver?.lastName ?? "");
    return sortDir === "desc" ? -cmp : cmp;
  });

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Ride History</h1>
        <p className="text-gray-400 text-sm mt-1">{sorted.length} rides</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <input
          type="text"
          placeholder="Search passenger, driver, or confirmation #"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-48 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "All" | RideStatus)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
        >
          <option value="All">All Statuses</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
          <option value="NoShow">No Show</option>
        </select>
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
        />
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Table */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700 bg-gray-900">
                <th className="px-4 py-3 text-left">
                  <SortHeader label="Date" col="date" sortKey={sortKey} sortDir={sortDir} onToggle={toggleSort} />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                  Confirmation
                </th>
                <th className="px-4 py-3 text-left">
                  <SortHeader label="Passenger" col="passenger" sortKey={sortKey} sortDir={sortDir} onToggle={toggleSort} />
                </th>
                <th className="px-4 py-3 text-left">
                  <SortHeader label="Driver" col="driver" sortKey={sortKey} sortDir={sortDir} onToggle={toggleSort} />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                  Chaperone
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                  Route
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                  On Time?
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {sorted.map((ride) => {
                const onTime =
                  ride.actualArrivalTime &&
                  ride.status === "Completed"
                    ? new Date(ride.actualArrivalTime) <=
                      new Date(ride.estimatedArrivalTime)
                    : null;

                return (
                  <tr key={ride.id} className="hover:bg-gray-700/50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-xs text-white">{formatDate(ride.pickupTime)}</p>
                      <p className="text-xs text-gray-400">{formatTime(ride.pickupTime)}</p>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/rides/${ride.id}`}
                        className="text-xs text-blue-400 hover:text-blue-300 font-mono"
                      >
                        {ride.confirmationNumber}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-white">
                        {ride.passenger.firstName} {ride.passenger.lastName}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-white">
                        {ride.driver
                          ? `${ride.driver.firstName} ${ride.driver.lastName}`
                          : "—"}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-white">
                        {ride.chaperone
                          ? `${ride.chaperone.firstName} ${ride.chaperone.lastName}`
                          : "—"}
                      </p>
                    </td>
                    <td className="px-4 py-3 max-w-48">
                      <p className="text-xs text-gray-300 truncate">
                        {ride.pickupAddress.split(",")[0]}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        → {ride.dropoffAddress.split(",")[0]}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={ride.status} size="sm" />
                    </td>
                    <td className="px-4 py-3">
                      {onTime === null ? (
                        <span className="text-xs text-gray-500">N/A</span>
                      ) : onTime ? (
                        <span className="text-xs text-green-400 font-medium">Yes</span>
                      ) : (
                        <span className="text-xs text-red-400 font-medium">No</span>
                      )}
                    </td>
                  </tr>
                );
              })}
              {sorted.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-gray-400">
                    No rides match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function HistoryPage() {
  return (
    <Suspense fallback={<div className="p-6 text-gray-400">Loading history...</div>}>
      <HistoryContent />
    </Suspense>
  );
}
