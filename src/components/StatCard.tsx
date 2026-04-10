"use client";

interface Props {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  color?: "blue" | "green" | "yellow" | "purple";
}

const colorClasses = {
  blue: "text-blue-400 bg-blue-900/30",
  green: "text-green-400 bg-green-900/30",
  yellow: "text-yellow-400 bg-yellow-900/30",
  purple: "text-purple-400 bg-purple-900/30",
};

export default function StatCard({ title, value, subtitle, icon, color = "blue" }: Props) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 flex items-start gap-4">
      {icon && (
        <div className={`rounded-lg p-2.5 ${colorClasses[color]}`}>
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-400 font-medium">{title}</p>
        <p className="text-3xl font-bold text-white mt-1">{value}</p>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}
