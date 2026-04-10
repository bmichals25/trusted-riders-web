"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Ride, RideStatus } from "@/types";
import StatusBadge from "@/components/StatusBadge";
import RideTimeline from "@/components/RideTimeline";

const NEXT_STATUSES: Partial<Record<RideStatus, RideStatus[]>> = {
  Scheduled: ["DriverEnRoute", "Cancelled"],
  DriverEnRoute: ["PassengerPickedUp", "Cancelled"],
  PassengerPickedUp: ["InTransit", "Cancelled"],
  InTransit: ["Arrived", "Cancelled"],
  Arrived: ["Completed"],
};

function formatDateTime(isoString: string) {
  return new Date(isoString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatTime(isoString: string) {
  return new Date(isoString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

const STATUS_LABEL: Record<string, string> = {
  DriverEnRoute: "Driver En Route",
  PassengerPickedUp: "Passenger Picked Up",
  InTransit: "In Transit",
  Arrived: "Arrived",
  Completed: "Completed",
  Cancelled: "Cancelled",
};

interface Props {
  ride: Ride;
}

export default function RideDetailClient({ ride }: Props) {
  const router = useRouter();
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [showNoteForm, setShowNoteForm] = useState(false);

  const nextStatuses = NEXT_STATUSES[ride.status] ?? [];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Back + Header */}
      <div className="mb-6">
        <Link href="/rides" className="text-sm text-gray-400 hover:text-white mb-4 inline-flex items-center gap-1">
          ← Back to Rides
        </Link>

        <div className="flex items-start justify-between gap-4 mt-3">
          <div>
            <h1 className="text-2xl font-bold text-white">{ride.confirmationNumber}</h1>
            <p className="text-gray-400 text-sm mt-1">
              Last updated {formatDateTime(ride.updatedAt)}
            </p>
          </div>
          <StatusBadge status={ride.status} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {nextStatuses.filter(s => s !== "Cancelled").map((nextStatus) => (
          <button
            key={nextStatus}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Update: {STATUS_LABEL[nextStatus] ?? nextStatus}
          </button>
        ))}
        <button
          onClick={() => setShowNoteForm(true)}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Add Note
        </button>
        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors">
          Reassign Driver
        </button>
        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors">
          Reassign Chaperone
        </button>
        {nextStatuses.includes("Cancelled") && (
          <button
            onClick={() => setShowCancelConfirm(true)}
            className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Cancel Ride
          </button>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Passenger Info */}
          <section className="bg-gray-800 border border-gray-700 rounded-xl p-5">
            <h2 className="text-base font-semibold text-white mb-4">Passenger</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Name</p>
                <p className="text-sm text-white font-medium">
                  {ride.passenger.firstName} {ride.passenger.lastName}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Phone</p>
                <a href={`tel:${ride.passenger.phone}`} className="text-sm text-blue-400 hover:text-blue-300">
                  {ride.passenger.phone}
                </a>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Date of Birth</p>
                <p className="text-sm text-white">{ride.passenger.dateOfBirth}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Emergency Contact</p>
                <p className="text-sm text-white">{ride.passenger.emergencyContactName}</p>
                <a href={`tel:${ride.passenger.emergencyContactPhone}`} className="text-xs text-blue-400 hover:text-blue-300">
                  {ride.passenger.emergencyContactPhone}
                </a>
              </div>
            </div>
            {ride.passenger.accessibilityNeeds.length > 0 && (
              <div className="mt-4">
                <p className="text-xs text-gray-400 mb-2">Accessibility Needs</p>
                <div className="flex flex-wrap gap-1.5">
                  {ride.passenger.accessibilityNeeds.map((need) => (
                    <span key={need} className="px-2 py-0.5 text-xs bg-orange-900/40 text-orange-200 rounded-full border border-orange-800">
                      {need.replace(/_/g, " ")}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {ride.medicalNotes && (
              <div className="mt-4 p-3 bg-red-900/20 border border-red-900 rounded-lg">
                <p className="text-xs text-red-400 font-medium mb-1">Medical Notes</p>
                <p className="text-sm text-red-200">{ride.medicalNotes}</p>
              </div>
            )}
          </section>

          {/* Route Info */}
          <section className="bg-gray-800 border border-gray-700 rounded-xl p-5">
            <h2 className="text-base font-semibold text-white mb-4">Route</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex flex-col items-center gap-1 pt-1">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <div className="w-0.5 flex-1 bg-gray-600" />
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Pickup</p>
                    <p className="text-sm text-white">{ride.pickupAddress}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Scheduled: {formatTime(ride.pickupTime)}
                      {ride.actualPickupTime && ` · Actual: ${formatTime(ride.actualPickupTime)}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Dropoff</p>
                    <p className="text-sm text-white">{ride.dropoffAddress}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      ETA: {formatTime(ride.estimatedArrivalTime)}
                      {ride.actualArrivalTime && ` · Actual: ${formatTime(ride.actualArrivalTime)}`}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-6 pt-2 border-t border-gray-700">
                <div>
                  <p className="text-xs text-gray-400">Distance</p>
                  <p className="text-sm text-white font-medium">{ride.estimatedDistance} mi</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Duration</p>
                  <p className="text-sm text-white font-medium">{ride.estimatedDuration} min</p>
                </div>
              </div>
            </div>
          </section>

          {/* Special Instructions */}
          {ride.specialInstructions && (
            <section className="bg-gray-800 border border-gray-700 rounded-xl p-5">
              <h2 className="text-base font-semibold text-white mb-3">Special Instructions</h2>
              <p className="text-sm text-gray-300">{ride.specialInstructions}</p>
            </section>
          )}

          {/* Notes */}
          {(ride.notes.length > 0 || showNoteForm) && (
            <section className="bg-gray-800 border border-gray-700 rounded-xl p-5">
              <h2 className="text-base font-semibold text-white mb-4">Notes</h2>
              {ride.notes.map((note, i) => (
                <div key={i} className="mb-2 p-3 bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-200">{note}</p>
                </div>
              ))}
              {showNoteForm && (
                <div className="mt-3">
                  <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    rows={3}
                    placeholder="Add a note..."
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 resize-none placeholder-gray-500"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => { setNoteText(""); setShowNoteForm(false); }}
                      className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-xs font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => { setNoteText(""); setShowNoteForm(false); }}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium"
                    >
                      Save Note
                    </button>
                  </div>
                </div>
              )}
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Driver */}
          <section className="bg-gray-800 border border-gray-700 rounded-xl p-5">
            <h2 className="text-base font-semibold text-white mb-4">Driver</h2>
            {ride.driver ? (
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-sm">
                    {ride.driver.firstName[0]}{ride.driver.lastName[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {ride.driver.firstName} {ride.driver.lastName}
                    </p>
                    <StatusBadge status={ride.driver.status} size="sm" />
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Phone</span>
                    <a href={`tel:${ride.driver.phone}`} className="text-blue-400 hover:text-blue-300">
                      {ride.driver.phone}
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Vehicle</span>
                    <span className="text-white">
                      {ride.driver.vehicle.make} {ride.driver.vehicle.model}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Plate</span>
                    <span className="text-white">{ride.driver.vehicle.licensePlate}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-400">No driver assigned</p>
            )}
          </section>

          {/* Chaperone */}
          <section className="bg-gray-800 border border-gray-700 rounded-xl p-5">
            <h2 className="text-base font-semibold text-white mb-4">Chaperone</h2>
            {ride.chaperone ? (
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold text-sm">
                    {ride.chaperone.firstName[0]}{ride.chaperone.lastName[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {ride.chaperone.firstName} {ride.chaperone.lastName}
                    </p>
                    <StatusBadge status={ride.chaperone.status} size="sm" />
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Phone</span>
                    <a href={`tel:${ride.chaperone.phone}`} className="text-blue-400 hover:text-blue-300">
                      {ride.chaperone.phone}
                    </a>
                  </div>
                  {ride.chaperone.specializations.length > 0 && (
                    <div>
                      <p className="text-gray-400 mb-1">Specializations</p>
                      <div className="flex flex-wrap gap-1">
                        {ride.chaperone.specializations.map((s) => (
                          <span key={s} className="px-1.5 py-0.5 bg-purple-900/40 text-purple-300 rounded text-xs border border-purple-800">
                            {s.replace(/_/g, " ")}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-400">No chaperone assigned</p>
            )}
          </section>

          {/* Timeline */}
          <section className="bg-gray-800 border border-gray-700 rounded-xl p-5">
            <h2 className="text-base font-semibold text-white mb-4">Timeline</h2>
            <RideTimeline events={ride.timeline} />
          </section>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl w-full max-w-sm p-6">
            <h2 className="text-lg font-semibold text-white mb-2">Cancel Ride?</h2>
            <p className="text-gray-400 text-sm mb-6">
              This will cancel ride {ride.confirmationNumber}. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium"
              >
                Keep Ride
              </button>
              <button
                onClick={() => {
                  setShowCancelConfirm(false);
                  router.push("/rides");
                }}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-medium"
              >
                Cancel Ride
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
