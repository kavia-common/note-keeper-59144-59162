export function generateStaticParams(): Array<{ id: string }> {
  // We don't know note IDs at build time in this demo; return none to allow static export.
  return [];
}
