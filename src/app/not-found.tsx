import Link from "next/link";

export const metadata = {
  title: "Page Not Found — TrustedRiders",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] p-6 text-center">
      <div className="text-6xl font-bold text-gray-700 mb-4">404</div>
      <h1 className="text-2xl font-semibold text-white mb-2">Page Not Found</h1>
      <p className="text-gray-400 mb-8 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
