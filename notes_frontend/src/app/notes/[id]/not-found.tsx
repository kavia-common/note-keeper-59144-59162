"use client";

import React from "react";

export default function NoteNotFound() {
  return (
    <div className="mx-auto max-w-3xl p-6">
      <section
        className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
        role="alert"
        aria-live="assertive"
      >
        <header className="mb-2">
          <h1 className="text-xl font-semibold text-slate-900">Note Not Found</h1>
          <p className="text-sm text-slate-600">
            The note you’re looking for doesn’t exist or may have been deleted.
          </p>
        </header>
      </section>
    </div>
  );
}
