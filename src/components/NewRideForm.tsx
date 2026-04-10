"use client";

import { useState } from "react";
import { mockPassengers, mockDrivers, mockChaperones } from "@/lib/mock-data";

interface Props {
  onClose: () => void;
}

export default function NewRideForm({ onClose }: Props) {
  const [form, setForm] = useState({
    passengerId: "",
    driverId: "",
    chaperoneId: "",
    pickupAddress: "",
    dropoffAddress: "",
    pickupTime: "",
    medicalNotes: "",
    specialInstructions: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(onClose, 1500);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-12">
        <div className="w-12 h-12 rounded-full bg-green-700 flex items-center justify-center text-white text-xl">
          ✓
        </div>
        <p className="text-white font-semibold">Ride Created Successfully</p>
        <p className="text-gray-400 text-sm">The ride has been added to the schedule.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Passenger */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Passenger</label>
        <select
          name="passengerId"
          value={form.passengerId}
          onChange={handleChange}
          required
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
        >
          <option value="">Select passenger...</option>
          {mockPassengers.map((p) => (
            <option key={p.id} value={p.id}>
              {p.firstName} {p.lastName}
            </option>
          ))}
        </select>
      </div>

      {/* Pickup / Dropoff */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Pickup Address</label>
        <input
          name="pickupAddress"
          value={form.pickupAddress}
          onChange={handleChange}
          required
          placeholder="Enter pickup address"
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Dropoff Address</label>
        <input
          name="dropoffAddress"
          value={form.dropoffAddress}
          onChange={handleChange}
          required
          placeholder="Enter dropoff address"
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500"
        />
      </div>

      {/* Date/Time */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Pickup Time</label>
        <input
          type="datetime-local"
          name="pickupTime"
          value={form.pickupTime}
          onChange={handleChange}
          required
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Driver / Chaperone */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Driver</label>
          <select
            name="driverId"
            value={form.driverId}
            onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="">Auto-assign</option>
            {mockDrivers.filter((d) => d.status === "Available").map((d) => (
              <option key={d.id} value={d.id}>
                {d.firstName} {d.lastName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Chaperone</label>
          <select
            name="chaperoneId"
            value={form.chaperoneId}
            onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="">None</option>
            {mockChaperones.filter((c) => c.status === "Available").map((c) => (
              <option key={c.id} value={c.id}>
                {c.firstName} {c.lastName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Medical Notes</label>
        <textarea
          name="medicalNotes"
          value={form.medicalNotes}
          onChange={handleChange}
          rows={2}
          placeholder="Any medical considerations..."
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Special Instructions</label>
        <textarea
          name="specialInstructions"
          value={form.specialInstructions}
          onChange={handleChange}
          rows={2}
          placeholder="Instructions for driver/chaperone..."
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500 resize-none"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Create Ride
        </button>
      </div>
    </form>
  );
}
