/**
 * PUBLIC_INTERFACE
 * generateStaticParams for /notes/[id]/edit
 * For static export we don't know note IDs at build time.
 * Returning an empty array instructs Next.js to skip pre-rendering edit pages.
 */
export function generateStaticParams(): Array<{ id: string }> {
  return [];
}
