"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import type { Note } from "@/lib/types";
import { useNotes } from "@/hooks/useNotes";
import { Button } from "@/components/ui";

export default function NoteDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const router = useRouter();
  const { getById, remove } = useNotes();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      const data = id ? await getById(id) : null;
      if (mounted) {
        setNote(data);
        setLoading(false);
      }
    }
    void load();
    return () => {
      mounted = false;
    };
  }, [id, getById]);

  async function handleDelete() {
    const ok = window.confirm("Delete this note?");
    if (!ok || !id) return;
    const deleted = await remove(id);
    if (deleted) router.push("/");
  }

  if (loading) return <p className="text-sm text-slate-600">Loading…</p>;
  if (!note) return <p className="text-sm text-slate-600">Note not found.</p>;

  return (
    <article className="max-w-3xl">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{note.title}</h1>
          <p className="text-xs text-slate-500">
            Updated {new Date(note.updatedAt).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Link href={`/notes/${note.id}/edit`}>
            <Button variant="secondary">Edit</Button>
          </Link>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </header>
      <section className="prose prose-slate max-w-none">
        <p className="whitespace-pre-wrap">{note.content || "No content"}</p>
      </section>
    </article>
  );
}
