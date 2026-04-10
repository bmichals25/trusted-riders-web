"use client";

import { useState } from "react";
import { mockChaperones } from "@/lib/mock-data";
import StatusBadge from "@/components/StatusBadge";
import { Chaperone, ChaperoneStatus } from "@/types";

type FilterStatus = "All" | ChaperoneStatus;
const FILTERS: FilterStatus[] = ["All", "Available", "OnAssignment", "OffDuty"];

const SPEC_LABELS: Record<string, string> = {
  dementia_care: "Dementia Care",
  mobility_assistance: "Mobility Assist",
  pediatric: "Pediatric",
  behavioral_support: "Behavioral Support",
};

function ChaperoneDetailPanel({ chaperone }: { chaperone: Chaperone }) {
  return (
    <div className="mt-4 pt-4 border-t border-gray-700 grid grid-cols-2 gap-4 text-sm">
      <div>
        <p className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wide">Contact</p>
        <p className="text-white">{chaperone.email}</p>
        <a href={`tel:${chaperone.phone}`} className="text-blue-400 hover:text-blue-300 text-xs">
          {chaperone.phone}
        </a>
      </div>
      <div>
        <p className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wide">Employment</p>
        <p className="text-white text-xs">Hired: {chaperone.hireDate}</p>
        <p className="text-gray-400 text-xs">{chaperone.yearsOfService} years of service</p>
      </div>
      <div className="col-span-2">
        <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Certifications</p>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-300">Background Check</span>
            <span className={chaperone.backgroundCheckStatus === "Verified" ? "text-green-400" : "text-red-400"}>
              {chaperone.backgroundCheckStatus} · {chaperone.backgroundCheckDate}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Medical Transport</span>
            <span className={chaperone.medicalTransportCertified ? "text-green-400" : "text-red-400"}>
              {chaperone.medicalTransportCertified
                ? `Certified · exp ${chaperone.medicalTransportExpiration}`
                : "Not certified"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">First Aid</span>
            <span className={chaperone.firstAidCertified ? "text-green-400" : "text-red-400"}>
              {chaperone.firstAidCertified
                ? `Certified · exp ${chaperone.firstAidExpiration}`
                : "Not certified"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">CPR</span>
            <span className={chaperone.cprCertified ? "text-green-400" : "text-red-400"}>
              {chaperone.cprCertified
                ? `Certified · exp ${chaperone.cprExpiration}`
                : "Not certified"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChaperoneRow({ chaperone }: { chaperone: Chaperone }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setExpanded((v) => !v)}
      >
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
          {chaperone.firstName[0]}{chaperone.lastName[0]}
        </div>

        {/* Name + stats */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white">
            {chaperone.firstName} {chaperone.lastName}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {chaperone.specializations.map((s) => (
              <span key={s} className="px-1.5 py-0.5 text-xs bg-purple-900/40 text-purple-300 rounded border border-purple-800">
                {SPEC_LABELS[s] ?? s}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="hidden md:flex items-center gap-6 text-center text-xs">
          <div>
            <p className="text-white font-bold">{chaperone.totalAssignmentsCompleted}</p>
            <p className="text-gray-400">Assignments</p>
          </div>
          <div>
            <p className="text-white font-bold">{chaperone.yearsOfService}yr</p>
            <p className="text-gray-400">Service</p>
          </div>
        </div>

        <StatusBadge status={chaperone.status} size="sm" />
        <span className="text-gray-400 text-xs ml-2">{expanded ? "▲" : "▼"}</span>
      </div>

      {expanded && <ChaperoneDetailPanel chaperone={chaperone} />}
    </div>
  );
}

export default function ChaperonesPage() {
  const [filter, setFilter] = useState<FilterStatus>("All");
  const [search, setSearch] = useState("");

  const filtered = mockChaperones.filter((c) => {
    if (filter !== "All" && c.status !== filter) return false;
    if (search) {
      const name = `${c.firstName} ${c.lastName}`.toLowerCase();
      if (!name.includes(search.toLowerCase())) return false;
    }
    return true;
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Chaperones</h1>
          <p className="text-gray-400 text-sm mt-1">{filtered.length} chaperones shown</p>
        </div>
        <div className="flex gap-3 text-sm text-gray-400">
          <span>Available: <span className="text-green-400 font-semibold">{mockChaperones.filter(c => c.status === "Available").length}</span></span>
          <span>On Assignment: <span className="text-blue-400 font-semibold">{mockChaperones.filter(c => c.status === "OnAssignment").length}</span></span>
          <span>Off Duty: <span className="text-gray-500 font-semibold">{mockChaperones.filter(c => c.status === "OffDuty").length}</span></span>
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
              {f === "OnAssignment" ? "On Assignment" : f === "OffDuty" ? "Off Duty" : f}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search chaperone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((chaperone) => (
          <ChaperoneRow key={chaperone.id} chaperone={chaperone} />
        ))}
        {filtered.length === 0 && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
            <p className="text-gray-400">No chaperones match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
