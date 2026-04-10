"use client";

import { Chaperone } from "@/types";
import StatusBadge from "./StatusBadge";

const SPEC_LABELS: Record<string, string> = {
  dementia_care: "Dementia Care",
  mobility_assistance: "Mobility Assist",
  pediatric: "Pediatric",
  behavioral_support: "Behavioral Support",
};

interface Props {
  chaperone: Chaperone;
}

function cert(certified: boolean, expiry?: string | null): React.ReactNode {
  if (!certified) return <span className="text-red-400">Not certified</span>;
  return (
    <span className="text-green-400">
      Certified{expiry ? ` · exp ${expiry}` : ""}
    </span>
  );
}

export default function ChaperoneCard({ chaperone }: Props) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {chaperone.firstName[0]}{chaperone.lastName[0]}
          </div>
          <div>
            <p className="font-semibold text-white">
              {chaperone.firstName} {chaperone.lastName}
            </p>
            <p className="text-xs text-gray-400">{chaperone.phone}</p>
          </div>
        </div>
        <StatusBadge status={chaperone.status} size="sm" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-center">
        <div>
          <p className="text-lg font-bold text-white">{chaperone.totalAssignmentsCompleted}</p>
          <p className="text-xs text-gray-400">Assignments</p>
        </div>
        <div>
          <p className="text-lg font-bold text-white">{chaperone.yearsOfService}</p>
          <p className="text-xs text-gray-400">Years</p>
        </div>
      </div>

      {/* Specializations */}
      {chaperone.specializations.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {chaperone.specializations.map((s) => (
            <span key={s} className="px-2 py-0.5 text-xs bg-purple-900/40 text-purple-200 rounded-full border border-purple-800">
              {SPEC_LABELS[s] ?? s}
            </span>
          ))}
        </div>
      )}

      {/* Certifications */}
      <div className="space-y-1 text-xs">
        <p className="text-gray-400 font-medium uppercase tracking-wide mb-2">Certifications</p>
        <div className="flex justify-between">
          <span className="text-gray-300">First Aid</span>
          {cert(chaperone.firstAidCertified, chaperone.firstAidExpiration)}
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">CPR</span>
          {cert(chaperone.cprCertified, chaperone.cprExpiration)}
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">Medical Transport</span>
          {cert(chaperone.medicalTransportCertified, chaperone.medicalTransportExpiration)}
        </div>
      </div>
    </div>
  );
}
