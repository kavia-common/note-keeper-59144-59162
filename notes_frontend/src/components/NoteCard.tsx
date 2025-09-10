"use client";

import React from "react";
import Link from "next/link";
import type { Note } from "@/lib/types";
import { Button } from "./ui";

interface Props {
  note: Note;
  onDelete?: (id: string) => void;
}

export default function NoteCard({ note, onDelete }: Props) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
      <header className="mb-2">
        <h3 className="text-lg font-semibold text-slate-900 line-clamp-1">{note.title}</h3>
        <p className="text-xs text-slate-500">
          Updated {new Date(note.updatedAt).toLocaleString()}
        </p>
      </header>
      <p className="text-sm text-slate-700 line-clamp-3 mb-4">{note.content || "No content"}</p>
      <div className="flex items-center justify-between gap-2">
        <Link
          href={`/notes/${note.id}`}
          className="text-blue-700 text-sm hover:underline"
          aria-label={`View note ${note.title}`}
        >
          View
        </Link>
        <div className="flex gap-2">
          <Link href={`/notes/${note.id}/edit`} aria-label={`Edit note ${note.title}`}>
            <Button variant="secondary">Edit</Button>
          </Link>
          <Button
            variant="danger"
            onClick={() => onDelete?.(note.id)}
            aria-label={`Delete note ${note.title}`}
          >
            Delete
          </Button>
        </div>
      </div>
    </article>
  );
}

export function EmptyState() {
  return (
    <div className="text-center rounded-lg border border-dashed border-slate-300 p-8">
      <h3 className="text-lg font-semibold text-slate-900 mb-1">No notes yet</h3>
      <p className="text-sm text-slate-600">
        Start by creating a new note using the button above.
      </p>
    </div>
  );
}
