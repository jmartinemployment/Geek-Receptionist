import { ui } from "@/lib/ui";

/** The shape of a card while its data streams in from the server. */
export function CardSkeleton({ label }: { label: string }) {
  return (
    <section className={ui.card} aria-busy="true" aria-label={`Loading ${label}`}>
      <div className="mb-3 h-5 w-40 animate-pulse rounded bg-line" />
      <div className="mb-2 h-4 w-24 animate-pulse rounded bg-line" />
      <div className="h-4 w-full max-w-md animate-pulse rounded bg-line" />
    </section>
  );
}
