/** The few class lists every page shares, so a button or a card looks the same wherever it is. */
export const ui = {
  page: "mx-auto w-full max-w-2xl px-4 py-10",
  center: "flex min-h-dvh flex-col items-center justify-center gap-3 px-4 text-center",
  card: "mb-4 rounded-lg border border-line bg-paper p-5",
  h1: "mb-4 text-2xl font-semibold",
  h2: "mb-2 text-lg font-semibold",
  muted: "text-muted",
  button:
    "inline-flex items-center justify-center rounded-md bg-accent px-4 py-2.5 font-semibold text-paper no-underline " +
    "disabled:cursor-wait disabled:opacity-60 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent",
  quietButton:
    "inline-flex items-center justify-center rounded-md border border-line px-4 py-2.5 font-semibold text-accent " +
    "disabled:cursor-wait disabled:opacity-60 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent",
  status: { ok: "font-semibold text-ok", warn: "font-semibold text-warn", bad: "font-semibold text-bad" },
} as const;
