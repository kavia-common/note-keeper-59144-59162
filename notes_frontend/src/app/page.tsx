"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
import { useNotes } from "@/hooks/useNotes";
import NoteCard, { EmptyState } from "@/components/NoteCard";
import { Button, Input } from "@/components/ui";

export default function Home() {
  const { status, error, notes, remove, refresh, refreshing } = useNotes();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return notes;
    return notes.filter(
      (n) => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
    );
  }, [notes, query]);

  async function handleDelete(id: string) {
    // Simple confirm for demo
    const ok = window.confirm("Delete this note? This action cannot be undone.");
    if (!ok) return;
    await remove(id);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">Your Notes</h1>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => refresh()} disabled={refreshing}>
            {refreshing ? "Refreshing..." : "Refresh"}
          </Button>
          <Link href="/notes/new">
            <Button>New Note</Button>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Search notes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search notes"
        />
      </div>

      {status === "loading" && <p className="text-sm text-slate-600">Loading notes…</p>}
      {status === "error" && <p className="text-sm text-red-600">{error ?? "Error"}</p>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filtered.length === 0 && status === "success" ? (
          <EmptyState />
        ) : (
          filtered.map((n) => <NoteCard key={n.id} note={n} onDelete={handleDelete} />)
        )}
      </div>
    </div>
  );
}
