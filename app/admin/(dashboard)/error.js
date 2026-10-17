"use client";

// Shown if something fails (e.g. a delete is refused by the database).
export default function DashboardError({ error, reset }) {
  return (
    <div className="max-w-xl rounded-2xl border border-red-200 bg-red-50 p-6">
      <h1 className="text-xl font-bold text-red-700">Something went wrong</h1>
      <p className="mt-2 text-red-700">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-4 rounded-full bg-navy px-5 py-2 text-sm font-medium text-white hover:bg-accent"
      >
        Try again
      </button>
    </div>
  );
}
