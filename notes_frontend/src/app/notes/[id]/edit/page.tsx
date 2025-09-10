"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import NoteForm from "@/components/NoteForm";
import type { Note } from "@/lib/types";
import { useNotes } from "@/hooks/useNotes";

export default function EditNotePage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const router = useRouter();
  const { getById, update } = useNotes();
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

  async function handleSubmit(title: string, content: string) {
    if (!id) return;
    const updated = await update(id, title, content);
    if (updated) router.push(`/notes/${id}`);
  }

  if (loading) return <p className="text-sm text-slate-600">Loading…</p>;
  if (!note) return <p className="text-sm text-slate-600">Note not found.</p>;

  return (
    <div className="max-w-3xl">
      <h1 className="mb-4 text-2xl font-semibold">Edit Note</h1>
      <NoteForm
        initial={{ title: note.title, content: note.content }}
        submitLabel="Update"
        onSubmit={handleSubmit}
        onCancel={() => router.push(`/notes/${id}`)}
      />
    </div>
  );
}
