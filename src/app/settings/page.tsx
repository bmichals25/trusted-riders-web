"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [org, setOrg] = useState({
    name: "TrustedRiders NEMT",
    address: "1200 W Capitol Ave, Springfield, IL 62701",
    phone: "(555) 800-RIDE",
    website: "https://trustedriders.com",
    operatingHours: "Mon–Fri 6:00 AM – 8:00 PM, Sat 7:00 AM – 6:00 PM",
    serviceArea: "Greater Springfield, IL (50-mile radius)",
  });

  const [prefs, setPrefs] = useState({
    refreshRate: "15",
    timezone: "America/Chicago",
    dateFormat: "MM/DD/YYYY",
    units: "miles",
  });

  const [notifications, setNotifications] = useState({
    emailRideCreated: true,
    emailStatusChange: true,
    emailAlert: true,
    smsStatusChange: false,
    smsAlert: true,
  });

  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 text-sm mt-1">Manage organization and application preferences</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Organization Profile */}
        <section className="bg-gray-800 border border-gray-700 rounded-xl p-5">
          <h2 className="text-base font-semibold text-white mb-4">Organization Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">Organization Name</label>
              <input
                value={org.name}
                onChange={(e) => setOrg({ ...org, name: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">Address</label>
              <input
                value={org.address}
                onChange={(e) => setOrg({ ...org, address: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
              <input
                value={org.phone}
                onChange={(e) => setOrg({ ...org, phone: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Website</label>
              <input
                value={org.website}
                onChange={(e) => setOrg({ ...org, website: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Operating Hours</label>
              <input
                value={org.operatingHours}
                onChange={(e) => setOrg({ ...org, operatingHours: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Service Area</label>
              <input
                value={org.serviceArea}
                onChange={(e) => setOrg({ ...org, serviceArea: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </section>

        {/* General Settings */}
        <section className="bg-gray-800 border border-gray-700 rounded-xl p-5">
          <h2 className="text-base font-semibold text-white mb-4">General Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Dashboard Refresh Rate</label>
              <select
                value={prefs.refreshRate}
                onChange={(e) => setPrefs({ ...prefs, refreshRate: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="10">10 seconds</option>
                <option value="15">15 seconds</option>
                <option value="30">30 seconds</option>
                <option value="60">1 minute</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Time Zone</label>
              <select
                value={prefs.timezone}
                onChange={(e) => setPrefs({ ...prefs, timezone: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Date Format</label>
              <select
                value={prefs.dateFormat}
                onChange={(e) => setPrefs({ ...prefs, dateFormat: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Distance Units</label>
              <select
                value={prefs.units}
                onChange={(e) => setPrefs({ ...prefs, units: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="miles">Miles</option>
                <option value="km">Kilometers</option>
              </select>
            </div>
          </div>
        </section>

        {/* Notification Preferences */}
        <section className="bg-gray-800 border border-gray-700 rounded-xl p-5">
          <h2 className="text-base font-semibold text-white mb-4">Notification Preferences</h2>
          <div className="space-y-3">
            {[
              { key: "emailRideCreated", label: "Email: Ride Created", channel: "email" },
              { key: "emailStatusChange", label: "Email: Status Change", channel: "email" },
              { key: "emailAlert", label: "Email: Alerts", channel: "email" },
              { key: "smsStatusChange", label: "SMS: Status Change", channel: "sms" },
              { key: "smsAlert", label: "SMS: Alerts", channel: "sms" },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-gray-300">{label}</span>
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={notifications[key as keyof typeof notifications]}
                    onChange={(e) =>
                      setNotifications({ ...notifications, [key]: e.target.checked })
                    }
                  />
                  <div
                    className={`w-10 h-5 rounded-full transition-colors ${
                      notifications[key as keyof typeof notifications]
                        ? "bg-blue-600"
                        : "bg-gray-600"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full mt-0.5 transition-transform ${
                        notifications[key as keyof typeof notifications]
                          ? "translate-x-5"
                          : "translate-x-0.5"
                      }`}
                    />
                  </div>
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* About */}
        <section className="bg-gray-800 border border-gray-700 rounded-xl p-5">
          <h2 className="text-base font-semibold text-white mb-3">About</h2>
          <div className="text-sm text-gray-400 space-y-1">
            <p>TrustedRiders NEMT Operations v1.0.0</p>
            <p>Built with Next.js 15 + TypeScript + Tailwind CSS</p>
            <p>Last updated: April 2026</p>
          </div>
        </section>

        {/* Save */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Save Settings
          </button>
          {saved && (
            <span className="text-sm text-green-400 font-medium">Settings saved!</span>
          )}
        </div>
      </form>
    </div>
  );
}
