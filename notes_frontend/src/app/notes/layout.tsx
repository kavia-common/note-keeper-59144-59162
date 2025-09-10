import type { ReactNode } from "react";

export default function NotesLayout({ children }: { children: ReactNode }) {
  // Server component layout wrapper
  return <>{children}</>;
}
