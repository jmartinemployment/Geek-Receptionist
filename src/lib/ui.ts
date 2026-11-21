/** The few class lists every page shares, so a button or a card looks the same wherever it is. */
export const ui = {
  page: "mx-auto w-full max-w-2xl px-4 py-10",
  center: "flex min-h-[calc(100dvh-4rem)] flex-col bg-[#0B162A] text-white items-center justify-center gap-3 px-4 text-center",
  card: "mb-4 rounded-md border border-line bg-paper p-5",
  h1: "mb-4 text-4xl font-extrabold",
  h2: "mb-2 text-2xl font-extrabold",
  muted: "text-muted-foreground",
  button:
    "inline-flex items-center justify-center rounded bg-brand-orange px-4 py-2 font-medium text-white no-underline transition-colors hover:bg-brand-teak " +
    "disabled:cursor-wait disabled:opacity-60 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-white",
  quietButton:
    "inline-flex items-center justify-center rounded border border-brand-orange px-4 py-2 font-medium text-white " +
    "hover:bg-brand-orange disabled:cursor-wait disabled:opacity-60 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-white",
  status: { ok: "font-semibold text-ok", warn: "font-semibold text-warn", bad: "font-semibold text-bad" },
} as const;
