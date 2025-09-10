import type { ReactNode } from "react";

// Do not export dynamicParams in static export mode.

// PUBLIC_INTERFACE
export function generateStaticParams(): Array<Record<string, string>> {
  /**
   * For static export we cannot enumerate IDs for children here (handled at leaf routes).
   * Returning empty here keeps compatibility with static export.
   */
  return [];
}

export default function NotesLayout({ children }: { children: ReactNode }) {
  // Server component layout wrapper
  return <>{children}</>;
}
