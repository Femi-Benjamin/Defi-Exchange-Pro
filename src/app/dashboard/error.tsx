"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard route error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl glass p-6 text-center border border-border">
        <h1 className="text-xl font-semibold text-white">Dashboard unavailable</h1>
        <p className="text-sm text-muted mt-2">
          We hit a temporary issue while loading this view.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-4 py-2 rounded-lg bg-primary text-[#0B0F19] font-medium hover:bg-primary/90 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-4 py-2 rounded-lg bg-white/5 text-white font-medium hover:bg-white/10 transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
