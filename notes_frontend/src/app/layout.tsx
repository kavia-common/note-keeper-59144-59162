import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Notes",
  description: "A simple notes app with CRUD using in-memory storage.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="min-h-screen bg-slate-50 text-slate-900">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
          <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-semibold text-slate-900 hover:text-blue-700">
              Notes
            </Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/" className="text-slate-700 hover:text-blue-700">All Notes</Link>
              <Link href="/notes/new" className="text-slate-700 hover:text-blue-700">Create</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-5xl p-4">{children}</main>
        <footer className="mt-8 border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl p-4 text-xs text-slate-500">
            Demo app. Data stored in your browser for this demo.
          </div>
        </footer>
      </body>
    </html>
  );
}
