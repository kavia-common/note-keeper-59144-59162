"use client";

import React, { useMemo, useState } from "react";
import { Button, Input, Textarea } from "./ui";
import type { Note } from "@/lib/types";

interface Props {
  initial?: Partial<Pick<Note, "title" | "content">>;
  submitLabel?: string;
  onSubmit: (title: string, content: string) => Promise<void> | void;
  onCancel?: () => void;
}

export default function NoteForm({ initial, submitLabel = "Save", onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = useMemo(() => title.trim().length > 0 || content.trim().length > 0, [title, content]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      await onSubmit(title, content);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Title</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          aria-label="Note title"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Content</label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note..."
          rows={10}
          aria-label="Note content"
        />
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={!canSubmit || submitting}>
          {submitLabel}
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
