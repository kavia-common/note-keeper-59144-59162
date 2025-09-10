"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Note, NoteID } from "@/lib/types";
import { listNotes, createNote, updateNote, deleteNote, getNote } from "@/lib/mockNotesApi";

type Status = "idle" | "loading" | "success" | "error";

export interface UseNotesResult {
  status: Status;
  error: string | null;
  notes: Note[];
  refreshing: boolean;
  // CRUD
  create: (title: string, content: string) => Promise<Note | null>;
  update: (id: NoteID, title: string, content: string) => Promise<Note | null>;
  remove: (id: NoteID) => Promise<boolean>;
  refresh: () => Promise<void>;
  getById: (id: NoteID) => Promise<Note | null>;
}

export function useNotes(): UseNotesResult {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      const data = await listNotes();
      setNotes(data);
      setStatus("success");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load notes");
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const data = await listNotes();
      setNotes(data);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const createHandler = useCallback(async (title: string, content: string) => {
    try {
      const created = await createNote({ title, content });
      setNotes((prev) => [created, ...prev]);
      return created;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create note");
      return null;
    }
  }, []);

  const updateHandler = useCallback(async (id: NoteID, title: string, content: string) => {
    try {
      const updated = await updateNote(id, { title, content });
      if (!updated) return null;
      setNotes((prev) => prev.map((n) => (n.id === id ? updated : n)));
      return updated;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to update note");
      return null;
    }
  }, []);

  const removeHandler = useCallback(async (id: NoteID) => {
    try {
      const ok = await deleteNote(id);
      if (ok) setNotes((prev) => prev.filter((n) => n.id !== id));
      return ok;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete note");
      return false;
    }
  }, []);

  const getById = useCallback(async (id: NoteID) => {
    try {
      return await getNote(id);
    } catch {
      return null;
    }
  }, []);

  return useMemo(
    () => ({
      status,
      error,
      notes,
      refreshing,
      create: createHandler,
      update: updateHandler,
      remove: removeHandler,
      refresh,
      getById,
    }),
    [status, error, notes, refreshing, createHandler, updateHandler, removeHandler, refresh, getById]
  );
}
