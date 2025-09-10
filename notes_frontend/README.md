# Notes Frontend (Next.js)

A simple notes application UI built with Next.js App Router. It supports creating, viewing, editing, and deleting notes using in-memory state with optional localStorage persistence. It is structured to allow future integration with a real backend or the `notes_database` component.

## Features
- Notes list with search
- Create, view, edit, delete
- Client-side state and mock API (`src/lib/mockNotesApi.ts`)
- TypeScript and basic Tailwind styles
- Clean, accessible UI components

## Getting Started

Install dependencies and run the dev server:
```bash
npm install
npm run dev
```

Open http://localhost:3000 to use the app.

## Project Structure
- `src/app` — Next.js routes and layout
  - `/` — Notes list, search, actions
  - `/notes/new` — Create a new note
  - `/notes/[id]` — View note details
  - `/notes/[id]/edit` — Edit an existing note
- `src/components` — Reusable UI and note-related components
- `src/hooks/useNotes.ts` — Client hook wrapping CRUD operations
- `src/lib/mockNotesApi.ts` — In-memory/mock API with localStorage
- `src/lib/types.ts` — Shared types

## Future Backend Integration
Replace the functions in `src/lib/mockNotesApi.ts` with real HTTP calls to your API or database layer. The rest of the app (hooks and components) will continue to function with minimal changes.

## Notes
- Data currently persists only in the browser (localStorage) for demo purposes.
- No environment variables are required for this step.
