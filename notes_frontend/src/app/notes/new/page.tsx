"use client";

import React from "react";
import { useRouter } from "next/navigation";
import NoteForm from "@/components/NoteForm";
import { useNotes } from "@/hooks/useNotes";

export default function NewNotePage() {
  const router = useRouter();
  const { create } = useNotes();

  async function handleSubmit(title: string, content: string) {
    const created = await create(title, content);
    if (created) {
      router.push(`/notes/${created.id}`);
    }
  }

  return (
    <div className="max-w-3xl">
      <h1 className="mb-4 text-2xl font-semibold">Create a Note</h1>
      <NoteForm submitLabel="Create" onSubmit={handleSubmit} onCancel={() => router.push("/")} />
    </div>
  );
}
